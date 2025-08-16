const handler = async (m, { conn, isOwner }) => {
  try {
    // Get all warned users from database
    const warnedUsers = Object.entries(global.db.data.users)
      .filter(([_, user]) => user.warn > 0)
      .sort((a, b) => b[1].warn - a[1].warn); // Sort by warn count (highest first)

    // Format the list
    let caption = `⚠️ *Warned Users List*\n` +
                 `*╭•·–––––––––––––––––––·•*\n` +
                 `│ *Total Warned Users: ${warnedUsers.length}*\n`;

    if (warnedUsers.length > 0) {
      warnedUsers.forEach(([jid, user], index) => {
        const userName = conn.getName(jid) || 'Unknown User';
        const userTag = isOwner ? `@${jid.split('@')[0]}` : userName;
        
        caption += `│\n│ *${index + 1}.* ${userName} *(${user.warn}/3)*\n` +
                   `│ ${userTag}\n` +
                   `│ - - - - - - - - -`;
      });
    } else {
      caption += `│\n│ No warned users found\n│ - - - - - - - - -`;
    }

    caption += `\n*╰•·–––––––––––––––––––·•*`;

    // Send the formatted message
    const mentions = isOwner ? warnedUsers.map(([jid]) => jid) : [];
    await conn.sendMessage(
      m.chat,
      { 
        text: caption,
        mentions: mentions
      },
      { quoted: m }
    );

    await m.react("✅");
    
  } catch (error) {
    console.error("Warned list error:", error);
    await m.reply(`⚠️ Error: Failed to generate warned users list`);
    await m.react("❌");
  }
};

// Command configuration
handler.help = ['warnedlist', 'listwarned'];
handler.tags = ['group', 'moderation'];
handler.command = ['listadv', 'warned'];
handler.group = true;
handler.admin = true; // Only admins can use

export default handler;