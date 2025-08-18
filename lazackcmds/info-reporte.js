const handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        // Input validation
        if (!text) {
            return conn.reply(
                m.chat,
                `⚠️ *Error Report*\n\n` +
                `Please describe the error you encountered.\n` +
                `Example: *${usedPrefix + command} Bot crashes when I use the play command*`,
                m
            );
        }

        if (text.length < 10) {
            return conn.reply(
                m.chat,
                `❌ Description too short\n` +
                `Please provide at least 10 characters explaining the error.`,
                m
            );
        }

        if (text.length > 1000) {
            return conn.reply(
                m.chat,
                `❌ Description too long\n` +
                `Please keep your error report under 1000 characters.`,
                m
            );
        }

        // Format report message
        const reportMessage = `⚠️ *ERROR REPORT*\n\n` +
            `📱 *User:*\n` +
            `• WA: wa.me/${m.sender.split('@')[0]}\n` +
            `• Name: ${m.pushName || 'Anonymous'}\n\n` +
            `📝 *Description:*\n` +
            `"${text.trim()}"\n\n` +
            `📎 *Context:*\n` +
            `${m.quoted ? m.quoted.text : 'No additional context provided'}`;

        // Send to developer
        await conn.reply(
            `255734980103@s.whatsapp.net`,
            reportMessage,
            {
                mentions: [m.sender],
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    mentionedJid: [m.sender]
                }
            }
        );

        // User confirmation
        await conn.reply(
            m.chat,
            `✅ Your error report has been sent to the developer.\n\n` +
            `⚠️ False reports may result in being banned from using the bot.`,
            m
        );

        // Add reaction
        await m.react('📨').catch(() => {});

    } catch (error) {
        console.error('Report handler error:', error);
        await conn.reply(
            m.chat,
            '❌ Failed to send your report. Please try again later.',
            m
        );
        await m.react('❌').catch(() => {});
    }
};

// Command metadata
handler.help = ['report <description>', 'bug <error>'];
handler.tags = ['feedback'];
handler.command = ['report', 'bug', 'error', 'feedback'];

// Examples without usedPrefix (cannot be dynamic here)
handler.examples = [
    'report Bot crashes when I send sticker',
    'bug Music command not working after update'
];

export default handler;
