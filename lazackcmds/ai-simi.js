import translate from '@vitalets/google-translate-api';
import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, {conn, text, command, args, usedPrefix}) => {

if (!text) conn.reply(m.chat, `You forgot to enter text to talk to the *Bot*`, m);
try {
    // await m.react(emojis)
    const resSimi = await simitalk(text);
    conn.sendMessage(m.chat, { text: resSimi.resultado.simsimi }, { quoted: m });
} catch {
    throw `An error occurred.`;
}};

handler.help = ['simi', 'bot'];
handler.tags = ['fun'];
handler.group = true;
handler.register = true
handler.command = ['Nini']

export default handler;

async function simitalk(ask, apikeyyy = "iJ6FxuA9vxlvz5cKQCt3", language = "en") {
if (!ask) return { status: false, resultado: { msg: "You must enter text to talk to simsimi." }};
try {
    const response1 = await axios.get(`https://delirius-apiofc.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`);
    const trad1 = await translate(`${response1.data.data.message}`, {to: language, autoCorrect: true});
    if (trad1.text == 'undefined' || response1 == '' || !response1.data) trad1 = XD // Use "XD" to cause error and use another option.  
    return { status: true, resultado: { simsimi: trad1.text }};        
} catch {
    try {
        const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`);
        return { status: true, resultado: { simsimi: response2.data.message }};       
    } catch (error2) {
        return { status: false, resultado: { msg: "All APIs failed. Please try again later.", error: error2.message }};
    }
}
}
