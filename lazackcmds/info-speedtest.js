import cp from 'child_process';
import { promisify } from 'util';
const exec = promisify(cp.exec).bind(cp);

const handler = async (m, { conn }) => {
    try {
        // Send initial message
        await conn.reply(m.chat, `${emoji} Running speed test...`, m);
        
        // Execute speed test command
        const result = await exec('python3 ./lib/ookla-speedtest.py --secure --share');
        
        // Process results
        if (result.stdout.trim()) {
            const imageUrl = result.stdout.match(/http[^"]+\.png/)?.[0];
            await conn.sendMessage(
                m.chat, 
                {
                    image: { url: imageUrl },
                    caption: `📊 *Speed Test Results*\n\n${result.stdout.trim()}`
                },
                { quoted: m }
            );
        }
        
        if (result.stderr.trim()) {
            const errorImageUrl = result.stderr.match(/http[^"]+\.png/)?.[0];
            await conn.sendMessage(
                m.chat,
                {
                    image: { url: errorImageUrl },
                    caption: `⚠️ *Speed Test Error*\n\n${result.stderr.trim()}`
                },
                { quoted: m }
            );
        }

    } catch (error) {
        console.error('Speedtest error:', error);
        await conn.reply(
            m.chat,
            `❌ Failed to run speed test:\n${error.message}`,
            m
        );
    }
};

handler.help = ['speedtest'];
handler.tags = ['info', 'tools'];
handler.command = ['speedtest', 'stest', 'test', 'speed'];
handler.register = true;

export default handler;