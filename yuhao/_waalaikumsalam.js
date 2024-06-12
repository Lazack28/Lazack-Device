var handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `_وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ_\n_wa\'alaikumussalam wr.wb._\n
*ᴏʀᴀɴɢ ʏᴀɴɢ ᴍᴇɴɢᴜᴄᴀᴘᴋᴀɴ ꜱᴀʟᴀᴍ ꜱᴇᴘᴇʀᴛɪ ɪɴɪ ᴍᴀᴋᴀ ɪᴀ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ 30 ᴘᴀʜᴀʟᴀ, ᴋᴇᴍᴜᴅɪᴀɴ, ᴏʀᴀɴɢ ʏᴀɴɢ ᴅɪʜᴀᴅᴀᴘᴀɴ ᴀᴛᴀᴜ ᴍᴇɴᴅᴇɴɢᴀʀɴʏᴀ ᴍᴇᴍʙᴀʟᴀꜱ ᴅᴇɴɢᴀɴ ᴋᴀʟɪᴍᴀᴛ ʏᴀɴɢ ꜱᴀᴍᴀ ʏᴀɪᴛᴜ ᴡᴀᴀʟᴀꜱᴀʟᴀᴍ ᴡᴀʀᴀʜᴍᴀᴛᴜʟʟᴀʜɪ ᴡᴀʙᴀʀᴀᴋᴀᴛᴜʜ” ᴀᴛᴀᴜ ᴅɪᴛᴀᴍʙᴀʜ ᴅᴇɴɢᴀɴ ʏᴀɴɢ ʟᴀɪɴ (ᴡᴀʀɪᴅʜᴡᴀᴀɴᴀ). ᴀʀᴛɪɴʏᴀ ꜱᴇʟᴀɪɴ ᴅᴀʀɪᴘᴀᴅᴀ ᴅᴏ'ᴀ ꜱᴇʟᴀᴍᴀᴛ ᴊᴜɢᴀ ᴍᴇᴍɪɴᴛᴀ ᴘᴀᴅᴀ ᴀʟʟᴀʜ ꜱᴡᴛ"* `
await conn.reply(m.chat, info, m)
return m.react("😇")
}
handler.customPrefix = /^(assalam(ualaikum)?|(salamualaiku|(sa(lamu|m)liku|sala))m)$/i
handler.command = new RegExp

module.exports = handler
