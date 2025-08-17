let handler = async (m, { conn, usedPrefix }) => {
    try {
        // Image path - consider using a random image from your db.json
        let img = './src/catalogo.jpg'
        
        // Alternative: Use a URL image
        // let img = 'https://lazackorganisation.my.id/mtaju.jpg'
        
        // Improved staff information with better formatting
        let staff = `
╭━━━━━━━━━━━━━━━━━━╮
  *HELPER TEAM* ❀
╰━━━━━━━━━━━━━━━━━━╯

✧ *Owner*: ${creator || 'Not specified'}
✦ *Bot*: ${botName || conn.user.name}
⚘ *Version*: ${version || '1.0.0'}
❖ *Library*: ${library} ${baileysVersion}

╭━━━━━━━━━━━━━━━━━━╮
  *Development Team*
╰━━━━━━━━━━━━━━━━━━╯

${creator ? `❍ *Creator*: ${creator}` : ''}
${developer ? `✧ *Developer*: ${developer}` : ''}
${contributors ? `✦ *Contributors*: ${contributors.join(', ')}` : ''}

${supportGroup ? `\nJoin our support group: ${supportGroup}` : ''}
`.trim()

        // Send the image with caption
        await conn.sendFile(
            m.chat, 
            img, 
            'catalogo.jpg',  // Filename
            staff,          // Caption
            m,             // Message context
            false,         // Do not forward
            { 
                // Optional: Add contextInfo for better display
                contextInfo: {
                    externalAdReply: {
                        title: `${botName} Staff Information`,
                        body: `Meet our development team`,
                        thumbnail: await (await conn.getFile(img)).data,
                        sourceUrl: supportGroup || website || ''
                    }
                }
            }
        )
        
    } catch (error) {
        console.error('Error in staff command:', error)
        await conn.reply(m.chat, '❌ Failed to load staff information. Please try again later.', m)
    }
}

handler.help = ['staff', 'team', 'collaborators']
handler.command = ['staff', 'team', 'devs', 'collaborators']
handler.tags = ['main', 'info']

export default handler