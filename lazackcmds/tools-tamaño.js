import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args, text }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    // Validate input
    if (!mime) 
        return conn.reply(m.chat, `${emoji} Please reply to an *Image* or *Video*.`, m)
    
    if (!text) 
        return conn.reply(m.chat, `${emoji} Enter the new size for the image/video.`, m)

    await m.react('🕓') // React with clock emoji while processing

    try {
        if (isNaN(text)) 
            return conn.reply(m.chat, `${emoji2} Only numbers are allowed.`, m).then(_ => m.react('✖️'))

        if (!/image\/(jpe?g|png)|video|document/.test(mime)) 
            return conn.reply(m.chat, `${emoji2} Unsupported format.`, m)

        let fileData = await q.download()
        let url = await uploadImage(fileData)

        // Send updated image with new size
        if (/image\/(jpe?g|png)/.test(mime)) {
            await conn.sendMessage(
                m.chat, 
                { image: { url }, caption: '', fileLength: `${text}`, mentions: [m.sender] }, 
                { ephemeralExpiration: 24*3600, quoted: m }
            )
            await m.react('✅')
        } 
        // Send updated video with new size
        else if (/video/.test(mime)) {
            await conn.sendMessage(
                m.chat, 
                { video: { url }, caption: '', fileLength: `${text}`, mentions: [m.sender] }, 
                { ephemeralExpiration: 24*3600, quoted: m }
            )
            await m.react('✅')
        }

    } catch {
        await m.react('✖️')
    }
}

handler.tags = ['tools']
handler.help = ['filesize *<size>*']
handler.command = ['filelength', 'length', 'size']
//handler.limit = 1
handler.register = true 

export default handler
