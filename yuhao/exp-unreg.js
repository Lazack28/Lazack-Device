const { createHash } = require('crypto')
let handler = async function (m, { args, usedPrefix }) {
  if (!args[0]) throw `Serial Number kosong\nKetik *${usedPrefix}ceksn* untuk mendapatkan kode SN anda`
  let user = db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw 'Serial Number salah'
  user.registered = false
  m.reply(`Unreg berhasil!`)
}
handler.help = ['', 'ister'].map(v => 'unreg' + v + ' <SN|SERIAL NUMBER>')
handler.tags = ['xp']

handler.command = /^unreg(ister)?$/i
handler.register = true

module.exports = handler