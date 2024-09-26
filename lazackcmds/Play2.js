/*
*<>PLAY<>*
SOURCE 1: https://whatsapp.com/channel/0029VaYVlVP9hXF9Ig83hJ3L
SOURCE 2: https://whatsapp.com/channel/0029VaGgcSa3bbV4dMm9Fe3B
MAMPIR KESINI GUYS
*DONT DELETE MY WM, SAYA JANJI GA AKAN DELETE WM INI*
*/

const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh penggunaan: ${usedPrefix + command} <query>`;

    const searchQuery = text.trim();
    try {
        await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});

        const { data } = await axios.get(`https://apisku-furina.vercel.app/api/downloader/play?q=${searchQuery}&apikey=indradev`);

        if (!data.status) throw new Error('Video not found or an error occurred.');

        const audioData = data.result;

        const detailMessage = `「 *Detail Video* 」\n\n` +
            `📝 *Title:* ${audioData.title}\n` +
            `🎶 *Quality:* 128kbps\n` +
            `🎦 *Durasi:* ${audioData.duration}\n` +
            `👤 *Author:* ${audioData.name}`;

        await conn.sendMessage(m.chat, {
            text: detailMessage,
            contextInfo: {
                externalAdReply: {
                    title: audioData.title,
                    body: audioData.description || 'Click here for more details',
                    thumbnailUrl: audioData.thumbnail,
                    sourceUrl: audioData.url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        await conn.sendMessage(m.chat, {
            audio: { url: audioData.mp3 },
            mimetype: 'audio/mp4'
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        if (e.message.includes('Video not found')) {
            throw '❌ Gagal mendownload audio!';
        } else {
            conn.reply(m.chat, 'An error occurred: ' + e.message, m);
        }
    }
}

handler.help = ["play"];
handler.tags = ["music"];
handler.command = /^play4$/i;

module.exports = handler;



// VERSI ESM ⬇️ //

import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh penggunaan: ${usedPrefix + command} <query>`;

    const searchQuery = text.trim();
    try {
        await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});

        const { data } = await axios.get(`https://apisku-furina.vercel.app/api/downloader/play?q=${searchQuery}&apikey=indradev`);

        if (!data.status) throw new Error('Video not found or an error occurred.');

        const audioData = data.result;

        const detailMessage = `「 *Detail Video* 」\n\n` +
            `📝 *Title:* ${audioData.title}\n` +
            `🎶 *Quality:* 128kbps\n` +
            `🎦 *Durasi:* ${audioData.duration}\n` +
            `👤 *Author:* ${audioData.name}`;

        await conn.sendMessage(m.chat, {
            text: detailMessage,
            contextInfo: {
                externalAdReply: {
                    title: audioData.title,
                    body: audioData.description || 'Click here for more details',
                    thumbnailUrl: audioData.thumbnail,
                    sourceUrl: audioData.url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        await conn.sendMessage(m.chat, {
            audio: { url: audioData.mp3 },
            mimetype: 'audio/mp4'
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        if (e.message.includes('Video not found')) {
            throw '❌ Gagal mendownload audio!';
        } else {
            conn.reply(m.chat, 'An error occurred: ' + e.message, m);
        }
    }
};

handler.help = ["play"];
handler.tags = ["music"];
handler.command = /^play4$/i;

export default handler;
