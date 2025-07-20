import moment from 'moment-timezone'

const tagsMap = {
  main: '💗 Information',
  jadibot: '🌟 Sub Bot',
  downloader: '📥 Downloads',
  game: '🎮 Games',
  gacha: '🎲 Gacha RPG',
  rg: '🔰 Registration',
  group: '👥 Groups',
  nable: '🎛️ Features',
  nsfw: '🔞 NSFW +18',
  buscadores: '🔎 Search Tools',
  sticker: '🌈 Stickers',
  econ: '💰 Economy',
  convertidor: '🌀 Converters',
  logo: '🎀 Logo Generator',
  tools: '🧰 Tools',
  randow: '🎁 Random',
  efec: '🎶 Audio Effects',
  owner: '👑 Creator'
}

let handler = async (m, { conn }) => {
  const userId = m.mentionedJid?.[0] || m.sender
  const user = global.db.data.users[userId] || {}
  const name = await conn.getName(userId)
  const botname = conn.user?.name || 'LazackDevice 🌸'
  const fecha = moment.tz('Africa/Nairobi').format('DD/MM/YYYY')
  const hora = moment.tz('Africa/Nairobi').format('HH:mm:ss')
  const uptime = clockString(process.uptime() * 1000)
  const totalreg = Object.keys(global.db.data.users).length
  const limit = user.limite || 0

  const botTag = conn.user?.jid?.split('@')[0] || 'bot'
  const botOfc = conn.user?.id === global.conn?.user?.id
    ? `💫 *Official Bot:* wa.me/${botTag}`
    : `🔗 *Sub Bot of:* wa.me/${global.conn?.user?.jid?.split('@')[0]}`

  const grouped = {}
  const plugins = Object.values(global.plugins).filter(p => !p.disabled)

  for (const plugin of plugins) {
    const cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command]
    if (!cmds) continue
    const tagList = Array.isArray(plugin.tags) ? plugin.tags : []
    const tag = tagList[0] || '__others__'
    if (!grouped[tag]) grouped[tag] = []
    for (const cmd of cmds) {
      if (typeof cmd !== 'string') continue
      grouped[tag].push(`🌸 .${cmd}`)
    }
  }

  let text = `╭─ *𝐋𝐀𝐙𝐀𝐂𝐊-𝐌𝐃* ─╮
🌼 Hello *${name}*! Welcome~
💖 I am *${botname}*, your virtual assistant~

📅 Date: *${fecha}*
⏰ Nairobi Time: *${hora}*
🎀 Active Users: *${totalreg}*
🍬 Your Daily Limit: *${limit}*
🔋 Uptime: *${uptime}*
🤖 Status: ${botOfc}
╰───────────────🌸╯\n`

  for (const tag of Object.keys(grouped)) {
    const section = tagsMap[tag] || '📚 Other Commands'
    text += `\n╭─🎀 *${section}* 🎀─╮\n`
    for (const cmd of grouped[tag]) {
      text += `💫 ${cmd}\n`
    }
    text += '╰───────────────🌸\n'
  }

  let channelRD = {
    id: '@newsletter',
    name: 'LazackOrganisation',
  }

  let banner = 'https://lazackorganisation.my.id/mtaju.jpg'
  let redes = 'https://lazackorganisation.my.id'
  let textbot = `🌸 Thank you for using me, *${name}*~
Don't forget to follow our official channel and show some love on GitHub 💕`

  await conn.sendMessage(m.chat, {
    text: text,
    contextInfo: {
      mentionedJid: [m.sender, userId],
      isForwarded: false,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        newsletterName: channelRD.name,
        serverMessageId: -1,
      },
      forwardingScore: 999,
      externalAdReply: {
        title: botname,
        body: textbot,
        thumbnailUrl: banner,
        sourceUrl: redes,
        mediaType: 1,
        showAdAttribution: false,
        renderLargerThumbnail: true,
      },
    }
  }, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help']
export default handler

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}h ${minutes}m ${seconds}s`
    }
