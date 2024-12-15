//© Nahida - BOT 2023-2024
// • Credits : wa.me/6289687537657 [ Fanzz ]
// • Owner: 6289687537657,62882021236704,628817057468

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/

import ytdl from 'ytdl-core';
import fs from 'node:fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
const Buffer = (await import('buffer')).Buffer;
import yts from 'yt-search';

const MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024; // 10 GB
const MIN_DOC_SIZE = 100 * 1024 * 1024; // 100 MB

const downloadAudio = async (url, bitrate) => {
    const info = await ytdl.getInfo(url);
    const audioFormat = ytdl.chooseFormat(info.formats, {
        quality: 'highestaudio',
        filter: 'audioonly'
    });

    if (!audioFormat) {
        throw new Error(Tidak ditemukan format audio);
    }

    const audioPath = path.join('/tmp', audio_${Date.now()}.mp3);
    const tempAudioPath = path.join('/tmp', temp_audio_${Date.now()}.mp3);

    await new Promise((resolve, reject) => {
        ytdl(url, {
                format: audioFormat
            })
            .pipe(fs.createWriteStream(tempAudioPath))
            .on('finish', resolve)
            .on('error', reject);
    });

    return new Promise((resolve, reject) => {
        ffmpeg(tempAudioPath)
            .audioCodec('libmp3lame')
            .audioBitrate(bitrate)
            .save(audioPath)
            .on('end', async () => {
                await fs.promises.unlink(tempAudioPath); // Remove temp audio file
                const stats = await fs.promises.stat(audioPath);
                if (stats.size > MAX_FILE_SIZE) {
                    throw new Error(Ukuran file melebihi batas 10 GB);
                }
                resolve(audioPath);
            })
            .on('error', reject);
    });
};

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    const [url, bitrate] = text.trim().split(' --');
    let input = `[!] wrong input\n\nEx: ${usedPrefix + command} https://youtube.com/watch?v=E7yWbUi_SUo --128 
> Tersedia 3 opsi bitrate 128,192,320 otomatis 320`;
    try {
        if (!url) return m.reply(input);
        const extractVid = (data) => {
            const match = /(?:youtu\.be\/|youtube\.com(?:.[?&]v=|.\/))([^?&]+)/.exec(data);
            return match ? match[1] : null;
        };

        const info = async (link) => {
            let id = await extractVid(link);
            const {
                title,
                description,
                url,
                videoId,
                seconds,
                timestamp,
                views,
                genre,
                uploadDate,
                ago,
                image,
                thumbnail,
                author
            } = await yts({
                videoId: id
            });
            return {
                title,
                description,
                url,
                videoId,
                seconds,
                timestamp,
                views,
                genre,
                uploadDate,
                ago,
                image,
                thumbnail,
                author
            };
        };

        let res = await info(url);
        const audioPath = await downloadAudio(url, bitrate || '320');
        const stats = await fs.promises.stat(audioPath);

        let cap = `*[ Ytmp3 Downloader ]*

• Name: ${res.title}
• Author: ${res.author.name}
• Profile Author: ${res.author.url}
• Durasi: ${res.timestamp}
• Views: ${res.views}
• Upload Video: ${res.uploadDate}
• Bitrate: ${bitrate || '320 kbps'}
• Description: ${res.description}`;

        let sending = `*[ Downloader Audio Youtube ]*
        
• Name: ${res.title}
• Author: ${res.author.name}
• Profile Author: ${res.author.url}
• Durasi: ${res.timestamp}
• Views: ${res.views}
• Upload Video: ${res.uploadDate}
• Bitrate: ${bitrate || '320 kbps'}

*Please Wait For Sending Audio.....*`;

        if (bitrate === "doc" || stats.size > MIN_DOC_SIZE) { // 100 MB
            await conn.sendFile(m.chat, res.image, null, sending, m);
            await conn.delay(3000);
            await conn.sendMessage(m.chat, {
                document: {
                    url: audioPath
                },
                mimetype: 'audio/mpeg',
                fileName: res.title + ".mp3",
                caption: cap
            }, {
                quoted: m
            });
            await fs.promises.unlink(audioPath);
        } else {
            await conn.sendFile(m.chat, res.image, null, sending, m);
            await conn.delay(3000);
            await conn.sendMessage(m.chat, {
                audio: {
                    url: audioPath
                },
                mimetype: "audio/mpeg",
                fileName: res.title,
            }, {
                quoted: m
            });
            await fs.promises.unlink(audioPath);
        }
    } catch (e) {
        console.error('Error downloading audio:', e);
        conn.reply(m.chat, Terjadi kesalahan saat mengunduh audio: ${e.message}, m);
    }
};

handler.help = ['ytmp3 <link> <bitrate>'];
handler.tags = ['downloader'];
handler.command = /^(ytmp3|yta|ytaudio)$/i;
handler.limit = true;
export default handler;

function calculateFileSize(buffer) {
    const fileSize = buffer.length;
    return fileSize;
}