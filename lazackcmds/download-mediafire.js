import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

if (!text) throw m.reply(`${emoji} Please enter a Mediafire link.`);
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
      let ouh = await fetch(`https://api.agatz.xyz/api/mediafire?url=${text}`)
  let gyh = await ouh.json() 
      await conn.sendFile(m.chat, gyh.data[0].link, `${gyh.data[0].nama}`, `乂  *MEDIAFIRE - DOWNLOADS!*  乂\n\n✩ *Name* : ${gyh.data[0].nama}\n✩ *Size* : ${gyh.data[0].size}\n✩ *MimeType* : ${gyh.data[0].mime}\n> ${dev}`, m)       
      await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['mediafire']
handler.tags = ['downloads']
handler.command = ['mf', 'mediafire']
handler.coin = 10
handler.register = true
handler.group = true

export default handler
