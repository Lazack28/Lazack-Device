let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta'); // Change this to your local timezone
moment.locale('id'); // Change this to your locale
let handler = async (m, { conn, usedPrefix }) => {
  global.pp = 'https://i.ibb.co/gS0XrNc/avatar-contact.png'
  let prefix = usedPrefix
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.profilePictureUrl(who, 'image')
  } catch (e) {

  } finally {
    let { name, premium, premiumTime, atm, limit, warning, pasangan, money, exp, lastclaim, registered, regTime, age, level, role } = global.db.data.users[who] 
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = m.name
    let str = `
Name: ${username} | ${name}
Tag: @${who.split`@`[0]}
Premium: ${premium ? `${conn.msToDate(premiumTime - new Date() * 1)}` : 'Gratisan'}
Number: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
Umur: *${age == '-1' ? 'Belum Daftar' : age}*
Link: wa.me/${who.split`@`[0]}
Level: *${level}*
Rank : *${role}*
Limit: *${limit}*
Registered: ${registered ? 'Yes (' +  moment(new Date(regTime)).format('dddd, Do MMMM YYYY, hh:mm')+ ')': 'No'}
`.trim()
    let mentionedJid = [who]
    //conn.sendFile(m.chat, pp, 'pp.jpg', str, m, false, { contextInfo: { mentionedJid }})
   // conn.sendTemplateButtonFakeImg(m.chat, await (await fetch(pp)).buffer(), str, wm, 'Menu', `${prefix}menu`, { mentions: [m.sender] })
   await conn.reply(m.chat, str, m, { contextInfo: {
    mentionedJid: [m.sender],
externalAdReply: {
            title: "乂 P R O F I L E",
            body: '',
            description: wm,
            mediaType: 1,
            thumbnailUrl: pp,
            renderLargerThumbnail: true,
sourceUrl: `https://wa.me/${who.split`@`[0]}`
        }
     }
    })
    //conn.send2ButtonLoc(m.chat, await (await fetch(pp)).buffer(), str, wm, `Menu`, `${prefix}menu`, 'Claim', `${prefix}claim`)
  }
}
handler.help = ['pp', 'me']
handler.tags = ['xp']
handler.command = /^(pp|profile|profil|propil|me)$/i
handler.register = false
module.exports = handler