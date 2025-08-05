import { search, download } from 'aptoide-scraper'

var handler = async (m, {conn, usedPrefix, command, text}) => {
if (!text) return conn.reply(m.chat, `${emoji} Please enter the name of the apk to download.`, m)
try {
await m.react(rwait)
conn.reply(m.chat, `${emoji} Downloading your application, please wait a moment...`, m)
let searchA = await search(text)
let data5 = await download(searchA[0].id)
let txt = `*乂  APTOIDE - DOWNLOADS* 乂\n\n`
txt += `☁️ *Name* : ${data5.name}\n`
txt += `🔖 *Package* : ${data5.package}\n`
txt += `🚩 *Update* : ${data5.lastup}\n`
txt += `⚖ *Size* :  ${data5.size}`
await conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', txt, m) 
await m.react(done)  
if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
return await conn.reply(m.chat, `${emoji2} The file is too large.`, m)}
await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: fkontak})
} catch {
return conn.reply(m.chat, `${msm} An error occurred...`, m)}}

handler.tags = ['downloads']
handler.help = ['apkmod']
handler.command = ['apk', 'modapk', 'aptoide']
handler.group = true;
handler.register = true;
handler.coin = 5;

export default handler