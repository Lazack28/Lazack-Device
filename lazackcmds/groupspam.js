let handler = async (m, { conn, text }) => {
    const [message, count] = text.split('|'); // Split the input text into message and count
  
    // Check if the message is provided
    if (!message) return conn.reply(m.chat, '*Correct Usage:*\n*🐉 #spamgroup text|count*', m, rcanal);
  
    // Check if the count is a number
    if (count && isNaN(count)) return conn.reply(m.chat, '*💨 The count must be a number*', m, rcanal);
  
    const fixedCount = count ? count * 1 : 10; // Default count is 10 if not provided
  
    // Check if the count exceeds the limit
    if (fixedCount > 999) return conn.reply(m.chat, '*⚠️ Minimum 50 characters*', m, fake);
  
    // Get the list of groups the bot is in
    const groups = await conn.groupFetchAll(); // Fetch all groups
    const groupIds = Object.keys(groups); // Get the group IDs
  
    await conn.reply(m.chat, '*☁️ Spam sent successfully to groups.*', m, rcanal); // Notify that the spam is being sent
  
    // Iterate through each group and send the message
    for (const groupId of groupIds) {
      for (let i = 0; i < fixedCount; i++) {
        await conn.sendMessage(groupId, { text: message.trim() }); // Send the message to the group
      }
    }
  };
  
  handler.help = ['spamgroup <message>|<number of messages>']; // Help command description
  handler.tags = ['tools']; // Tag for categorizing the command
  handler.command = ['spamgroup']; // Command to trigger the handler
  handler.premium = true; // Indicates that this command is for premium users
  export default handler; // Export the handler