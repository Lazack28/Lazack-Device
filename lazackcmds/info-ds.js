import { promises as fs } from 'fs'
import path from 'path'

/**
 * Handler to delete session files for a specific chat or user.
 */
const handler = async (m, { conn }) => {
  // Only allow this command on the main bot number
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.reply(m.chat, `⚠️ Please use this command directly from the main bot number.`, m)
  }

  // If group, check both group ID and sender's ID
  const chatIds = m.isGroup ? [m.chat, m.sender] : [m.sender]
  const sessionPath = `./${sessions}/`

  try {
    const files = await fs.readdir(sessionPath)
    let deletedFilesCount = 0

    for (const file of files) {
      for (const id of chatIds) {
        if (file.includes(id.split('@')[0])) {
          await fs.unlink(path.join(sessionPath, file))
          deletedFilesCount++
          break
        }
      }
    }

    if (deletedFilesCount === 0) {
      await conn.reply(m.chat, `ℹ️ No session files were found for this chat/user.`, m)
    } else {
      await conn.reply(m.chat, `✅ Successfully deleted ${deletedFilesCount} session file(s).`, m)
      await conn.reply(m.chat, `👋 Hi! Can you see me now?`, m)
    }
  } catch (err) {
    console.error('Error reading or deleting session files:', err)
    await conn.reply(
      m.chat,
      `⚡ Hello! I am ${botname}. Please follow and support us on our channel:\n\n> ${channel}`,
      m
    )
  }
}

// Command settings
handler.help = ['ds', 'fixwaitingmsg']
handler.tags = ['info']
handler.command = ['fixwaitingmsg', 'ds']
handler.register = true

export default handler
