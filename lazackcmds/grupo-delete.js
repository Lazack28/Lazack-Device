const handler = async (m, { conn }) => {
  // Check if message is quoted
  if (!m.quoted) {
    return conn.reply(
      m.chat, 
      `${emoji} Please quote the message you want to delete.`,
      m
    );
  }

  try {
    // Try to delete normally (for bot's own messages)
    const quotedKey = m.quoted.key;
    return conn.sendMessage(
      m.chat, 
      { delete: quotedKey }
    );
  } catch (error) {
    try {
      // Alternative method for deleting others' messages
      const contextInfo = m.quoted?.msg?.contextInfo;
      if (!contextInfo) throw new Error('No context info');
      
      return conn.sendMessage(
        m.chat,
        {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: contextInfo.stanzaId,
            participant: contextInfo.participant
          }
        }
      );
    } catch (err) {
      console.error('Delete failed:', err);
      return conn.reply(
        m.chat,
        `${emoji2} Failed to delete the message. I may not have permission.`,
        m
      );
    }
  }
};

// Command configuration
handler.help = ['delete'];
handler.tags = ['group'];
handler.command = ['del', 'delete', 'eliminar'];
handler.group = true;      // Works in groups
handler.admin = true;      // Requires admin privileges
handler.botAdmin = true;   // Bot needs to be admin

export default handler;