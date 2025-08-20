import ws from 'ws'
import os from 'os'
import process from 'process'

/**
 * Bot status information handler
 * Displays comprehensive bot statistics and system information
 */
let handler = async (m, { conn, usedPrefix }) => {
    // Performance measurement
    const startTime = performance.now()
    
    // System uptime and stats
    const botUptime = process.uptime() * 1000
    const totalUsers = Object.keys(global.db.data.users).length
    const totalChats = Object.keys(global.db.data.chats).length
    
    // Connection stats
    const activeSubBots = [...new Set(
        [...global.conns].filter(conn => 
            conn.user && 
            conn.ws.socket && 
            conn.ws.socket.readyState !== ws.CLOSED
        )
    )].length
    
    const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
    const groups = chats.filter(([id]) => id.endsWith('@g.us'))
    const privateChats = chats.length - groups.length
    
    // Performance measurement
    const latency = performance.now() - startTime
    
    // System resources
    const memoryUsage = process.memoryUsage()
    const freeMemory = os.freemem() / 1024 / 1024
    const totalMemory = os.totalmem() / 1024 / 1024
    const cpuUsage = os.loadavg()[0].toFixed(2)
    const platform = `${os.platform()} ${os.arch()}`
    const nodeVersion = process.version
    
    // Build status message
    let statusMessage = `🤖 *${botname} Status*\n\n`
    statusMessage += `👑 *Owner*: ${ownerTag}\n`
    statusMessage += `⚡ *Prefix*: [ ${usedPrefix} ]\n`
    statusMessage += `📦 *Version*: ${version}\n\n`
    statusMessage += `📊 *Chat Statistics*\n`
    statusMessage += `   ◦ Private Chats: ${privateChats}\n`
    statusMessage += `   ◦ Groups: ${groups.length}\n`
    statusMessage += `   ◦ Total Chats: ${chats.length}\n`
    statusMessage += `   ◦ Registered Users: ${totalUsers}\n\n`
    statusMessage += `🔄 *System Status*\n`
    statusMessage += `   ◦ Uptime: ${formatUptime(botUptime)}\n`
    statusMessage += `   ◦ Response: ${latency.toFixed(2)}ms\n`
    statusMessage += `   ◦ Sub-Bots: ${activeSubBots}\n\n`
    statusMessage += `💻 *Server Resources*\n`
    statusMessage += `   ◦ Memory: ${(totalMemory - freeMemory).toFixed(2)}MB/${totalMemory.toFixed(2)}MB\n`
    statusMessage += `   ◦ CPU Load: ${cpuUsage}\n`
    statusMessage += `   ◦ Platform: ${platform}\n`
    statusMessage += `   ◦ Node.js: ${nodeVersion}`

    // Send status with banner
    await conn.sendFile(
        m.chat, 
        banner, 
        'status.jpg', 
        statusMessage, 
        m,
        null,
        { thumbnail: await (await fetch(banner)).buffer() }
    )
}

// Helper function to format uptime
function formatUptime(ms) {
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / (1000 * 60)) % 60)
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    const days = Math.floor(ms / (1000 * 60 * 60 * 24))
    
    return `${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s`
}

// Command metadata
handler.help = ['status', 'stats', 'botstats']
handler.tags = ['info', 'system']
handler.command = ['status', 'stats', 'estado', 'estate', 'state', 'stado', 'botstatus']
handler.register = true

export default handler