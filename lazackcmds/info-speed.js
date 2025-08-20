
import { totalmem, freemem } from 'os'
import os from 'os'
import util from 'util'
import osu from 'node-os-utils'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

const format = sizeFormatter({ 
    std: 'JEDEC', 
    decimalPlaces: 2, 
    keepTrailingZeroes: false, 
    render: (literal, symbol) => `${literal} ${symbol}B` 
})

const handler = async (m, { conn }) => {
    try {
        // Performance measurement
        let timestamp = speed()
        let latency = speed() - timestamp

        // Uptime calculation
        let _muptime = process.uptime() * 1000
        let uptime = formatUptime(_muptime)

        // Chat statistics
        let chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
        let groups = Object.entries(conn.chats).filter(([jid, chat]) => 
            jid.endsWith('@g.us') && 
            chat.isChats && 
            !chat.metadata?.read_only && 
            !chat.metadata?.announce
        ).map(v => v[0])

        // Build status message
        let statusText = `${emoji} *${packname} Status*\n\n` +
            `🚀 *Performance:*\n` +
            `→ Latency: ${latency.toFixed(4)}ms\n\n` +
            `🕒 *Uptime:*\n` +
            `→ ${uptime}\n\n` +
            `💫 *Chat Statistics:*\n` +
            `→ ${chats.length} Private Chats\n` +
            `→ ${groups.length} Groups\n\n` +
            `🏆 *Server Status:*\n` +
            `➤ *RAM Usage:* ${format(totalmem() - freemem())} / ${format(totalmem())}`.trim()

        // Add reaction
        await m.react('✈️')

        // Send status message
        await conn.reply(m.chat, statusText, m)

    } catch (error) {
        console.error('Speed command error:', error)
        await conn.reply(m.chat, '❌ Failed to retrieve performance data', m)
    }
}

handler.help = ['speed']
handler.tags = ['info', 'performance']
handler.command = ['speed',]
handler.register = true

export default handler

function formatUptime(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}