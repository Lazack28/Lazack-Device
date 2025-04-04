let handler = async (m, { conn, usedPrefix, text, command }) => {
  let waLin = ''
  
  if (text) {
      // Get the number from text
      waLin = text.replace(/[^0-9]/g, '')
  } else if (m.quoted) {
      // If a message is quoted, get the sender's number
      waLin = m.quoted.sender.replace(/[^0-9]/g, '')
  } else if (m.mentionedJid && m.mentionedJid[0]) {
      // If a user is mentioned, get their number
      waLin = m.mentionedJid[0].replace(/[^0-9]/g, '')
  } else {
      throw `⚠️ *Error:* Please provide a number, quote a user, or mention a user.`
  }

  // Construct the WhatsApp link
  const waLink = `https://wa.me/${waLin}`
  
  // Message with improved design and layout
  const message = `
  📲 *WhatsApp Link Generator* 📲
  
  🔗 *Click the link below to start chatting on WhatsApp:*

  ➡️ *WhatsApp Link:*
  [${waLink}](${waLink})

  💬 *Reach out easily by clicking the link above.*
  `

  // Send the designed message
  conn.sendMessage(m.chat, { text: message, quoted: m, contextInfo: { mentionedJid: [m.sender] } })

  // React with a success emoji
  m.react('✅')
}

handler.help = ['wa']
handler.tags = ['tools']
handler.command = ['wa']

export default handler
