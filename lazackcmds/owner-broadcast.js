import { randomBytes } from 'crypto'

let handler = async (m, { conn, text }) => {
  try {
    let chats = Object.entries(conn.chats)
      .filter(([_, chat]) => chat.isChats)
      .map(v => v[0])

    if (!chats.length) {
      return conn.reply(m.chat, '❌ No active chats found for broadcast.', m)
    }

    let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
    let teks = text ? text : cc.text

    conn.reply(m.chat, `🔹 *Broadcast Started*\n📢 *Sending to:* ${chats.length} chats...`, m)

    let sentCount = 0
    for (let id of chats) {
      try {
        await conn.copyNForward(
          id,
          conn.cMod(
            m.chat,
            cc,
            /bc|broadcast|tx/i.test(teks)
              ? teks
              : `📢 *BROADCAST ┃ OWNER*\n━━━━━━━━━━━━\n${teks}`
          ),
          true
        )
        sentCount++
      } catch (e) {
        console.error(`❌ Failed to send to ${id}:`, e.message)
      }
    }

    m.reply(`✅ *Broadcast Completed*\n📩 Successfully sent to: ${sentCount}/${chats.length} chats`)
  } catch (err) {
    console.error('❌ Broadcast Error:', err.message)
    m.reply('⚠️ An error occurred while sending the broadcast.')
  }
}

handler.help = ['tx']
handler.tags = ['owner']
handler.command = /^(broadcast|bc|tx)$/i
handler.owner = true

export default handler

// Generate a random unique ID
const randomID = (length) =>
  randomBytes(Math.ceil(length * 0.5))
    .toString('hex')
    .slice(0, length)
