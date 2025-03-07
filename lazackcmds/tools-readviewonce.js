import pkg from '@whiskeysockets/baileys';
const { downloadMediaMessage } = pkg;

const OWNER_NUMBER = '255734980103'; // Replace with your actual owner number
const PREFIX = '.'; // Bot's command prefix

let handler = async (m, { conn }) => {
  console.log(`📩 Received: ${m.text}`); // Debugging

  if (!m.text) return; // Ignore empty messages
  if (!m.quoted) return m.reply('*Reply to a View Once message!*');

  const botNumber = conn.user?.id.split(':')[0] + '@s.whatsapp.net';
  const ownerNumber = OWNER_NUMBER + '@s.whatsapp.net';

  // Extract command
  const cmd = m.text.startsWith(PREFIX) ? m.text.slice(PREFIX.length).split(' ')[0].toLowerCase() : '';
  if (!['vv', 'vv2', 'vv3'].includes(cmd)) return;

  console.log(`✅ Command detected: ${cmd}`); // Debugging

  // Check if quoted message exists
  if (!m.quoted.message) return m.reply('*No quoted message detected!*');

  // Check for View Once message
  let msg = m.quoted.message.viewOnceMessageV2?.message || m.quoted.message.viewOnceMessage?.message;

  if (!msg) return m.reply('*This is not a View Once message!*');

  // Restrict commands to Owner/Bot
  const isOwner = m.sender === ownerNumber;
  const isBot = m.sender === botNumber;
  if (['vv2', 'vv3'].includes(cmd) && !isOwner && !isBot) {
    return m.reply('*Only the owner or bot can use this command!*');
  }

  try {
    const messageType = Object.keys(msg)[0];
    let buffer;

    if (messageType === 'audioMessage') {
      buffer = await downloadMediaMessage(m.quoted, 'buffer', {}, { type: 'audio' });
    } else {
      buffer = await downloadMediaMessage(m.quoted, 'buffer');
    }

    if (!buffer) return m.reply('*Failed to retrieve media!*');

    let mimetype = msg.audioMessage?.mimetype || 'audio/ogg';
    let caption = `> *© Powered By Lazack Bot*`;

    // Determine recipient based on command
    let recipient =
      cmd === 'vv2' ? botNumber :
      cmd === 'vv3' ? ownerNumber :
      m.chat; // `.vv` sends to same chat

    console.log(`📤 Sending media to: ${recipient}`); // Debugging

    // Send media accordingly
    if (messageType === 'imageMessage') {
      await conn.sendMessage(recipient, { image: buffer, caption });
    } else if (messageType === 'videoMessage') {
      await conn.sendMessage(recipient, { video: buffer, caption, mimetype: 'video/mp4' });
    } else if (messageType === 'audioMessage') {
      await conn.sendMessage(recipient, { audio: buffer, mimetype, ptt: true });
    } else {
      return m.reply('*Unsupported media type!*');
    }

    console.log('✅ Media sent successfully'); // Debugging
  } catch (error) {
    console.error(error);
    await m.reply('*Failed to process View Once message!*');
  }
};

handler.help = ['vv', 'vv2', 'vv3'];
handler.tags = ['owner'];
handler.command = /^vv|vv2|vv3$/i;
handler.owner = true;

export default handler;
