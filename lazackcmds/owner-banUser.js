//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who;
  
  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  } else {
    who = m.chat;
  }

  if (!who) {
    throw `✳️ *Tag or mention someone to ban*\n\n📌 *Example:* ${usedPrefix + command} @user`;
  }

  let user = global.db.data.users[who];
  if (!user) {
    return conn.reply(m.chat, '⚠️ *User not found in database.*', m);
  }

  if (user.banned) {
    return conn.reply(m.chat, `⚠️ @${who.split`@`[0]} *is already banned!*`, m, {
      mentions: [who],
    });
  }

  user.banned = true;

  conn.reply(
    m.chat,
    `🚫 *BANNED*\n\n@${who.split`@`[0]} *has been banned and can no longer use bot commands!*`,
    m,
    { mentions: [who] }
  );
};

handler.help = ['ban @user'];
handler.tags = ['owner'];
handler.command = /^ban$/i;
handler.rowner = true;

export default handler;
