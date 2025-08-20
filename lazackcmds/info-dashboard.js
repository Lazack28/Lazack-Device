/**
 * Dashboard and statistics handler
 * Provides command usage stats and user database information
 * @param {Object} m - The message object
 * @param {Object} param1 - Destructured parameters
 */
let handler = async (m, { conn, command }) => {
    try {
        // Command Statistics Dashboard
        if (['dash', 'dashboard', 'views'].includes(command)) {
            let stats = Object.entries(db.data.stats)
                .map(([key, val]) => {
                    let name = Array.isArray(plugins[key]?.help) 
                        ? plugins[key].help.join(' , ') 
                        : plugins[key]?.help || key;
                    
                    // Filter out system/internal commands
                    if (/exec|_/.test(name)) return null;
                    
                    return { 
                        name: name.replace('_', ' '), 
                        ...val 
                    };
                })
                .filter(Boolean)
                .sort((a, b) => b.total - a.total);
            
            let topCommands = stats.slice(0, 15).map(({ name, total, lastUsed }, i) => {
                let lastUsedFormatted = lastUsed 
                    ? new Date(lastUsed).toLocaleString() 
                    : 'Never';
                return `▫ *${i+1}. ${name}*\n   ↳ Uses: ${total}\n   ↳ Last Used: ${lastUsedFormatted}`;
            }).join('\n\n');

            await conn.reply(m.chat, 
                `📊 *COMMAND STATISTICS*\n\n` +
                `Showing top ${Math.min(stats.length, 15)} most used commands:\n\n` +
                `${topCommands}\n\n` +
                `Total tracked commands: ${stats.length}`,
                m
            );
        }

        // User Database Information
        if (['database', 'users', 'user'].includes(command)) {
            let totalUsers = Object.keys(global.db.data.users).length;
            let registeredUsers = Object.values(global.db.data.users)
                .filter(user => user.registered).length;
            let premiumUsers = Object.values(global.db.data.users)
                .filter(user => user.premium).length;

            await conn.reply(m.chat, 
                `📂 *USER DATABASE*\n\n` +
                `👤 Registered Users: ${registeredUsers}\n` +
                `⭐ Premium Users: ${premiumUsers}\n` +
                `📝 Total Users: ${totalUsers}\n\n` +
                `Storage: ${(JSON.stringify(global.db.data).length / 1024).toFixed(2)} KB`,
                m
            );
        }
    } catch (error) {
        console.error('Dashboard error:', error);
        await conn.reply(m.chat, 
            '❌ An error occurred while processing your request', 
            m
        );
    }
}

// Command metadata
handler.help = [
    'dashboard - View command usage statistics',
    'users - View user database information'
];
handler.tags = ['info', 'system'];
handler.command = [
    'dashboard', 'dash', 'stats', 
    'database', 'users', 'user'
];
handler.register = true;

export default handler;