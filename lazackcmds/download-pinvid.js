import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw m.reply(`${emoji} Please enter the link of a Pinterest video/image.`);
	conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
	let ouh = await fetch(`https://api.agatz.xyz/api/pinterest?url=${text}`)
	let gyh = await ouh.json()
	await conn.sendFile(m.chat, gyh.data.result, `pinvideobykeni.mp4`, `*${emoji} Url:* ${gyh.data.url}`, m)
	await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['pinvid *<link>*']
handler.tags = ['downloads']
handler.command = ['pinvideo', 'pinvid']
handler.premium = false
handler.group = true
handler.register = true
handler.coin = 2

export default handler