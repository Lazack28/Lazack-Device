const handler = async (m, { conn, args, usedPrefix, command }) => {
  // Check if description text is provided
  if (!args.length) {
    return m.reply(
      `${emoji} Please provide a new group description.\n\n` +
      `Example: *${usedPrefix}${command}* This is our awesome group!`
    );
  }

  const newDescription = args.join(' ');

  // Validate description length (WhatsApp allows up to 1024 chars)
  if (newDescription.length > 1024) {
    return m.reply(
      `${emoji2} Description is too long (max 1024 characters).\n` +
      `Current length: ${newDescription.length} characters.`
    );
  }

  try {
    // Update group description
    await conn.groupUpdateDescription(m.chat, newDescription);
    
    // Success confirmation
    await m.reply(`${emoji} Group description updated successfully!`);
    await m.react('✅');
    
  } catch (error) {
    console.error('Description update error:', error);
    let errorMessage = `${emoji2} Failed to update group description. `;
    
    // Handle specific error cases
    if (error.message.includes('401')) {
      errorMessage += 'I need admin privileges to change the description.';
    } else if (error.message.includes('404')) {
      errorMessage += 'Group not found.';
    } else {
      errorMessage += `Error: ${error.message}`;
    }
    
    await m.reply(errorMessage);
    await m.react('❌');
  }
};

// Command configuration
handler.help = ['setdesc <text>', 'groupdesc <text>'];
handler.tags = ['group'];
handler.command = ['setdesc', 'gpdesc', 'groupdesc', 'setgroupdesc'];
handler.group = true;       // Only works in groups
handler.admin = true;      // Requires admin privileges
handler.botAdmin = true;   // Bot needs admin to change description

export default handler;