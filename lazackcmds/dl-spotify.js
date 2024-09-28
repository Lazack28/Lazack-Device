import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('🍭 Ingresa el nombre de algún Track de Spotify.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Gemini Aaliyah - If Only`)

let user = global.db.data.users[m.sender]
try {
let { title, artist, album, published, thumbnail, dl_url } = await Scraper.spotify(text)
let txt = `╭─⬣「 *Spotify Download* 」⬣\n`
    txt += `│  ≡◦ *🍭 Nombre ∙* ${title}\n`
    txt += `│  ≡◦ *🪴 Artista ∙* ${artist}\n`
    txt += `│  ≡◦ *📚 Album ∙* ${album}\n`
    txt += `│  ≡◦ *📅 Publicado ∙* ${published}\n`
    txt += `╰─⬣`
await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m)
await conn.sendFile(m.chat, dl_url, title + '.mp3', `*🍭 Titulo ∙* ${title}\n*🪴 Artista ∙* ${artist}`, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
} catch {
}}
handler.help = ['spotify <búsqueda>']
handler.tags = ['downloader']
handler.command = ['spotify']
handler.register = true 
export default handler
