import fetch from 'node-fetch'  
const isLinkTik = /tiktok.com/i 
const isLinkYt = /youtube.com|youtu.be/i 
const isLinkTel = /telegram.com/i 
const isLinkFb = /facebook.com|fb.me/i 
const isLinkIg = /instagram.com/i 
const isLinkTw = /twitter.com/i 
  
let handler = m => m
handler.before = async function (m, { conn, args, usedPrefix, command, isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe)
    return !0 // Ignore messages from the bot itself
  if (!m.isGroup) return !1 // Only process messages in groups

  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[this.user.jid] || {}
  let delet = m.key.participant
  let bang = m.key.id
  let toUser = `${m.sender.split("@")[0]}`
  let aa = toUser + '@s.whatsapp.net'
  
  // Check for specific links
  const isAntiLinkTik = isLinkTik.exec(m.text)
  const isAntiLinkYt = isLinkYt.exec(m.text)
  const isAntiLinkTel = isLinkTel.exec(m.text)
  const isAntiLinkFb = isLinkFb.exec(m.text)
  const isAntiLinkIg = isLinkIg.exec(m.text)
  const isAntiLinkTw = isLinkTw.exec(m.text)
 
  // Handle TikTok links
  if (chat.antiTiktok && isAntiLinkTik) {  
    if (isBotAdmin && bot.restrict) {
      await conn.reply(m.chat, `《★》A \`TikTok\` link was detected.\nYou will be removed: *@${toUser}*`, null, { mentions: [aa] })
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    } else if (!isBotAdmin) {
      return m.reply(`《★》The bot is not an admin, I cannot remove people.`)
    } else if (!bot.restrict) {
      return m.reply(`《★》Restrictions are not active.`)
    }
  }
  
  // Handle YouTube links
  if (chat.antiYoutube && isAntiLinkYt) {
    if (isBotAdmin && bot.restrict) {
      await conn.reply(m.chat, `《★》A \`YouTube\` link was detected.\nYou will be removed: *@${toUser}*`, null, { mentions: [aa] })
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    } else if (!isBotAdmin) {
      return m.reply(`《★》The bot is not an admin, I cannot remove people.`)
    } else if (!bot.restrict) {
      return m.reply(`《★》Restrictions are not active.`)
    }
  }  
  
  // Handle Telegram links
  if (chat.antiTelegram && isAntiLinkTel) {
    if (isBotAdmin && bot.restrict) {
      await conn.reply(m.chat, `《★》A \`Telegram\` link was detected.\nYou will be removed: *@${toUser}*`, null, { mentions: [aa] })
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    } else if (!isBotAdmin) {
      return m.reply(`《★》The bot is not an admin, I cannot remove people.`)
    } else if (!bot.restrict) {
      return m.reply(`《★》Restrictions are not active.`)
    }
  }    
  
  // Handle Facebook links
  if (chat.antiFacebook && isAntiLinkFb) {
    if (isBotAdmin && bot.restrict) {
      await conn.reply(m.chat, `《★》A \`Facebook\` link was detected.\nYou will be removed: *@${toUser}*`, null, { mentions: [aa] })
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    } else if (!isBotAdmin) {
      return m.reply(`《★》The bot is not an admin, I cannot remove people.`)
    } else if (!bot.restrict) {
      return m.reply(`《★》Restrictions are not active.`)
    }
  }  
  
  // Handle Instagram links
  if (chat.antiInstagram && isAntiLinkIg) {
    if (isBotAdmin && bot.restrict) {
      await conn.reply(m.chat, `《★》A \`Instagram\` link was detected.\nYou will be removed: *@${toUser}*`, null, { mentions: [aa] })
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    } else if (!isBotAdmin) {
      return m.reply(`《★》The bot is not an admin, I cannot remove people.`)
    } else if (!bot.restrict) {
      return m.reply(`《★》Restrictions are not active.`)
    }
  }
  
  // Handle Twitter links
  if (chat.antiTwitter && isAntiLinkTw) {
    if (isBotAdmin && bot.restrict) {
      await conn.reply(m.chat, `《★》A \`Twitter\` link was detected.\nYou will be removed: *@${toUser}*`, null, { mentions: [aa] })
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    } else if (!isBotAdmin) {
      return m.reply(`《★》The bot is not an admin, I cannot remove people.`)
    } else if (!bot.restrict) {
      return m.reply(`《★》Restrictions are not active.`)
    }
  }
  return !0
}
export default handler