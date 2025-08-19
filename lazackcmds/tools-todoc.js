import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let q = m.quoted || m
    let mime = (q.msg || q).mimetype || ''

    // Validate input
    if (!m.quoted) 
        return conn.reply(m.chat, `${emoji} Please tag the *Video or Audio* you want to convert to a document.`, m)
    
    if (!text) 
        return conn.reply(m.chat, `${emoji2} Enter a name for the document to save.`, m)
    
    if (!/audio|video/.test(mime)) 
        return conn.reply(m.chat, `${emoji} Please tag the *Video or Audio* you want to convert to a document.`, m)

    // Download media
    let media = await q.download?.()
    if (!media) throw m.react('✖️')

    await m.react('🕓') // React while processing

    // Convert and send as document
    if (/video/.test(mime)) {
        return conn.sendMessage(
            m.chat, 
            { document: media, mimetype: 'video/mp4', fileName: `${text}.mp4` }, 
            { quoted: m }
        ).then(_ => m.react('✅'))
    } else if (/audio/.test(mime)) {
        return conn.sendMessage(
            m.chat, 
            { document: media, mimetype: 'audio/mpeg', fileName: `${text}.mp3` }, 
            { quoted: m }
        ).then(_ => m.react('✅'))
    }
}

handler.help = ['document *<audio/video>*']
handler.tags = ['tools']
handler.command = ['todocument', 'todoc']
handler.register = true

export default handler
