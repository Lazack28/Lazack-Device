let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let name = conn.getName(m.sender)
  let taguser = '@' + m.sender.split('@s.whatsapp.net')[0]
  let av = `./jusorts/${pickRandom(['lazack', 'mtaju'])}.mp3`

conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true })
} 

handler.customPrefix = /^(bot|lazack)$/i
handler.command = new RegExp()

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
