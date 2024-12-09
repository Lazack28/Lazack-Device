
import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('please enter tiktok link');

try {
let api = await fetch(`https://api.vreden.my.id/api/tiktok?url=${encodeURIComponent(text)}`)
let json = await api.json()
    
let { title, duration, data, stats, music_info } = json.result;

if (data && data.length > 0) {
if (data[0].type === 'nowatermark') {
let dl_url = data[0].url;
let JT = `- *Tittle:* ${title}
* *Duration:* ${duration}
* *Likes:* ${stats.likes}
* *Comments:* ${stats.comment}
* *Views:* ${stats.views}`

await conn.sendFile(m.chat, dl_url, JT, m);
} else if (data[0].type === 'photo') {
let images = []
let JT = `- *Títle:* ${title}
* *Likes:* ${stats.likes}
* *Comments:* ${stats.comment}
* *Views:* ${stats.views}`

for (let img of data) {
if (img.type === 'photo') {
images.push(img.url)
}}

for (let img of images) {
await conn.sendFile(m.chat, img, 'image.jpg', JT, m)
}}}
    
} catch (error) {
console.error(error)
}}

handler.command = ['tiktok']
export default handler
