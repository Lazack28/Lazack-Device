const handler = async (m, { conn, text, usedPrefix, command }) => {
  // Input validation
  if (!text) {
    const example = `> 📌 Example: *${usedPrefix + command}* Option1|Option2|Option3`;
    return conn.reply(
      m.chat,
      `${emoji} Please enter text to start the poll.\n\n${example}`,
      m
    );
  }

  if (!text.includes('|')) {
    const example = `> 📌 Example: *${usedPrefix + command}* Option1|Option2`;
    return conn.reply(
      m.chat,
      `${emoji2} Separate poll options with *|*\n\n${example}`,
      m
    );
  }

  // Process options
  const options = text.split('|')
    .map(option => option.trim())
    .filter(option => option.length > 0);

  // Validate we have at least 2 options
  if (options.length < 2) {
    return conn.reply(
      m.chat,
      `${emoji2} Please provide at least 2 different options for the poll.`,
      m
    );
  }

  try {
    // Create poll
    await conn.sendPoll(
      m.chat,
      `${packname} Poll`, // Poll title
      options.map(option => [option]), // Format options
      m // Original message context
    );
  } catch (error) {
    console.error('Poll creation error:', error);
    await conn.reply(
      m.chat,
      `${emoji2} Failed to create poll. Please try again later.`,
      m
    );
  }
};

// Command configuration
handler.help = ['poll <option1|option2|option3>'];
handler.tags = ['group'];
handler.command = ['poll', 'encuesta', 'votacion'];
handler.group = true;
handler.admin = false; // Anyone can use
handler.botAdmin = true; // Bot needs to be admin to send polls

export default handler;