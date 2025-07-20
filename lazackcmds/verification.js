import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  
  if (user.registered === true) {
    return m.reply(`『✦』You are already registered.\n\n*Want to register again?*\n\nUse this command to unregister:\n*${usedPrefix}unreg*`)
  }

  if (!Reg.test(text)) {
    return m.reply(`『✦』Incorrect format.\n\nCommand usage: *${usedPrefix + command} name.age*\nExample: *${usedPrefix + command} ${name2}.18*`)
  }

  let [_, name, splitter, age] = text.match(Reg)

  if (!name) return m.reply(`『✦』Name cannot be empty.`)
  if (!age) return m.reply(`『✦』Age cannot be empty.`)
  if (name.length >= 100) return m.reply(`『✦』Name is too long.`)

  age = parseInt(age)
  if (age > 1000) return m.reply(`『✦』Wow, a grandpa wants to use the bot.`)
  if (age < 5) return m.reply(`『✦』Is that a baby grandpa? 😂`)

  user.name = name + '✓'.trim()
  user.age = age
  user.regTime = +new Date()
  user.registered = true
  global.db.data.users[m.sender].coin += 40
  global.db.data.users[m.sender].exp += 300
  global.db.data.users[m.sender].joincount += 20

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  let regbot = `✦ 𝗥𝗘𝗚𝗜𝗦𝗧𝗘𝗥𝗘𝗗 ✦\n`
  regbot += `•━━━━━━━━━━━━━━━━━━•\n`
  regbot += `> ✦ Name » ${name}\n`
  regbot += `> ✦ Age » ${age} years\n`
  regbot += `•━━━━━━━━━━━━━━━━━━•\n`
  regbot += `🎁 *Rewards:*\n`
  regbot += `> • ⛁ *${moneda}* » 40\n`
  regbot += `> • ✰ *Experience* » 300\n`
  regbot += `> • ❖ *Tokens* » 20\n`
  regbot += `•━━━━━━━━━━━━━━━━━━•\n`
  regbot += `> ${dev}`

  await m.react('📩')

  await conn.sendMessage(m.chat, {
    text: regbot,
    contextInfo: {
      externalAdReply: {
        title: '✧ Verified User ✧',
        body: textbot,
        thumbnailUrl: pp,
        sourceUrl: channel,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })    
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'register', 'reg', 'verificar', 'registrar'] 

export default handler
