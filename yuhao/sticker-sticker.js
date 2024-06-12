const fs = require('fs')

let handler = async (m, { conn, command, usedPrefix }) => {
let name = m.name
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/gS0XrNc/avatar-contact.png')
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/image/.test(mime)) {
  let media = await q.download()
  let encmedia = await conn.sendImageAsSticker(m.chat, media, m, {packname: m.name, author: `Request From: ${m.name}\n\n\nticker by ${namebot}\n${botdate}\${bottime}`,
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    showAdAttribution: true,
    mediaType: 2,
    description: wm , 
    title: `nih ${m.name}, sticker nya`,
    body: '',
    thumbnailUrl: pp,
    sourceUrl: ""
     }}
  })
  await fs.unlinkSync(encmedia)
  } else if (/video/.test(mime)) {
  if ((q.msg || q).seconds > 11) return m.reply('maksimal 10 detik!')
  let media = await q.download()
  let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, {packname: '', author: `Request From: ${m.name}\n\n\nticker by ${namebot}\n${botdate}\${bottime}`, 
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    showAdAttribution: true,
    mediaType: 2,
    description: wm , 
    title: `nih ${m.name}, sticker nya`,
    body: '',
    thumbnailUrl: pp,
    sourceUrl: ""
     }}
  })
  await fs.unlinkSync(encmedia)
  } else {
  throw `Kirim Gambar/Video Dengan Caption ${usedPrefix + command}\nDurasi Video 1-9 Detik`
    }
  }
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = /^(stiker|s|sticker)$/i
handler.limit = 2
module.exports = handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))
}