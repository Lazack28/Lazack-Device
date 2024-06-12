let { groupsSettingUpdate } = require('@whiskeysockets/baileys')
let handler = async (m, { isAdmin, isOwner, isBotAdmin, conn, args, usedPrefix, command }) => {
	if (!(isAdmin || isOwner)) {
		global.dfail('admin', m, conn)
		throw false
	}
	if (!isBotAdmin) {
		global.dfail('botAdmin', m, conn)
		throw false
	}
let prefix = usedPrefix
let bu = `Group telah di buka oleh @${m.sender.split`@`[0]} dan sekarang  semua member dapat mengirim pesan
ketik *${usedPrefix}group tutup*
Untuk menutup grup!`.trim()            
    
	let isClose = {
		'open': 'not_announcement',
		'buka': 'not_announcement',
		'on': 'not_announcement',
		'2': 'not_announcement',
		'close': 'announcement',
		'tutup': 'announcement',
		'off': 'announcement',
		'1': 'announcement',
	}[(args[0] || '')]
	if (isClose === undefined) {
var text5 = `contoh:
${usedPrefix + command} tutup
${usedPrefix + command} buka
	`
m.reply(text5)

		throw false
	} else if (isClose === 'announcement') {
	await conn.groupSettingUpdate(m.chat, isClose)
	let teks = `Group telah di tutup oleh @${m.sender.split`@`[0]} dan sekarang hanya admin yang dapat mengirim pesan
ketik *${usedPrefix}group buka*
Untuk membuka grup!`.trim()
	await conn.reply(m.chat, teks, null, { contextInfo: { mentionedJid: conn.parseMention(teks) }})
	} else if (isClose === 'not_announcement') {
	await conn.groupSettingUpdate(m.chat, isClose)
	await conn.reply(m.chat, bu, null, { contextInfo: { mentionedJid: conn.parseMention(bu) }})
	} else if (isClose === undefined) {

var te = `
contoh:
${usedPrefix + command} tutup
${usedPrefix + command} buka`

m.reply(te)

	}
}

handler.help = ['grup <open/close>']
handler.tags = ['group']
handler.command = /^(g(ro?up|c?)?)$/i
handler.group = true
handler.botAdmin = false

module.exports = handler