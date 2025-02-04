/* 
- Downloader Ytmp4 By Izumi-kzx
- Power By Team Code Titans
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y 
*/
// *[ 🍟 YTMP4 DOWNLOADER ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '• YouTube link is required.', m)

try {
let apiUrl = `https://api.diioffc.web.id/api/download/ytmp4?url=${encodeURIComponent(text)}`
let response = await fetch(apiUrl)
let result = await response.json()

if (!result.status) throw new Error('No search video.')

let { title, thumbnail, views, duration, download } = result.result
let info = `• *Title:* ${title}\n• *Views:* ${views.toLocaleString()}\n• *Duration:* ${duration.timestamp}`

await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: info }, { quoted: m })
await conn.sendMessage(m.chat, { video: { url: download.url }, caption: title }, { quoted: m })

} catch (error) {
console.error(error)
conn.reply(m.chat, '❌ Error downloading your video.', m)
}}

handler.command = ['ytmp4']

export default handler
