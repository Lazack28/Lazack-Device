let handler = async (m, { conn, usedPrefix }) => conn.reply(m.chat, `
╭─「 Donasi • Dana 」
│ • Pulsa [${global.pulsa}]
│ • Dana  [${global.dana}]
╰────
╭─「 *NOTE* 」
│ > Ingin donasi? wa.me/${global.numberowner}
│ _Hasil donasi akan digunakan buat sewa_
│ _atau beli *RDP/VPS* agar bot bisa jalan_
│ _24jam tanpa kendala_
╰────
`.trim(), m) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['main']
handler.command = /^dona(te|si)$/i

module.exports = handler