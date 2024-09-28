import fg from 'api-dylux'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import yts from 'yt-search'
import fetch from 'node-fetch' 

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
let lister = ["mp3", "yta", "audio", "ytv", "video", "vídeo", "mp4", "mp3doc", "ytadoc", "audiodoc", "mp4doc", "ytvdoc", "videodoc", "vídeodoc"]

let [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ")
if (!lister.includes(feature)) return conn.reply(m.chat, `🐯 Ingresa el formato en que deseas descargar más el titulo de un video o musica de YouTube.\n\nEjemplo : ${usedPrefix + command} *mp3* SUICIDAL-IDOL - ecstacy\n\nFormatos disponibles :\n${usedPrefix + command} *mp3*\n${usedPrefix + command} *mp3doc*\n${usedPrefix + command} *mp4*\n${usedPrefix + command} *mp4doc*`, m, rcanal)
if (lister.includes(feature)) {
if (feature == "mp3" || feature == "yta" || feature == "audio") {
if (!inputs) return conn.reply(m.chat, '🐯 Ingresa el título de un video o canción de YouTube.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Gemini Aaliyah - If Only`, m, rcanal)
await m.react('🕓')
let res = await yts(text)
let vid = res.videos[0]
let q = '128kbps'
let txt = '`乂  Y O U T U B E  -  P L A Y`\n\n'
	txt += `	✩   *Title* : ${vid.title}\n`
	txt += `	✩   *Duration* : ${vid.timestamp}\n`
	txt += `	✩   *Visits* : ${toNum(vid.views)} ( *${formatNumber(vid.views)}* )\n`
	txt += `	✩   *Author* : ${vid.author.name}\n`
	txt += `	✩   *Published* : ${eYear(vid.ago)}\n`
	txt += `	✩   *Url* : ${'https://youtu.be/' + vid.videoId}\n\n`
	txt += `> *- MSELA-CHUI-V3🐯↻ Audio is being sent, please wait a moment, I'm slow. . .*`
await conn.sendFile(m.chat, vid.thumbnail, 'thumbnail.jpg', txt, m, null, rcanal)
try {
let yt = await fg.yta(vid.url, q)
let { title, dl_url, size } = yt
let limit = 100
       
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))

await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.ytmp3(vid.url, q)
let { title, dl_url, size } = yt
let limit = 100
       
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
       
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
await m.react('✖️')
}}}
        
if (feature == "mp4" || feature == "ytv" || feature == "video" || feature == "video") {
if (!inputs) return conn.reply(m.chat, '🐯 Ingresa el título de un video o canción de YouTube.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Gemini Aaliyah - If Only`, m, rcanal)
await m.react('🕓')
let res = await yts(text)
let vid = res.videos[0]
let q = '480p'
let txt = '`乂  Y O U T U B E  -  P L A Y`\n\n'
	txt += `	✩   *Title* : ${vid.title}\n`
	txt += `	✩   *Duration* : ${vid.timestamp}\n`
	txt += `	✩   *Visits* : ${toNum(vid.views)} ( *${formatNumber(vid.views)}* )\n`
	txt += `	✩   *Author* : ${vid.author.name}\n`
	txt += `	✩   *Published* : ${eYear(vid.ago)}\n`
	txt += `	✩   *Url* : ${'https://youtu.be/' + vid.videoId}\n\n`
	txt += `> *- MSELA-CHUI-V3🐯↻ Audio is being sent, please wait a moment, I'm slow. . .*`
await conn.sendFile(m.chat, vid.thumbnail, 'thumbnail.jpg', txt, m, null, rcanal)
try {
let yt = await fg.ytv(vid.url, q)
let { title, dl_url, size } = yt
let limit = 100
       
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
       
await conn.sendFile(m.chat, dl_url, 'yt.jpg', `${vid.title}\n⇆ㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤ↻\n00:15 ━━━━●────── ${vid.timestamp}`, m)
await m.react('✅')
} catch {
try {
let yt = await fg.ytmp4(vid.url, q)
let { title, dl_url, size } = yt
let limit = 100
       
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
       
await conn.sendFile(m.chat, dl_url, 'yt.jpg', `${vid.title}\n⇆ㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤ↻\n00:15 ━━━━●────── ${vid.timestamp}`, m)
await m.react('✅')
} catch {
await m.react('✖️')
}}}
    
if (feature == "mp3doc" || feature == "ytadoc" || feature == "audiodoc") {
if (!inputs) return conn.reply(m.chat, '🐯 Ingresa el título de un video o canción de YouTube.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Gemini Aaliyah - If Only`, m, rcanal)
await m.react('🕓')
let res = await yts(text)
let vid = res.videos[0]
let q = '128kbps'
let txt = '`乂  Y O U T U B E  -  P L A Y`\n\n'
	txt += `	✩   *Title* : ${vid.title}\n`
	txt += `	✩   *Duration* : ${vid.timestamp}\n`
	txt += `	✩   *Visits* : ${toNum(vid.views)} ( *${formatNumber(vid.views)}* )\n`
	txt += `	✩   *Author* : ${vid.author.name}\n`
	txt += `	✩   *Published* : ${eYear(vid.ago)}\n`
	txt += `	✩   *Url* : ${'https://youtu.be/' + vid.videoId}\n\n`
	txt += `> *- MSELA-CHUI-V3🐯↻ Audio is being sent, please wait a moment, I'm slow. . .*`
await conn.sendFile(m.chat, vid.thumbnail, 'thumbnail.jpg', txt, m, null, rcanal)
try {
let yt = await fg.yta(vid.url, q)
let { title, dl_url, size } = yt
let limit = 100
       
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
       
await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: '', mimetype: 'audio/mpeg', fileName: `${vid.title}.mp3`}, { quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.ytmp3(vid.url, q)
let { title, dl_url, size } = yt
let limit = 100
       
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
       
await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: '', mimetype: 'audio/mpeg', fileName: `${vid.title}.mp3`}, { quoted: m })
} catch {
await m.react('✖️')
    }}}
    
if (feature == "mp4doc" || feature == "ytvdoc" || feature == "videodoc" || feature == "videodoc") {
if (!inputs) return conn.reply(m.chat, '🐯 Ingresa el título de un video o canción de YouTube.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Gemini Aaliyah - If Only`, m, rcanal)
await m.react('🕓')
let res = await yts(text)
let vid = res.videos[0]
let q = '480p'
let txt = '`乂  Y O U T U B E  -  P L A Y`\n\n'
	txt += `	✩   *Title* : ${vid.title}\n`
	txt += `	✩   *Duration* : ${vid.timestamp}\n`
	txt += `	✩   *Visits* : ${toNum(vid.views)} ( *${formatNumber(vid.views)}* )\n`
	txt += `	✩   *Author* : ${vid.author.name}\n`
	txt += `	✩   *Published* : ${eYear(vid.ago)}\n`
	txt += `	✩   *Url* : ${'https://youtu.be/' + vid.videoId}\n\n`
	txt += `> *- MSELA-CHUI-V3🐯↻ Audio is being sent, please wait a moment, I'm slow. . .*`
await conn.sendFile(m.chat, vid.thumbnail, 'thumbnail.jpg', txt, m, null, rcanal)
try {
let yt = await fg.ytv(vid.url, q)
let { title, dl_url, size } = yt
let limit = 300
       
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
       
await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: '', mimetype: 'video/mp4', fileName: `${vid.title}` + `.mp4`}, {quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.ytmp4(vid.url, q)
let { title, dl_url, size } = yt
let limit = 300
       
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
       
await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: '', mimetype: 'video/mp4', fileName: `${vid.title}` + `.mp4`}, {quoted: m })
await m.react('✅')
} catch {
await m.react('✖️')
}}}}}
handler.help = ['play2'].map(v => v + " *<formato> <búsqueda>*")
handler.tags = ['downloader']
handler.command = ['ytplay', 'play2']
//handler.register = true 
//handler.limit = 1
export default handler

function sNum(num) {
    return new Intl.NumberFormat('en-GB', { notation: "compact", compactDisplay: "short" }).format(num)
}

function eYear(txt) {
    if (!txt) {
        return '×'
    }
    if (txt.includes('month ago')) {
        var T = txt.replace("month ago", "").trim()
        var L = 'hace '  + T + ' mes'
        return L
    }
    if (txt.includes('months ago')) {
        var T = txt.replace("months ago", "").trim()
        var L = 'hace ' + T + ' meses'
        return L
    }
    if (txt.includes('year ago')) {
        var T = txt.replace("year ago", "").trim()
        var L = 'hace ' + T + ' año'
        return L
    }
    if (txt.includes('years ago')) {
        var T = txt.replace("years ago", "").trim()
        var L = 'hace ' + T + ' años'
        return L
    }
    if (txt.includes('hour ago')) {
        var T = txt.replace("hour ago", "").trim()
        var L = 'hace ' + T + ' hora'
        return L
    }
    if (txt.includes('hours ago')) {
        var T = txt.replace("hours ago", "").trim()
        var L = 'hace ' + T + ' horas'
        return L
    }
    if (txt.includes('minute ago')) {
        var T = txt.replace("minute ago", "").trim()
        var L = 'hace ' + T + ' minuto'
        return L
    }
    if (txt.includes('minutes ago')) {
        var T = txt.replace("minutes ago", "").trim()
        var L = 'hace ' + T + ' minutos'
        return L
    }
    if (txt.includes('day ago')) {
        var T = txt.replace("day ago", "").trim()
        var L = 'hace ' + T + ' dia'
        return L
    }
    if (txt.includes('days ago')) {
        var T = txt.replace("days ago", "").trim()
        var L = 'hace ' + T + ' dias'
        return L
    }
    return txt
}

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else if (number <= -1000 && number > -1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number <= -1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else {
        return number.toString()
    }
}
