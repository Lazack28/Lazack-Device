
// *[ ❀ YTMP3 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `❀ please use ytube link`, m)
    
try {
let api = await (await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${text}`)).json()
let dl_url = api.data.dl

conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: "audio/mp4", ptt: true }, { quoted: m })
} catch (error) {
console.error(error)
}}

handler.command = ['ytmp3']

export default handler
