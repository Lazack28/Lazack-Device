let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who;

  // Get mentioned user or quoted user
  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  } else {
    who = m.chat;
  }

  if (!who) throw `✳️ *Tag or mention someone to allow DM access!*\n\n📌 *Example:* ${usedPrefix + command} @user`;

  let user = global.db.data.users[who];
  let userId = who.split`@`[0];

  // Check if the user is already allowed
  if (global.allowed.includes(userId)) {
    throw `✅ *@${userId} is already allowed to use the bot in DM!*`;
  }

  // Add user to allowed list
  global.allowed.push(userId);

  conn.reply(
    m.chat,
    `🎉 *@${userId} has been granted special access to use the bot in DM!* 🚀`,
    m,
    { mentions: [who] }
  );
};

handler.help = ["allow <@tag>"];
handler.tags = ["owner"];
handler.command = ["allow", "makeallow", "al"];

handler.group = true;
handler.rowner = true; // Only the bot owner can use this command

export default handler;
