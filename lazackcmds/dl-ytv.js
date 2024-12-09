import fetch from "node-fetch"
 
let handler = async (m, { text, conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply("please enter the YouTube link")
 
try {
let api = await fetch(`https://api.agatz.xyz/api/ytmp4?url=${args[0]}`)
let json = await api.json()
let { title, thumbnail, quality, downloadUrl:dl_url } = json.data
 
let JT = `*Title :* ${title}
*quality :* ${quality}`
 
await conn.sendFile(m.chat, dl_url, JT, m)
} catch (error) {
console.error(error)
}}
 
handler.command = ['ytmp4']
 
export default handler
