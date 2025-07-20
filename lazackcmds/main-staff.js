let handler = async (m, { conn, command, usedPrefix }) => {
let img = './src/catalogo.jpg'
let staff = `ᥫ᭡ *HELPER TEAM* ❀
✰ *Owner* ${creador}
✦ *Bot:* ${botname}
⚘ *Version:* ${vs}
❖ *Library:* ${libreria} ${baileys}

❍ *Creator:*`
await conn.sendFile(m.chat, img, 'nino.jpg', staff.trim(), m)
}
  
handler.help = ['staff']
handler.command = ['collaborators', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
