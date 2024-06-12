var name = global.nameown
var numberowner = global.numberowner
var gmail = global.mail
const { 
default: 
makeWASocket,
BufferJSON,
WA_DEFAULT_EPHEMERAL, 
generateWAMessageFromContent, 
downloadContentFromMessage, 
downloadHistory, 
proto,
getMessage, 
generateWAMessageContent, 
prepareWAMessageMedia 
} = require("@whiskeysockets/baileys");
var handler = async (m, {
conn
}) => {
const vcard = `BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${name}
TITLE:
item1.TEL;waid=${numberowner}:${numberowner}@s.whatsapp.net
item1.X-ABLabel:${name}
X-WA-BIZ-DESCRIPTION:Note: Jangan dispam yah kak
X-WA-BIZ-NAME:${name}
END:VCARD`;
const sentMsg  = await conn.sendMessage(
    m.chat,
    { 
        contacts: { 
            displayName: 'CN', 
            contacts: [{ vcard }]
       },
       contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: 'My Creator',
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://telegra.ph/file/0fa0a78bd0ef7b49d080f.jpg',
                    sourceUrl: sgc
                }
            }
   }, { quoted: m})
await conn.reply(m.chat, "Itu Adalah nomor owner Bot", sentMsg)}
handler.command = handler.help = ['owner', 'creator'];
handler.tags = ['info'];
handler.limit = false;
module.exports = handler;