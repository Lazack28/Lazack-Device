let handler = async (m, { conn, usedPrefix, text, command }) => {
  let waLin = '';
  
  if (text) {
    waLin = text.replace(/[^0-9]/g, '');
  } else if (m.quoted) {
    waLin = m.quoted.sender.replace(/[^0-9]/g, '');
  } else if (m.mentionedJid && m.mentionedJid[0]) {
    waLin = m.mentionedJid[0].replace(/[^0-9]/g, '');
  } else {
    throw `❌ Please provide a valid phone number, quote a user, or mention a user.\n\nExample usage:\n- ${usedPrefix}${command} 1234567890\n- Reply to a message with ${usedPrefix}${command}\n- Mention a user with ${usedPrefix}${command}`;
  }

  if (!waLin || waLin.length < 10 || waLin.length > 15) {
    throw `❌ Invalid phone number detected. Please ensure the number is between 10 and 15 digits.`;
  }

  const waLink = `https://wa.me/${waLin}`;
  const message = `✅ *WhatsApp Link Generated:*\n${waLink}\n\nClick the link to open the chat.`;

  await conn.sendMessage(m.chat, { text: message, quoted: m, contextInfo: { mentionedJid: [m.sender] } });

  m.react('✅');
};

handler.help = ['wa'];
handler.tags = ['tools'];
handler.command = ['wa'];

export default handler;
