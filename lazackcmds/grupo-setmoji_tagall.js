/**
 * Set Group Custom Emoji Command
 * @author Angel-OFC
 * @description Edits group tagall with your favorite emoji
 * @channel https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
 */

const handler = async (m, { conn, text, isAdmin }) => {
  // Input validation
  if (!text) {
    const example = `Example: *${usedPrefix}setemoji 😊*`;
    return conn.reply(
      m.chat,
      `${emoji} Please provide a valid emoji.\n\n${example}`,
      m
    );
  }

  // Clean and validate emoji
  const customEmoji = text.trim();
  if (!isValidEmoji(customEmoji)) {
    return conn.reply(
      m.chat,
      `${emoji2} Invalid emoji format. Please provide:\n` +
      `• A single emoji (1-2 characters)\n` +
      `• No text or combined emojis`,
      m
    );
  }

  try {
    // Initialize chat data if not exists
    if (!global.db.data.chats[m.chat]) {
      global.db.data.chats[m.chat] = {};
    }

    // Store emoji in database
    global.db.data.chats[m.chat].customEmoji = customEmoji;

    // Success response
    const successMsg = `🎉 Group emoji successfully updated!\n\n` +
      `New emoji: ${customEmoji}\n` +
      `This will now be used in group tagalls.`;
    
    await conn.sendMessage(
      m.chat,
      { 
        text: successMsg,
        mentions: [m.sender]
      },
      { quoted: m }
    );
    await m.react('✅');

  } catch (error) {
    console.error('SetEmoji Error:', error);
    await conn.reply(
      m.chat,
      `${emoji2} Failed to update emoji: ${error.message}`,
      m
    );
    await m.react('❌');
  }
};

// Enhanced emoji validation
const isValidEmoji = (text) => {
  // Unicode emoji validation
  const emojiRegex = /^\p{Emoji}$/u;
  return emojiRegex.test(text) && text.length <= 2;
};

// Command configuration
handler.help = ['setemoji <emoji>'];
handler.tags = ['group', 'tools'];
handler.command = ['setemoji', 'setemo', 'changeemoji'];
handler.group = true;
handler.admin = true;  // Requires group admin
handler.botAdmin = true; // Bot needs admin to modify group settings

export default handler;