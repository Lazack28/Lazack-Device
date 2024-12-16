import fetch from 'node-fetch'
import FormData from 'form-data'
import fs from 'fs'

let handler = async (m) => {
let q = m.quoted ? m.quoted : m
let mime = q.mediaType || ''
if (/audio|video/.test(mime)) {
let media = await q.download(true)
let upload = await uploadFile(media)
let shp = await fetch(`https://apis-starlights-team.koyeb.app/starlight/chazam?url=${upload.files[0].url}`, { headers: { 'Content-Type': 'application/json' }})
let json = await shp.json()
let app = { title: json.title, artist: json.artist, type: json.type, url: json.url }
let txt = `*\`-• S H A Z A M - M U S I C •-\`*\n\n` +
`🍟 *Tittle:* ${app.title}\n` +
`🍟 *Artist:* ${app.artist}\n` +
`🍟 *Type:* ${app.type}\n` +
`🍟 *Link:* ${app.url}`
m.reply(txt)
} else {
return conn.reply(m.chat, '🚩 Responde to an *Audio/Video.*', m, rcanal)
}}
handler.help = ['shazam *<Audio/Video>*']
handler.tags = ['tools']
handler.command = /^(shazam3)$/i
//handler.limit = 3
//handler.register = true
export default handler

async function uploadFile(path) {
let form = new FormData()
form.append('files[]', fs.createReadStream(path))
let res = await (await fetch('https://uguu.se/upload.php', { method: 'post',
headers: {
...form.getHeaders()
},
body: form
})).json()
await fs.promises.unlink(path)
return res
  }
