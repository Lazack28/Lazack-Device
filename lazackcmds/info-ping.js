import speed from 'performance-now'
import { exec } from 'child_process'
import os from 'os'
import util from 'util'

// Convert exec to promise-based
const execPromise = util.promisify(exec)

const handler = async (m, { conn }) => {
    try {
        // Initial ping calculation
        const timestamp = speed()
        const sentMsg = await conn.reply(m.chat, 
            '⏳ *Calculating latency and server statistics...*', 
            m
        )
        const latency = speed() - timestamp

        // Get system info (fallback if neofetch fails)
        let systemInfo
        try {
            const { stdout } = await execPromise('neofetch --stdout')
            systemInfo = stdout.toString()
                .replace(/Memory:/, 'RAM:')
                .replace(/(\n\n)\n+/g, '$1') // Remove extra newlines
        } catch (e) {
            // Fallback system info
            systemInfo = `💻 *System Information*\n` +
                `OS: ${os.platform()} ${os.release()}\n` +
                `Arch: ${os.arch()}\n` +
                `CPU: ${os.cpus()[0].model} (${os.cpus().length} cores)\n` +
                `RAM: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}GB\n` +
                `Uptime: ${formatUptime(os.uptime())}`
        }

        // Build result message
        const result = `✨ *Pong!* 🏓\n\n` +
            `📶 *Latency:* ${latency.toFixed(0)}ms\n` +
            `⏱️ *Response Time:* ${(speed() - timestamp).toFixed(0)}ms\n\n` +
            `📊 *Server Status:*\n\`\`\`${systemInfo}\`\`\`\n\n` +
            `${global.botname} • ${new Date().getFullYear()}`

        // Edit original message with results
        await conn.sendMessage(m.chat, 
            { text: result, edit: sentMsg.key }, 
            { quoted: m }
        )

    } catch (error) {
        console.error('Ping command error:', error)
        await conn.reply(m.chat,
            '❌ Error calculating statistics. Please try again later.',
            m
        )
    }
}

// Helper function to format uptime
function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24))
    const hours = Math.floor((seconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}d ${hours}h ${minutes}m`
}

handler.help = ['ping']
handler.tags = ['info', 'tools']
handler.command = ['ping', 'latency']
handler.alias = ['p']

export default handler