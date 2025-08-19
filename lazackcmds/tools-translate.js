import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';

const handler = async (m, { args, usedPrefix, command, conn }) => {
    const msg = `${emoji} Please provide the (language) and (text) to translate.`;

    // Check if arguments are provided
    if (!args || !args[0]) return m.reply(msg);

    let lang = args[0]; // target language
    let text = args.slice(1).join(' '); // text to translate
    const defaultLang = 'es'; // default language is Spanish

    // If first argument is not a valid 2-letter language code
    if ((args[0] || '').length !== 2) {
        lang = defaultLang;
        text = args.join(' ');
    }

    // If no text provided, use quoted text
    if (!text && m.quoted && m.quoted.text) text = m.quoted.text;

    try {
        // Attempt translation with Google Translate API
        const result = await translate(text, { to: lang, autoCorrect: true });
        await conn.reply(m.chat, result.text, m);
    } catch {
        try {
            // Fallback to alternative API
            conn.reply(m.chat, wait, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        showAdAttribution: true
                    }
                }
            });
            const lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${text}`);
            const loll = await lol.json();
            const result2 = loll.result.translated;
            await conn.reply(m.chat, result2, m);
        } catch {
            await m.reply(`${msm} An error occurred.`);
        }
    }
};

handler.command = ['translate', 'traducir', 'trad'];
handler.register = true;

export default handler;
