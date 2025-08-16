// - OfcKing >> https://github.com/OfcKing

import axios from 'axios';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        await conn.reply(m.chat, `${emoji} Please provide a description to generate the image.`, m);
        return;
    }

    const prompt = args.join(' ');
    const apiUrl = `https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${prompt}`;

    try {
        conn.reply(m.chat, `${emoji2} Please wait a moment...`, m)

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        await conn.sendMessage(m.chat, { image: Buffer.from(response.data) }, { quoted: m });
    } catch (error) {
        console.error('Error generating the image:', error);
        await conn.reply(m.chat, `${msm} Could not generate the image, please try again later.`, m);
    }
};

handler.command = ['dalle'];
handler.help = ['dalle'];
handler.tags = ['tools'];

export default handler;