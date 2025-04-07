

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { promisify } from 'util';
import ffmpeg from 'fluent-ffmpeg';

const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

async function getVideoData(url, format = 'mp4') {
  try {
    const formDataInfo = new FormData();
    formDataInfo.append('url', url);

    const infoResponse = await axios.post('https://ytdown.siputzx.my.id/api/get-info', formDataInfo, {
      headers: { ...formDataInfo.getHeaders() }
    });

    const info = infoResponse.data;

    const formDataDownload = new FormData();
    formDataDownload.append('id', info.id);
    formDataDownload.append('format', format);
    formDataDownload.append('info', JSON.stringify(info));

    const downloadResponse = await axios.post('https://ytdown.siputzx.my.id/api/download', formDataDownload, {
      headers: { ...formDataDownload.getHeaders() }
    });

    if (!downloadResponse.data.download_url) {
      throw new Error('Failed to get download link');
    }

    return {
      id: info.id,
      title: info.title,
      type: info.type,
      album: info.album,
      artist: info.artist,
      description: info.description,
      duration: info.duration,
      upload_date: info.upload_date,
      like_count: info.like_count,
      view_count: info.view_count,
      tags: info.tags,
      thumbnail: info.thumbnail,
      download_url: `https://ytdown.siputzx.my.id${downloadResponse.data.download_url}`
    };

  } catch (error) {
    throw new Error(`Failed to fetch video data: ${error.message}`);
  }
}

async function downloadFile(url, title, format) {
  const tmpDir = tmpdir();
  const filePath = join(tmpDir, `${Date.now()}_${title}.${format}`);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });

  return filePath;
}

async function optimizeVideo(inputPath, outputPath) {
  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-c:v libx264',
        '-preset ultrafast',
        '-crf 28',
        '-c:a aac',
        '-b:a 128k',
        '-movflags faststart'
      ])
      .output(outputPath)
      .on('end', resolve)
      .on('error', reject)
      .run();
  });
}

async function ytDownload(m, { conn, args, usedPrefix, command }) {
  if (!args[0]) return m.reply(`Where's the YouTube URL?\n\n*Example:* ${usedPrefix}${command} https://youtu.be/Jbl_7LQudeI?si=2CZxkNkSPsPIA3nE`);

  const url = args[0];
  const format = command === 'yta2' ? 'mp3' : 'mp4';

  try {
    m.reply('*Please Wait....*');
    const result = await getVideoData(url, format);

    const caption = `
*°${result.title}*\n
*ID:* ${result.id}
*Duration:* ${result.duration}
*Total Views:* ${result.view_count}
*Total Likes:* ${result.like_count}
*Upload Date:* ${result.upload_date}
${result.artist ? `*Artist:* ${result.artist}` : ''}
${result.album ? `*Album:* ${result.album}` : ''}\n\n> Please wait while the result is being sent`;

    await conn.sendMessage(m.chat, {
      image: { url: result.thumbnail },
      caption: caption.trim()
    }, { quoted: m });

    if (format === 'mp3') {
      const audioPath = await downloadFile(result.download_url, result.title, 'mp3');
      await conn.sendMessage(m.chat, {
        audio: fs.readFileSync(audioPath),
        mimetype: 'audio/mpeg',
        fileName: `${result.title}.mp3`
      }, { quoted: m });
      await unlinkAsync(audioPath);
    } else {
      const tmpDir = tmpdir();
      const originalPath = join(tmpDir, `${Date.now()}_original.mp4`);
      const optimizedPath = join(tmpDir, `${Date.now()}_optimized.mp4`);

      await downloadFile(result.download_url, 'original', 'mp4').then(path => fs.renameSync(path, originalPath));
      await optimizeVideo(originalPath, optimizedPath);

      await conn.sendMessage(m.chat, {
        video: fs.readFileSync(optimizedPath),
        fileName: `${result.title}.mp4`
      }, { quoted: m });

      await unlinkAsync(originalPath);
      await unlinkAsync(optimizedPath);
    }

  } catch (error) {
    m.reply(`${error.message}`);
  }
}

const handler = async (m, { conn, args, usedPrefix, command }) => {
  await ytDownload(m, { conn, args, usedPrefix, command });
};

handler.help = ['yta2', 'ytv2'];
handler.tags = ['downloader'];
handler.command = ['yta', 'ytv'];

export default handler;
