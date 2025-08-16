const handler = async (m, { conn, args, usedPrefix, command }) => {
  // Validate input
  if (!args.length) {
    const example = `Example: *${usedPrefix}${command}* Cool Group Name`;
    return m.reply(
      `${emoji} Please enter the new group name.\n\n${example}`
    );
  }

  const newName = args.join(' ');

  // Validate name length (WhatsApp allows 25-1024 chars for group names)
  if (newName.length < 1) {
    return m.reply(`${emoji2} Group name cannot be empty.`);
  }
  if (newName.length > 1024) {
    return m.reply(
      `${emoji2} Group name is too long (max 1024 characters).\n` +
      `Current length: ${newName.length} characters.`
    );
  }

  try {
    // Update group name
    await conn.groupUpdateSubject(m.chat, newName);
    
    // Success confirmation
    await m.reply(`${emoji} Group name changed to: *${newName}*`);
    await m.react('✅');
    
  } catch (error) {
    console.error('Group name change error:', error);
    let errorMessage = `${emoji2} Failed to change group name. `;
    
    // Handle specific error cases
    if (error.message.includes('401')) {
      errorMessage += 'I need admin privileges to change the name.';
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
handler.help = ['setname <text>', 'groupname <text>'];
handler.tags = ['group'];
handler.command = ['setname', 'gpname', 'groupname', 'setgroupname'];
handler.group = true;       // Only works in groups
handler.admin = true;      // Requires admin privileges
handler.botAdmin = true;   // Bot needs admin to change name

export default handler;