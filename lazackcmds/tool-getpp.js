let handler = async(m, { conn, text }) => {
    let number = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    let url = await conn.profilePictureUrl(number, 'image').catch(_ => './jusorts/lazack.jpg')
    await m.react('🕓')
    await conn.sendFile(m.chat, url, 'thumbnail.jpg', listo, m, null, rcanal)
    await m.react('✅')
    }
    handler.help = ['getpp']
    handler.tags = ['tools']
    handler.command = /^(get(pp|profile))$/i
    //handler.limit = 1
    handler.register = true 
    
    export default handler