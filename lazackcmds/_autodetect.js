import chalk from 'chalk'
import fetch from 'node-fetch'
import ws from 'ws'
let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Hello" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  
let chat = global.db.data.chats[m.chat]
let user = `@${m.sender.split`@`[0]}`
let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://lazackorganisation.my.id/mtaju.jpg'
let name, photo, edit, newlink, status, admingp, noadmingp
name = `❀ ${user} has changed the group name.\n\n> ✦ Now the group is called:\n> *${m.messageStubParameters[0]}*.`
photo = `❀ The group image has been changed.\n\n> ✦ Action performed by:\n> » ${user}`
edit = `❀ ${user} has allowed ${m.messageStubParameters[0] == 'on' ? 'only admins' : 'everyone'} to configure the group.`
newlink = `❀ The group link has been reset.\n\n> ✦ Action performed by:\n> » ${user}`
status = `❀ The group has been ${m.messageStubParameters[0] == 'on' ? '*closed*' : '*opened*'} by ${user}\n\n> ✦ Now ${m.messageStubParameters[0] == 'on' ? '*only admins*' : '*everyone*'} can send messages.`
admingp = `❀ @${m.messageStubParameters[0].split`@`[0]} is now an admin of the group.\n\n> ✦ Action performed by:\n> » ${user}`
noadmingp = `❀ @${m.messageStubParameters[0].split`@`[0]} is no longer an admin of the group.\n\n> ✦ Action performed by:\n> » ${user}`

if (chat.detect && m.messageStubType == 2) {
const uniqid = (m.isGroup ? m.chat : m.sender)
const sessionPath = './session/'
for (const file of await fs.readdir(sessionPath)) {
if (file.includes(uniqid)) {
await fs.unlink(path.join(sessionPath, file))
console.log(`${chalk.yellow.bold('[ File Deleted ]')} ${chalk.greenBright(`'${file}'`)}\n` +
`${chalk.blue('(Session PreKey)')} ${chalk.redBright('that causes "undefined" in the chat')}`
)}}

} else if (chat.detect && m.messageStubType == 21) {
await this.sendMessage(m.chat, { text: name, mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 22) {
await this.sendMessage(m.chat, { image: { url: pp }, caption: photo, mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 23) {
await this.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 25) {
await this.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 26) {
await this.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 29) {
await this.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 30) {
await this.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })
} else {
if (m.messageStubType == 2) return
console.log({messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType], 
})
}}
export default handler
