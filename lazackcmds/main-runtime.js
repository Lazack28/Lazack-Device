//made with ❤️ by Shizo & redesigned by Lazack
import { cpus as _cpus, totalmem, freemem } from 'os'
import util from 'util'
import os from 'os'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, isRowner }) => {
  let _muptime
  if (process.send) {
    process.send('uptime')
    _muptime = await new Promise(resolve => {
      process.once('message', resolve)
      setTimeout(resolve, 1000)
    }) * 1000
  }
  let muptime = clockString(_muptime)

  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))

  const used = process.memoryUsage()
  const cpus = _cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })

  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  })

  let old = performance.now()

  await conn.sendMessage(m.chat, {
    react: {
      text: `⏱️`,
      key: m.key,
    }
  })

  let neww = performance.now()
  let speed = neww - old

  let text = `*🤖 LAZACK-MD STATUS*\n\n` +
    `🟢 *Running Time:*\n${muptime}\n\n` +
    `⚡ *Speed:* ${speed.toFixed(2)} ms\n\n` +
    `💻 *CPU Info:*\n` +
    `- Cores: ${cpus.length}\n` +
    `- Model: ${cpus[0].model.trim()}\n` +
    `- Speed: ${cpu.speed.toFixed(2)} MHz\n\n` +
    `🧠 *Memory:*\n` +
    `- Total RAM: ${format(totalmem())}\n` +
    `- Free RAM: ${format(freemem())}\n` +
    `- Used RAM: ${format(used.heapUsed)} / ${format(used.heapTotal)}\n\n` +
    `💬 *Chats:* ${chats.length}\n` +
    `👥 *Groups:* ${groupsIn.length}\n\n` +
    `────────────────────\n` +
    `👨‍💻 Made with ❤️ by *Team Lazack*`

  await conn.sendMessage(m.chat, { text: text, mentions: [m.sender] }, { quoted: m })
}

handler.help = ['runtime']
handler.tags = ['info']
handler.command = /^(uptime|runtime)$/i
export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return `🗓️ *Days:* ${d}\n🕐 *Hours:* ${h}\n⏰ *Minutes:* ${m}\n⏱️ *Seconds:* ${s}`
}
