// This file is part of Lazack28, a WhatsApp bot project.
// It handles command validation and user feedback for invalid commands.


/*export async function before(m) {
  // Skip if not a command
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();
  if (!command || command === 'bot') return;

  // Helper to validate commands
  const validCommand = (cmd, plugins) => {
    for (let plugin of Object.values(plugins)) {
      if (!plugin.command) continue;
      let cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
      if (cmds.includes(cmd)) return true;
    }
    return false;
  };

  if (validCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];

    // Bot disabled in chat response
    if (chat.isBanned) {
      const notice = `
🌸 *${conn.getName(conn.user.jid)}* is currently sleeping in this group~

🛡️ *Admins* can wake me up with:
→ *${usedPrefix}bot on*

💖 I miss you already... Come back soon!`;
      await m.reply(notice);
      return;
    }

    // Increment command count
    user.commands = (user.commands || 0) + 1;
  } else {
    // Handle invalid command with helpful suggestions
    const inputCommand = m.text.trim().split(' ')[0];
    const allCommands = [];

    // Collect all available commands
    for (let plugin of Object.values(global.plugins)) {
      if (!plugin.command) continue;
      let cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
      allCommands.push(...cmds.map(cmd => usedPrefix + cmd));
    }

    // Fuzzy command matching with scoring
    function findSimilarCommands(base, list) {
      const similarityScore = (a, b) => {
        // Simple similarity algorithm
        const longer = a.length > b.length ? a : b;
        const shorter = a.length <= b.length ? a : b;
        const lengthRatio = shorter.length / longer.length;
        
        // Check for direct inclusion
        if (longer.includes(shorter)) return lengthRatio * 0.8;
        
        // Character matching
        let matches = 0;
        for (let i = 0; i < shorter.length; i++) {
          if (longer.includes(shorter[i])) matches++;
        }
        return (matches / longer.length) * lengthRatio;
      };

      return list
        .map(cmd => ({ 
          cmd, 
          score: similarityScore(base.toLowerCase(), cmd.toLowerCase()) 
        }))
        .filter(e => e.score >= 0.4) // Higher threshold for better matches
        .sort((a, b) => b.score - a.score)
        .slice(0, 3); // Top 3 matches only
    }

    const suggestions = findSimilarCommands(inputCommand, allCommands);

    // Construct friendly response
    let response = `
✨ *Oopsie~!* ✨

I couldn't find *${inputCommand}* in my command list.

Here's what might help:
→ Use *${usedPrefix}menu* to see all commands
→ Check your spelling (commands are case-insensitive)
${suggestions.length > 0 ? `\n💡 *Did you mean one of these?*` : ''}`;

    // Add suggestions if available
    if (suggestions.length > 0) {
      suggestions.forEach((s, i) => {
        const percent = Math.min(100, Math.round(s.score * 100));
        const emoji = i === 0 ? '🌟' : i === 1 ? '✨' : '💫';
        response += `\n${emoji} *${s.cmd}* (${percent}% match)`;
      });
    }

    // Add encouragement
    response += `\n\n🌸 Don't worry! Even the best ninjas stumble sometimes~`;
    response += `\n💌 Need help? Just ask! *${usedPrefix}support*`;

    // Send with typing indicator for better UX
    await conn.sendPresenceUpdate('composing', m.chat);
    await m.reply(response);
  }
}*/


