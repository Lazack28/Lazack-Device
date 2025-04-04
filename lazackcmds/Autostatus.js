let handler = async (m, { conn, usedPrefix, command }) => {
    // Listen for the '/downloadstatus' command
    if (command === 'downloadstatus') {
      // Check if the message is from a status broadcast
      if (m.key.remoteJid !== 'status@broadcast') {
        await conn.reply(m.chat, '❌ This is not a status message.', m);
        return;
      }
  
      // Initialize the story array if it doesn't exist
      this.story = this.story ? this.story : [];
  
      // Destructure necessary properties from the message and connection
      const { mtype, text, sender } = m;
      const { jid: userJid } = conn.user;
      const senderId = m.key.participant.split('@')[0]; // Extract sender ID
      const chatData = global.db.data.chats[m.chat]; // Access chat data
  
      // Handle different types of messages
      if (mtype === 'audioMessage' || mtype === 'videoMessage') {
        const caption = `Status from ${senderId}`;
        try {
          let mediaBuffer = await m.download(); // Download the media
          await conn.sendFile(userJid, mediaBuffer, '', caption, m, false, { mentions: [m.sender] });
          this.story.push({ type: mtype, quoted: m, sender: m.sender, caption: caption, buffer: mediaBuffer });
          await conn.reply(m.chat, `✅ Successfully downloaded and sent the ${mtype}.`, m);
        } catch (error) {
          console.log(error);
          await conn.reply(m.chat, `❎ Failed to download the ${mtype}.`, m);
        }
      } else if (mtype === 'extendedTextMessage') {
        try {
          let textBuffer = await m.download(); // Download the text message (if applicable)
          await conn.sendFile(userJid, textBuffer, '', '', m, false, { mimetype: m.mimetype });
          this.story.push({ type: mtype, quoted: m, sender: m.sender, buffer: textBuffer });
          await conn.reply(m.chat, '✅ Successfully downloaded and sent the text message.', m);
        } catch (error) {
          console.log(error);
          await conn.reply(m.chat, '❎ Failed to download the text message.', m);
        }
      } else if (mtype === 'textMessage') {
        const replyText = text ? text : '';
        await conn.reply(m.chat, `📄 Text message: \n${replyText}`, m, { mentions: [m.sender] });
        this.story.push({ type: mtype, quoted: m, sender: m.sender, message: replyText });
        await conn.reply(m.chat, '✅ Successfully sent the text message.', m);
      } else {
        await conn.reply(m.chat, '❓ Unsupported message type for download.', m);
      }
  
      // If the chat has specific properties, return true
      if (chatData) return true;
    }
  }
  
  handler.command = ['downloadstatus']; // Command name is 'downloadstatus'
  
  export default handler;
  