import axios from 'axios';

let handler = async (m, { text }) => {
    if (!text) return m.reply(`where is the youtube link?`);

    axios.get(`https://fgsi1-restapi.hf.space/api/ai/summary?url=${encodeURIComponent(text)}`)
        .then(({ data }) => m.reply(data?.status && data?.data?.summarry ? `${data.data.summary}` : 'Failed to fetch summary.'))
        .catch(() => m.reply('Failed to fetch summary.'));
};

handler.help = ['summary'];
handler.command = ['summary', 'yt-summary', 'summarize', 'yt-summarize'];
handler.tags = ['tools'];


export default handler; 