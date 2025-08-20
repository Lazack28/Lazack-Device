let handler = async (m, { conn }) => {
    try {
        // Image path (local or URL)
        let img = '../src/catalogo.jpg' // or use a URL
        
        // Team information with GitHub links
        let staff = `
╭━━━━━━━━━━━━━━━━━━╮
  *DEVELOPMENT TEAM*
╰━━━━━━━━━━━━━━━━━━╯

✦ *Bot*: ${botName || conn.user.name}
⚘ *Version*: ${version || '1.0.0'}
❖ *Library*: Baileys ${baileysVersion}

╭━━━━━━━━━━━━━━━━━━╮
  *Core Contributors*
╰━━━━━━━━━━━━━━━━━━╯

👑 *Owner*: 
github.com/lazack28

💻 *Developers*:
- github.com/Lazackdevs
- github.com/Lazack28

🌿 *Contributors*:
- github.com/SilvaTechB
- github.com/Lazackdevs

📌 *Repository*:
github.com/lazack28/Lazack-Device
`.trim()

        await conn.sendFile(
            m.chat, 
            img, 
            'catalogo.jpg', 
            staff,
            m,
            false,
            { 
                contextInfo: {
                    externalAdReply: {
                        title: `${botName} Development Team`,
                        body: `Open source contributors`,
                        thumbnail: await (await conn.getFile(img)).data,
                        sourceUrl: 'github.com/lazack28/Lazack-Device'
                    }
                }
            }
        )
        
    } catch (error) {
        console.error('Error:', error)
        await conn.reply(m.chat, '❌ Failed to load team information', m)
    }
}

handler.help = ['team', 'devs', 'contributors']
handler.command = ['team', 'staff', 'devs', 'contributors']
handler.tags = ['main', 'info']

export default handler