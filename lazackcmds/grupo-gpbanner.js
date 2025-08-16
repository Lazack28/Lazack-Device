import { makeWASocket } from '@whiskeysockets/baileys';

const handler = async (m, { conn, usedPrefix, command }) => {
  // Get quoted message or original message
  const quotedMessage = m.quoted || m;
  const mimeType = (quotedMessage.msg || quotedMessage).mimetype || quotedMessage.mediaType || '';

  // Check if the message contains an image
  if (!/image/.test(mimeType)) {
    return m.reply(
      `${emoji} Please send or reply to an image to change the group profile picture.\n\n` +
      `Example: ${usedPrefix}${command} [reply to image]`
    );
  }

  try {
    // Download the image
    const imageBuffer = await quotedMessage.download();
    if (!imageBuffer || imageBuffer.length === 0) {
      return m.reply(`${emoji} Failed to download the image. Please try again.`);
    }

    // Update group profile picture
    await conn.updateProfilePicture(m.chat, imageBuffer);
    
    // Success feedback
    await m.reply(`${emoji} Group profile picture updated successfully!`);
    await m.react(done);
    
  } catch (error) {
    console.error('Profile picture update error:', error);
    let errorMessage = `${emoji} Failed to update profile picture. `;
    
    // Specific error cases
    if (error.message.includes('401')) {
      errorMessage += 'The bot may not have sufficient permissions.';
    } else if (error.message.includes('timed out')) {
      errorMessage += 'The operation timed out. Please try again.';
    } else {
      errorMessage += `Error: ${error.message}`;
    }
    
    await m.reply(errorMessage);
  }
};

// Command configuration
handler.help = ['gppic [reply to image]'];
handler.tags = ['group'];
handler.command = ['gppic', 'gpbanner', 'groupimg', 'setgpic'];
handler.group = true;       // Only works in groups
handler.admin = true;       // Requires admin privileges
handler.botAdmin = true;    // Bot needs to be admin to change picture

export default handler;