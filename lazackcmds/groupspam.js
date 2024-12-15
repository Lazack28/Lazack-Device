let handler = async (m, { conn, text }) => {
    const [groupLink, message, count] = text.split('|'); // Split the input text into group link, message, and count
  
    // Check if the group link is provided
    if (!groupLink) return conn.reply(m.chat, '*Correct Usage:*\n*🐉 #sendgroup groupLink|text|count*', m, rcanal);
  
    // Check if the message is provided
    if (!message) return conn.reply(m.chat, '*Correct Usage:*\n*🐉 #sendgroup groupLink|text|count*', m, rcanal);
  
    // Check if the count is a number
    if (count && isNaN(count)) return conn.reply(m.chat, '*💨 The count must be a number*', m, rcanal);
  
    const fixedCount = count ? parseInt(count) : 10; // Default count is 10 if not provided
  
    // Check if the count exceeds the limit
    if (fixedCount > 999) return conn.reply(m.chat, '*⚠️ Maximum count is 999*', m, rcanal);
  
    // Extract the group ID from the group link
    const groupIdMatch = groupLink.match(/https:\/\/chat\.whatsapp\.com\/([A-Za-z0-9]+)/);
    if (!groupIdMatch) return conn.reply(m.chat, '*Invalid group link.*', m, rcanal);
    
    const inviteCode = groupIdMatch[1]; // Get the invite code
    const groupId = `${inviteCode}@g.us`; // Format the group ID
  
    await conn.reply(m.chat, '*☁️ Sending message to the group.*', m, rcanal); // Notify that the message is being sent
  
    // Send the message to the specified group
    for (let i = 0; i < fixedCount; i++) {
      try {
        await conn.sendMessage(groupId, { text: message.trim() }); // Send the message to the group
      } catch (error) {
        console.error(`Failed to send message to group ${groupId}:`, error);
        return conn.reply(m.chat, '*❌ Failed to send message to the group.*', m, rcanal);
      }
    }
  
    await conn.reply(m.chat, '*✅ Message sent successfully.*', m, rcanal); // Notify that the message has been sent
  };
  
  handler.help = ['sendgroup <groupLink>|<message>|<number of messages>']; // Help command description
  handler.tags = ['tools']; // Tag for categorizing the command
  handler.command = ['sendgroup']; // Command to trigger the handler
  handler.premium = true; // Indicates that this command is for premium users
  export default handler; // Export the handler