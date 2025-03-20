let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
      return conn.reply(m.chat, `❌ *Error:* Please provide a report.\n\n📌 *Example:*\n${usedPrefix + command} Report user sending inappropriate content.`, m);
  }

  if (text.length > 300) {
      return conn.reply(m.chat, '⚠️ *Your report is too long!*\nMaximum allowed characters: 300.', m);
  }

  const reportMessage = `
📢 *New Report Received!*
────────────────────────
👤 *Reporter:* wa.me/${m.sender.split("@")[0]}
📝 *Issue:* ${text}
────────────────────────
⏳ *Status:* Pending review
📌 *Action will be taken accordingly!*
  `.trim();

  // Send report to owner
  conn.reply('255734980103@s.whatsapp.net', reportMessage, m);

  // Confirmation message to user
  conn.reply(m.chat, `✅ *Your report has been successfully sent to the Owner!*\n\n📌 *Thank you for your feedback! We will take the necessary action.*`, m);
};

handler.help = ['report'];
handler.tags = ['main'];
handler.command = /^(report)$/i;

export default handler;
