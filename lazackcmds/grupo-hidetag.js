import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

const handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
  // Validate input
  if (!m.quoted && !text) {
    return conn.reply(
      m.chat, 
      `❀ Please provide text or quote a message to mention all.\n\nExample: *${usedPrefix}hidetag Hello everyone!*`,
      m
    )
  }

  try {
    // Get all participant JIDs
    const users = participants.map(u => conn.decodeJid(u.id))
    if (users.length === 0) throw new Error('No participants found')

    // Prepare message content
    const quotedMsg = m.quoted ? m.quoted : m
    const messageContent = text || quotedMsg.text || 'Hello everyone!'
    const hiddenMentionChar = String.fromCharCode(8206).repeat(850) // Invisible character for hidetag

    // For media messages
    if (m.quoted?.mtype) {
      const mime = (quotedMsg.msg || quotedMsg).mimetype || ''
      const isMedia = /image|video|sticker|audio/.test(mime)
      
      if (isMedia) {
        const media = await quotedMsg.download?.()
        const mediaType = quotedMsg.mtype.replace('Message', '').toLowerCase()
        
        return conn.sendMessage(
          m.chat,
          { 
            [mediaType]: media,
            caption: mediaType !== 'sticker' ? messageContent : undefined,
            mentions: users
          },
          { quoted: null }
        )
      }
    }

    // For text messages
    await conn.sendMessage(
      m.chat,
      {
        text: `${hiddenMentionChar}${messageContent}`,
        mentions: users
      },
      { quoted: null }
    )

  } catch (error) {
    console.error('Hidetag error:', error)
    await conn.reply(
      m.chat,
      `❀ Failed to send mention-all message:\n${error.message}`,
      m
    )
  }
}

// Command configuration
handler.help = ['hidetag <text>', 'notify <text>']
handler.tags = ['group']
handler.command = ['hidetag']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler