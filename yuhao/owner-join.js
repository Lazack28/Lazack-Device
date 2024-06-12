let handler = async (m, { conn, text, usedPrefix, args, participants }) => {
  var time = db.data.users[m.sender].lastjoin + 86400000
  var linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
  var delay = time => new Promise(res => setTimeout(res, time))
 
  var name = m.sender
  var fkonn = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${await conn.getName(name)}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
  var [_, code] = text.match(linkRegex) || []
  if (!args[0]) throw `Link Grup nya mana?` 
  if (!code) throw `Link tidak valid!`
  if (!args[1]) throw `Angakanya mana?`
  if (isNaN(args[1])) throw `Hanya angka, mewakili hari!`
  var anubot = owner[0]
  m.reply(`Tunggu 3 detik bot akan join`)
  await delay(3000)
  try {
  var res = await conn.groupAcceptInvite(code)
  var b = await conn.groupMetadata(res)
  var d = b.participants.map(v => v.id)
  var member = d.toString()
  var e = await d.filter(v => v.endsWith(anubot + '@s.whatsapp.net'))
  var jumlahHari = 86400000 * args[1]
  var now = new Date() * 1
  if (now < global.db.data.chats[res].expired) global.db.data.chats[res].expired += jumlahHari
  else global.db.data.chats[res].expired = now + jumlahHari
  if (e.length) await m.reply(`Sukses invite bot ke group\n\n${await conn.getName(res)}\n\nBot akan keluar secara otomatis setelah *${msToDate(global.db.data.chats[res].expired - now)}*`)
  if (e.length) await conn.reply(res, `Ada @${anubot} Owner-ku Di Sini, Aku Mau Keluar Aja Dah, Takut Kena Marah.
@${conn.user.jid.split(`@`)[0]} akan keluar 5 detik lagi
Bye😑
Thanks dah invite Gua *${m.name}*`, fkonn, {
    mentions: d
     }).then(async () => {
     await delay(7000)
     }).then( async () => {
     await conn.reply(res, `Tapi Boong 🤭`, fkonn)
     await conn.reply(owner[0]+'@s.whatsapp.net', `*INVITING!*\n\n@${m.sender.split('@')[0]} telah mengundang ${conn.user.name} ke grup\n\n${await conn.getName(res)}\n\n${res}\n\nPesan : ${args[0]}\n\nBot akan keluar otomatis setelah *${msToDate(global.db.data.chats[res].expired - now)}*`, m, {mentions: [m.sender]})
     })
     if (!e.length) await conn.reply(owner[0]+'@s.whatsapp.net', `*INVITING!*\n\n@${m.sender.split('@')[0]} telah mengundang ${conn.user.name} ke grup\n\n${await conn.getName(res)}\n\n${res}\n\nPesan : ${args[0]}\n\nBot akan keluar otomatis setelah *${msToDate(global.db.data.chats[res].expired - now)}*`, m, {mentions: [m.sender]})
     if (!e.length) await m.reply(`Sukses invite bot ke group\n\n${await conn.getName(res)}\n\nBot akan keluar secara otomatis setelah *${msToDate(global.db.data.chats[res].expired - now)}*`).then(async () => {
     let mes = `Hello Everyone👋🏻
*${conn.user.name}* adalah salah satu Bot WhatsApp Multi-Device yang di bangun dengan Node.js, *${conn.user.name}* Baru aja di invite oleh *${m.name}*
Untuk menggunakan *${conn.user.name}* silahkan ketik
#menu
@${conn.user.jid.split('@')[0]} akan keluar secara otomatis setelah *${msToDate(global.db.data.chats[res].expired - now)}*`
  await reply(res, mes, fkonn, {
        mentions: d
         })
     })
    } catch (e) {
      conn.reply(owner[0]+'@s.whatsapp.net', e)
      throw `Maaf bot tidak bisa bergabung ke grup!`
      }
}
handler.help = ['join <chat.whatsapp.com> <day>']
handler.tags = ['owner']
handler.command = /^(join)?$/i

handler.owner = true

module.exports = handler

function msToDate(ms) {
    temp = ms
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    return days + " hari " + hours + " jam " + minutes + " menit";
    // +minutes+":"+sec;
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
  seconds = Math.floor((duration / 1000) % 60),
  minutes = Math.floor((duration / (1000 * 60)) % 60),
  hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit"
}