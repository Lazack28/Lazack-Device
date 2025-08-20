import db from '../lib/database.js'
import { cpus, totalmem, freemem, platform, hostname, arch } from 'os'
import speed from 'performance-now'
import { sizeFormatter } from 'human-readable'
import os from 'os'

// Configure size formatter
const formatMemory = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

// CPU information formatter
const formatCpuInfo = (cpu) => {
    return {
        model: cpu.model.split('@')[0].trim(),
        speed: `${(cpu.speed / 1000).toFixed(2)} GHz`,
        usage: `${((cpu.times.user + cpu.times.sys + cpu.times.nice) / cpu.times.idle * 100).toFixed(2)}%`
    }
}

const handler = async (m, { conn, usedPrefix }) => {
    try {
        // Performance measurement start
        const startTime = speed()
        
        // Bot statistics
        const botStats = {
            totalCommands: Object.values(global.db.data.stats).reduce((acc, stat) => acc + stat.total, 0),
            totalPlugins: Object.values(global.plugins).filter(v => v.help && v.tags).length,
            uptime: process.uptime()
        }

        // System information
        const systemInfo = {
            platform: `${platform()} (${arch()})`,
            hostname: hostname(),
            totalMem: totalmem(),
            freeMem: freemem(),
            cpu: cpus().map(formatCpuInfo),
            load: os.loadavg()
        }

        // Memory usage
        const memoryUsage = process.memoryUsage()
        
        // Build information message
        let infoMessage = `🤖 *${global.botname} Status Report*\n\n`
        infoMessage += `🔹 *Prefix*: [ ${usedPrefix} ]\n`
        infoMessage += `🔸 *Total Plugins*: ${botStats.totalPlugins}\n`
        infoMessage += `🔹 *Commands Executed*: ${formatNumber(botStats.totalCommands)}\n`
        infoMessage += `🔸 *Uptime*: ${formatUptime(botStats.uptime)}\n\n`
        
        infoMessage += `🖥️ *System Information*\n`
        infoMessage += `  • Platform: ${systemInfo.platform}\n`
        infoMessage += `  • Server: ${systemInfo.hostname}\n`
        infoMessage += `  • CPU: ${systemInfo.cpu[0].model} (${systemInfo.cpu.length} cores)\n`
        infoMessage += `  • Load: ${systemInfo.load[0].toFixed(2)} (1m avg)\n\n`
        
        infoMessage += `💾 *Memory Usage*\n`
        infoMessage += `  • Total RAM: ${formatMemory(systemInfo.totalMem)}\n`
        infoMessage += `  • Used RAM: ${formatMemory(systemInfo.totalMem - systemInfo.freeMem)}\n`
        infoMessage += `  • Free RAM: ${formatMemory(systemInfo.freeMem)}\n\n`
        
        infoMessage += `📊 *Node.js Memory Usage*\n\`\`\`\n`
        infoMessage += `RSS: ${formatMemory(memoryUsage.rss)}\n`
        infoMessage += `Heap Total: ${formatMemory(memoryUsage.heapTotal)}\n`
        infoMessage += `Heap Used: ${formatMemory(memoryUsage.heapUsed)}\n`
        infoMessage += `External: ${formatMemory(memoryUsage.external)}\n`
        infoMessage += `Array Buffers: ${formatMemory(memoryUsage.arrayBuffers)}\n\`\`\``
        
        // Calculate response time
        const responseTime = (speed() - startTime).toFixed(2)
        infoMessage += `\n⏱️ *Response Time*: ${responseTime}ms`

        // Send the information
        await conn.reply(m.chat, infoMessage, m, {
            contextInfo: {
                mentionedJid: [global.owner[0] + '@s.whatsapp.net'],
                forwardingScore: 999,
                isForwarded: true
            }
        })

    } catch (error) {
        console.error('Bot info error:', error)
        await conn.reply(m.chat, '❌ Failed to retrieve bot information', m)
    }
}

// Helper functions
function formatNumber(num) {
    if (num >= 1e6) return `${(num/1e6).toFixed(1)}M`
    if (num >= 1e3) return `${(num/1e3).toFixed(1)}K`
    return num.toString()
}

function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600*24))
    const hours = Math.floor(seconds % (3600*24) / 3600)
    const mins = Math.floor(seconds % 3600 / 60)
    const secs = Math.floor(seconds % 60)
    
    return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${mins}m ${secs}s`
}

handler.help = ['botinfo', 'status', 'stats']
handler.tags = ['info', 'system']
handler.command = ['botinfo', 'infobot', 'status', 'stats', 'systeminfo']

export default handler