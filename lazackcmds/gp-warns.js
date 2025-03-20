let handler = async (m, { conn, args, groupMetadata }) => {
  let who = m.quoted
      ? m.quoted.sender
      : m.mentionedJid && m.mentionedJid[0]
          ? m.mentionedJid[0]
          : m.fromMe
              ? conn.user.jid
              : m.sender;

  if (!(who in global.db.data.users)) {
      return m.reply(`❌ *Error:* The user is not found in my database.`);
  }

  let warn = global.db.data.users[who].warn;
  let name = conn.getName(who);

  let warnMessage = `
⚠️ *USER WARN STATUS* ⚠️
━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
🚨 *Total Warnings:* ${warn}
📌 *Warnings reset after reaching the limit.*
━━━━━━━━━━━━━━━━━━━
⚠️ *Avoid breaking the rules to prevent being removed!*
  `.trim();

  m.reply(warnMessage);
};

handler.help = ['warns'];
handler.tags = ['group'];
handler.command = ['warns'];
handler.group = true;

export default handler;
