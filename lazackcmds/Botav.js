
let handler = async (m, { conn}) => {

let name = conn.getName(m.sender)
let av = `./jusorts/${pickRandom(["lazack", "mtaju"])}.mp3`

conn.sendButton(m.chat, `${mssg.hi} *${name}* \n\n${mssg.bohelp} \n`, mssg.ig, null, [
      ['⦙☰ Menu', '.help'],
      ['⦙☰ Menu 2', '.menu2'],
      [`⌬ Support`, '.grp']
    ], m) 
conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true })
} 

handler.customPrefix = /^(bot|lazack)$/i
handler.command = new RegExp

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
