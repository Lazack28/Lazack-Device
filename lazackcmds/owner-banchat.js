//import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isAdmin }) => {
  if (!(isAdmin || isOwner)) {
    return conn.reply(m.chat, '❌ *Only group admins or the bot owner can use this command!*', m);
  }

  let chat = global.db.data.chats[m.chat];

  if (chat.isBanned) {
    return conn.reply(m.chat, '⚠️ *The bot is already deactivated in this group!*', m);
  }

  chat.isBanned = true;
  conn.reply(m.chat, '✅ *The bot has been deactivated in this group!*', m);
};

handler.help = ['banchat'];
handler.tags = ['owner'];
handler.command = ['banchat', 'chatoff'];

export default handler;
