import { areJidsSameUser } from '@whiskeysockets/baileys'

const handler = async (m, { conn, text, participants, args, command }) => {
  // Configuration
  const KICK_DELAY = 10000 // 10 seconds between kicks
  const MIN_MESSAGES = 0 // Minimum messages to not be considered ghost
  
  // Get all member IDs
  const members = participants.map(u => u.id)
  
  // Determine how many to process (all or specified number)
  const processCount = text && !isNaN(text) ? Math.min(Number(text), members.length) : members.length
  
  // Identify ghost members
  let ghostCount = 0
  const ghosts = []
  
  for (let i = 0; i < processCount; i++) {
    const memberId = members[i]
    const userData = global.db.data.users[memberId] || {}
    const participant = participants.find(u => areJidsSameUser(u.id, memberId)) || {}
    
    const isGhost = (
      (userData.chat === undefined || userData.chat <= MIN_MESSAGES) &&
      !participant.admin &&
      !participant.isSuperAdmin &&
      (userData.whitelist === undefined || userData.whitelist === false)
    )
    
    if (isGhost) {
      ghostCount++
      ghosts.push(memberId)
    }
  }

  // Handle commands
  switch (command) {
    case 'fantasmas': // Ghost list command
      if (ghostCount === 0) {
        return conn.reply(m.chat, `${emoji} This group is active, no ghost members found.`, m)
      }
      
      const ghostList = ghosts.map(v => '@' + v.split('@')[0]).join('\n')
      return conn.reply(
        m.chat,
        `${emoji} *Ghost Member Report*\n\n` +
        `${emoji2} *Ghost Members (${ghostCount})*\n${ghostList}\n\n` +
        `*📝 NOTE:*\n` +
        `This is not 100% accurate. The bot only counts messages since it was activated.`,
        m,
        { mentions: ghosts }
      )

    case 'kickfantasmas': // Ghost removal command
      if (ghostCount === 0) {
        return conn.reply(m.chat, `${emoji} This group is active, no ghosts to remove.`, m)
      }

      // Disable welcome temporarily
      const chatData = global.db.data.chats[m.chat]
      const originalWelcome = chatData.welcome
      chatData.welcome = false

      try {
        // Announce removal
        const ghostList = ghosts.map(v => '@' + v.split('@')[0]).join('\n')
        await conn.reply(
          m.chat,
          `${emoji} *Ghost Member Removal*\n\n` +
          `${emoji2} *Ghost Members (${ghostCount})*\n${ghostList}\n\n` +
          `_The bot will remove listed users every 10 seconds._`,
          m,
          { mentions: ghosts }
        )

        // Process removals with delay
        for (const user of ghosts) {
          if (!areJidsSameUser(user, conn.user.id)) { // Don't kick self
            await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
              .catch(e => console.error(`Failed to remove ${user}:`, e))
            await delay(KICK_DELAY)
          }
        }
      } finally {
        // Restore welcome setting
        chatData.welcome = originalWelcome
      }
      break
  }
}

// Command configuration
handler.help = [
  'fantasmas - List inactive members',
  'kickfantasmas - Remove inactive members'
]
handler.tags = ['group']
handler.command = ['ghosts', 'kickghosts']
handler.group = true
handler.botAdmin = true // Bot needs admin to check members and kick
handler.admin = true // User needs admin to use these commands

export default handler

// Utility function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))