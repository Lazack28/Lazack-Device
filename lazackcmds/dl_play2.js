import ytdl from 'youtubedl-core';
import yts from 'youtube-yts';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';
import axios from 'axios';

const streamPipeline = promisify(pipeline);

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example: ${usedPrefix}${command} naruto blue bird`;
  await m.react(rwait);

  try {
    // Encode the query for the API request
    const query = encodeURIComponent(text);

    // Make a GET request to the API
    const response = await axios.get(`https://www.guruapi.tech/api/ytsearch?text=${query}`);
    const result = response.data.results[0]; // Get the first result

    if (!result) throw 'Video Not Found, Try Another Title';

    // Extract video information from the API response
    const { title, thumbnail, url } = result;

    // Create a message caption with video information
    const captvid = `✼ ••๑⋯ ❀ Y O U T U B E ❀ ⋯⋅๑•• ✼
  ❏ Title: ${title}
  ❒ Link: ${url}

`;

    // Send the video information along with the thumbnail to the Discord channel
    conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: captvid }, { quoted: m });

    // Download and send the audio of the video
    const audioStream = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });

    // Get the path to the system's temporary directory
    const tmpDir = os.tmpdir();

    // Create a writable stream in the temporary directory
    const audioFilePath = `${tmpDir}/${title}.mp3`;
    const writableStream = fs.createWriteStream(audioFilePath);

    // Start the download
    await streamPipeline(audioStream, writableStream);

    // Prepare the message document with audio file and metadata
    const doc = {
      audio: {
        url: audioFilePath
      },
      mimetype: 'audio/mpeg',
      ptt: false,
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: url,
          title: title,
          body: 'HERE IS YOUR SONG',
          sourceUrl: url,
          thumbnail: await (await conn.getFile(thumbnail)).data
        }
      }
    };

    // Send the audio message to the Discord channel
    await conn.sendMessage(m.chat, doc, { quoted: m });

    // Delete the downloaded audio file after sending
    fs.unlink(audioFilePath, (err) => {
      if (err) console.error(`Failed to delete audio file: ${err}`);
    });
  } catch (error) {
    console.error(error);
    // Instead of throwing an error, we can log it and send a friendly message
    await conn.sendMessage(m.chat, 'An error occurred while processing your request. Please try again later.', { quoted: m });
  }
};

handler.help = ['play'].map((v) => v + ' <query>');
handler.tags = ['downloader'];
handler.command = /^play$/i;

handler.exp = 0;

export default handler;