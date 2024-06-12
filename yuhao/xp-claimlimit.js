let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let _md = `${Math.floor(Math.random() * 10)}`.trim()
    let md = (_md * 1)
    let __timers = (new Date - user.lastclaimlimit)
    let _timers = (86400000 - __timers)
    let timers = clockString(_timers) 
    if (new Date - user.lastclaimlimit > 86400000) {
        conn.reply(m.chat, `Anda mendapatkan *${md}* Limit`, m)
        global.db.data.users[m.sender].limit += md * 1
        global.db.data.users[m.sender].lastclaimlimit = new Date * 1
    } else {
        m.reply(`silahkan tunggu *${timers}* lagi untuk bisa mengclaim lagi`)
    }
}
handler.help = ['claimlimit']
handler.tags = ['xp']
handler.command = /^(claimlimit)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.register = false
handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}