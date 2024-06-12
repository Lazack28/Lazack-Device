let fs = require('fs')

let handler = async (m, { conn, command, usedPrefix, text }) => {
  let pac = JSON.parse(fs.readFileSync('./package.json'))
  let fetch = require('node-fetch')
  let _uptime = process.uptime() * 1000
  let a = require('moment-timezone').tz('Asia/Jakarta').format('HH:mm:ss') 
  let d = new Date(new Date + 3600000)
  let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  let runtime = clockString(_uptime)
  let usergakdaftar = Object.keys(global.db.data.users).length
  let userdaftar = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let caption = `
${sa}${kki} ${conn.user.name} ${kka}
${gy} Library : *@whiskeysockets/baileys*
${gy} Language : *Javascript*
${gy} Database : *Local DB*
${gy} Version : *${pac.version}*
${gy} Developer : *@${numberowner}*
${gy} Runtime : *${runtime}*
${gy} Prefix : *Multi Prefix 「 ${usedPrefix} 」*
${gy} Mode : *${global.opts['self'] ? 'Self' : 'Public'}*
${gy} User : *${usergakdaftar}*
${gy} Register : *${userdaftar}*
${sb}
`.trim()
var as = `Tanggal : ${week}, ${date}\nWaktu : ${a} (WIB)`
 //conn.sendTBL(m.chat, infonyacok, as, fla + `${command}`, `Source Code Bot ✨`, data.sc, null, null, `Menu`, `${usedPrefix}menu`, null, null, null, null, m, 
     /*conn.reply(m.chat, caption,  m, { contextInfo:
mentionedJid: [numberowner + "@s.whatsapp.net", m.sender],
{ externalAdReply :{
        showAdAttribution: true,
        mediaType: 1,
        description: null, 
        title: as,
        body: wm,
        thumbnailUrl: fla + command,
        sourceUrl: sig,
        renderLargerThumbnail: true
        }}
       })*/
await conn.sendMessage(m.chat, {
text: caption,
contextInfo: {
mentionedJid: [numberowner + "@s.whatsapp.net", m.sender],
externalAdReply: {
showAdAttribution: true,
title: as,
body: '',
thumbnailUrl: fla + command,
sourceUrl: sig,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
handler.help = ['infobot']
handler.tags = ['info']
handler.command = /^(info(bot)?)$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}