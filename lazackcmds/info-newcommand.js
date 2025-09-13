/*const handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        // Input validation
        if (!text) {
            return conn.reply(m.chat, 
                `📝 *Command Suggestion*\n\n` +
                `Please specify the command you want to suggest.\n` +
                `Example: *${usedPrefix + command} play - Add more music sources*`, 
                m
            )
        }

        if (text.length < 10) {
            return conn.reply(m.chat, 
                `❌ Suggestion too short\n` +
                `Please provide at least 10 characters describing your command idea.`, 
                m
            )
        }

        if (text.length > 1000) {
            return conn.reply(m.chat, 
                `❌ Suggestion too long\n` +
                `Please keep your suggestion under 1000 characters.`, 
                m
            )
        }

        // Format suggestion message
        const suggestionMessage = `📨 *New Command Suggestion*\n\n` +
            `👤 From: @${m.sender.split('@')[0]}\n` +
            `📅 Date: ${new Date().toLocaleString()}\n\n` +
            `💡 Suggestion:\n` +
            `"${text.trim()}"\n\n` +
            `📝 Context:\n` +
            `${m.quoted ? m.quoted.text : 'No additional context provided'}`

        // Send to owner
        await conn.reply(
            `255724980103@s.whatsapp.net`, 
            suggestionMessage, 
            {
                mentions: [m.sender],
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    mentionedJid: [m.sender]
                }
            }
        )

        // Confirmation to user
        await conn.reply(m.chat, 
            `✅ Your suggestion has been sent to the bot owner!\n\n` +
            `Thank you for helping improve ${global.botname}.`, 
            m
        )

        // Add reaction
        await m.react('📩').catch(() => {})

    } catch (error) {
        console.error('Suggestion handler error:', error)
        await conn.reply(m.chat, 
            '❌ Failed to send your suggestion. Please try again later.', 
            m
        )
        await m.react('❌').catch(() => {})
    }
}

handler.help = ['suggest <text>', 'suggestion <idea>']
handler.tags = ['feedback']
handler.command = ['suggest', 'sug']
handler.examples = [
    `${usedPrefix}suggest add a weather command that shows weekly forecast`,
    `${usedPrefix}sug improve the music command to support playlists`
]

export default handler*/