import ws from 'ws'

async function handler(m, { conn: stars, usedPrefix }) {
// async function handler(m, { conn: stars, usedPrefix }) {
// let handler = async (m, { conn }) => {
   let uniqueUsers = new Map()

   if (!global.conns || !Array.isArray(global.conns)) {
     global.conns = []
   }

   global.conns.forEach((conn) => {
     if (conn.user && conn.ws?.socket?.readyState !== ws.CLOSED) {
       uniqueUsers.set(conn.user.jid, conn)
     }
   })
   let users = [...uniqueUsers.values()]
   let totalUsers = uniqueUsers.size
   let img = await (await fetch(`https://pomf2.lain.la/f/hg3otwi4.jpg`)).buffer()
  let message = users.map((v, index) => `
*[ \`${index + 1}\` -  ${v.user.name || 'Sin Nombre'} ]*\n* *🤍 \`Link :\`* https://wa.me/${v.user.jid.replace(/[^0-9]/g , '')}\n`).join('\n\n')

  let replyMessage = message.length === 0 ? '' : message

  let responseMessage = `*[ _Total Subbots Activos :_ \`${totalUsers || 0}\` ]*\n\n${replyMessage.trim()}`.trim()

await stars.sendFile(m.chat, img, 'thumbnail.jpg', responseMessage, m, null, fake, false, { mentions: stars.parseMention(responseMessage) })

}

handler.command = ['listjadibot', 'bots']
handler.help = ['bots']
handler.tags = ['serbot']
export default handler