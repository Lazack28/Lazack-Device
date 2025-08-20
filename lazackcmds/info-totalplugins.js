const handler = async (m, { conn }) => {
    try {
        // Count all available commands
        const totalCommands = Object.values(global.plugins)
            .filter(v => v.help && v.tags)
            .length;
        
        // Get unique categories from tags
        const categories = [...new Set(
            Object.values(global.plugins)
                .filter(v => v.tags)
                .flatMap(v => v.tags)
        )].filter(Boolean);

        // Build the response message
        const message = `📊 *Bot Command Statistics*\n\n` +
            `✨ *Total Commands:* ${totalCommands}\n` +
            `📁 *Categories:* ${categories.length}\n\n` +
            `ℹ️ Use *${usedPrefix}help* to see all available commands`;

        await conn.reply(m.chat, message, m);
        
    } catch (error) {
        console.error('Command count error:', error);
        await conn.reply(m.chat, 
            '❌ Failed to retrieve command information', 
            m
        );
    }
};

handler.help = ['commandcount', 'totalcommands'];
handler.tags = ['info', 'main'];
handler.command = ['commandcount', 'totalcommands'];
handler.register = true;

export default handler;