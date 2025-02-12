import axios from 'axios';

const handler = async (m, { conn, args }) => {
    try {
        const query = args[0];
        if (!query) {
            return conn.reply(m.chat, '🔥 *Example:* .ytmp4doc <YouTube URL>', m);
        }

        await m.react('🕓');

        const urls = [
            `https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${encodeURIComponent(query)}&quality=360`,
            `https://api.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(query)}`
        ];

        let response;
        for (const apiUrl of urls) {
            response = await axios.get(apiUrl).catch(() => null);
            if (response?.data?.result?.download_url) break;
        }

        if (!response?.data?.result?.download_url) {
            return conn.reply(m.chat, '🚫 *Error obtaining the video.* Check the URL or try again later.', m);
        }

        const { title, quality, thumbnail, download_url } = response.data.result;

        const caption = `*\`Title:\`* ${title}\n*\`Quality:\`* ${quality}`;

        await conn.sendMessage(m.chat, {
            document: { url: download_url },
            fileName: `${title}.mp4`,
            mimetype: 'video/mp4',
            caption: caption,
        }, { quoted: m });

        await m.react('✅');
    } catch (error) {
        console.error('Error in ytmp4doc command:', error.message);
        await m.react('❌');
    }
};

handler.help = ['ytmp4doc <url>'];
handler.tags = ['dl'];
handler.command = /^ytmp4doc$/i;
export default handler;