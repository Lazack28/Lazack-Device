
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) throw '• YouTube link is required.'
try {
let res = await fetch(`https://api.diioffc.web.id/api/download/ytmp3?url=${encodeURIComponent(text)}`)
let json = await res.json()
if (json.status && json.result?.download?.url) {
let { title, thumbnail, views, duration, author, download } = json.result
let caption = `• *Title:* ${title}\n• *Channel:* ${author.name}\n• *Duration:* ${duration.timestamp}\n• *Views:* ${views.toLocaleString()}`
await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption }, { quoted: m })
await conn.sendMessage(m.chat, { audio: { url: download.url }, mimetype: 'audio/mpeg', fileName: download.filename || 'audio.mp3' }, { quoted: m })
} else throw 'No response to audio.'
} catch (e) {
m.reply(`❌ *Error:* Occurred during downloading audio`)
}}
handler.command = ['ytmp3']

export default handler
