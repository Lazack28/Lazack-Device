let handler = async (m, { conn }) => conn.reply(m.chat, `
*Pertanyaan:* ${m.text}
*Jawaban:* ${pickRandom(["1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "10",])} ${pickRandom(['detik', 'menit', 'jam', 'hari', 'minggu', 'bulan', 'tahun', 'dekade', 'abad'])} lagi ...
  `.trim(), m, m.mentionedJid ? {
    mentions: m.mentionedJid
} : {})

handler.help = ['', 'kah'].map(v => 'kapan' + v + ' <text>?')
handler.tags = ['kerang', 'fun']
handler.customPrefix = /(\?$)/
handler.command = /^kapan(kah)?$/i

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
		}