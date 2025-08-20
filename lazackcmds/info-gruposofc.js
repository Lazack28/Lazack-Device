import fetch from 'node-fetch'

/**
 * Group invitation handler - Shares official bot groups and community links
 */
let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        // React first to show the command is processing
        await m.react('📩').catch(() => {})
        
        // Build the invitation message with better formatting
        const invitationMessage = `
🌟 *Official ${botname} Communities* 🌟

Join our communities to interact with other users and get updates:

*Official Groups:*
🔹 *${groupName}* - ${groupLink1}

*Community Group:*
🔸 *${communityName}* - ${communityLink1}

━━━━━━━━━━━━━━━━━━

🔗 *Is the link not working? Check our backup channel:*
📢 *${channelName}* - ${channelLink}

*Bot Developer:* ${developerTag}
`.trim()

        // Send the invitation with banner
        await conn.sendFile(
            m.chat,
            catalogImage,
            'communities.jpg',
            invitationMessage,
            m,
            null,
            {
                // Add thumbnail and context info
                thumbnail: await (await fetch(catalogImage)).buffer(),
                contextInfo: {
                    externalAdReply: {
                        title: `Join ${botname} Communities`,
                        body: "Connect with other users!",
                        thumbnail: await (await fetch(catalogImage)).buffer(),
                        sourceUrl: channelLink
                    }
                }
            }
        )

        // Add success reaction
        await m.react('✅').catch(() => {})
        
    } catch (error) {
        console.error('Group invitation error:', error)
        // Fallback if image sending fails
        await conn.reply(m.chat, 
            `📣 *Join Our Communities!*\n\n` +
            `• Main Group: ${groupLink1}\n` +
            `• Community: ${communityLink1}\n\n` +
            `Channel: ${channelLink}\n\n` +
            `Developer: ${developerTag}`,
            m
        )
        await m.react('❌').catch(() => {})
    }
}

// Command metadata
handler.help = [
    'groups - Get official group links',
    'links - Community invitation links'
]
handler.tags = ['info', 'community']
handler.command = ['groups', 'community']
handler.register = true

export default handler