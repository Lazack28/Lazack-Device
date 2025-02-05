import fs from "fs"
let handler = async (m, { conn, usedPrefix }, args, command) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let uniqid = `${who.split`@`[0]}`
try {
if(global.conns.push(conn))
await conn.sendMessage(m.chat, {text : usedPrefix + 'pair' + " " + Buffer.from(fs.readFileSync("./session/" + uniqid + "/creds.json"), "utf-8").toString("base64")}, { quoted: m })
} catch(e) {
await conn.reply(m.chat, `*You are not a Sub-Bot of this Bot.*

> 👉 To become a Sub-Bot, use the command:
\`${usedPrefix + 'pair'}\`

> ⚠️ Having trouble logging in?
*If you cannot access your session, delete the created session from the linked devices and use the command:*
\`${usedPrefix + 'eliminarjb'}\`
This way, you can request a new session.`, m)
if (m.fromMe) return
}}
handler.command = /^(codetoken)$/i
handler.private = true
export default handler