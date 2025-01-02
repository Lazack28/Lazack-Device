//Para Usuarios De Likee 🙃
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '🚩 send me the link of *Likee*.', m, rcanal)
await m.react('🕓')
try {
let app = await fetch(`https://apis-starlights-team.koyeb.app/starlight/like-downloader?url=${text}`, { headers: { 'Content-Type': 'application/json' }})
let json = await app.json()
let video = json.links['no watermark']
await conn.sendFile(m.chat, video, 'samu.mp4', `${json.caption}`, m, null, rcanal)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['likeedl *<url>*']
handler.tags = ['dl']
handler.command = /^(likeedl)$/i
handler.register = true
export default handler