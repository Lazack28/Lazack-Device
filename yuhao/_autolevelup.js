const { color } = require('../lib/color')
const moment = require("moment-timezone")
let levelling = require('../lib/levelling')
const canvafy = require('canvafy')
const fetch = require('node-fetch')
module.exports = {
	async function (m) {
		let user = global.db.data.users[m.sender]
		if (!user.autolevelup) return !0
		let before = user.level * 1
		while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++

		if (before !== user.level) {
            let name = m.name
            let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/gS0XrNc/avatar-contact.png')
            let p = await new canvafy.LevelUp()
    .setAvatar(pp)
    .setBackground("image", "https://telegra.ph/file/a3e66e0fa840b08236c75.jpg")
    .setUsername(`${name}`)
    .setBorder("#000000")
    .setAvatarBorder("#ff0000")
    .setOverlayOpacity(0.7)
    .setLevels(before,user.level)
    .build();
			let chating = `Hai *@${m.sender.split`@`[0]}*, Selamat Level kamu naik ke!
*${before}* -> *${user.level}*`.trim()
			conn.sendFile(m.chat, p, null, chating, m, { contextInfo: { mentionedJid: conn.parseMention(chating) }})
		}
	}
}