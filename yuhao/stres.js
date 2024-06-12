let { wangy, nenen, simp, sherk } = require('../lib/stres')
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh Penggunaan\n${usedPrefix + command} keqing`
  switch(command) {
   case 'wangy': 
   m.reply(await wangy(text))
   break
   case 'nenen':
   m.reply(await nenen(text))
   break
   case 'simp':
   m.reply(await simp(text))
   break
   case 'sherk':
   m.reply(await sherk(text))
   break
}
}
handler.help = ['wangy', 'nenen', 'simp', 'sherk']
handler.tags = ['fun']
handler.command = /^(wangy|nenen|simp|sherk)$/i

module.exports = handler
