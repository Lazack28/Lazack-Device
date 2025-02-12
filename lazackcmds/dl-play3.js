import yts from 'yt-search';

let handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, `*Please enter a search term*`, m);

    await m.react('⏳');
    try {
        let searchResults = await search(args.join(" "));

        if (!searchResults || searchResults.length === 0) {
            throw new Error('No videos found.');
        }

        let video = searchResults.find(v => v.seconds < 3600) || searchResults[0];

        let messageText = `🌟 *YouTube Player* 🌟\n\n`;
        messageText += `🎬 *Title:* ${video.title}\n`;
        messageText += `⏰ *Duration:* ${formatDuration(video.seconds)}\n`;
        messageText += `👤 *Author:* ${video.author.name || 'Unknown'}\n`;
        messageText += `📅 *Published:* ${convertTimeToEnglish(video.ago)}\n`;
        messageText += `👀 *Views:* ${video.views.toLocaleString()}\n`;
        messageText += `🔗 *Direct link:* ${video.url}\n`;

        let image = video.image || 'default-image-url';

        await conn.sendButton2(
            m.chat,
            messageText,
            'WhatsApp Bot',
            image,
            [
                ['🎶 MP3', `.ytmp3 ${video.url}`],
                ['📺 MP4', `.ytmp4 ${video.url}`],
                ['🎶 MP3DOC', `.ytmp3doc ${video.url}`],
                ['📺 MP4DOC', `.ytmp4doc ${video.url}`]
            ],
            '',
            [],
            m,
            {}
        );

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('❌');
        conn.reply(m.chat, '*`There was an error searching for the video.`*', m);
    }
};

handler.help = ['play *<text>*'];
handler.tags = ['dl'];
handler.command = ['play3'];

export default handler;

async function search(query, options = {}) {
    let search = await yts.search({ query, hl: "en", gl: "US", ...options });
    return search.videos;
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${secondsLeft}s`;
}

function convertTimeToSpanish(timeText) {
    if (!timeText || typeof timeText !== 'string') {
        return 'Fecha desconocida';
    }
    return timeText
        .replace(/year/g, 'año').replace(/years/g, 'años')
        .replace(/month/g, 'mes').replace(/months/g, 'meses')
        .replace(/day/g, 'día').replace(/days/g, 'días')
        .replace(/hour/g, 'hora').replace(/hours/g, 'horas')
        .replace(/minute/g, 'minuto').replace(/minutes/g, 'minutos');
}