const MAX_WARN = global.maxwarn || 3; // Default to 3 warnings if undefined

let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {
  let who;
  if (m.isGroup) {
    who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
  } else {
    who = m.chat;
  }
  
  if (!who) return m.reply(`✳️ *Tag or mention someone*\n\n📌 Example: ${usedPrefix + command} @user`);
  if (!(who in global.db.data.users)) return m.reply(`✳️ *User not found* in the database.`);

  let name = conn.getName(m.sender);
  let warnCount = global.db.data.users[who].warn || 0;

  if (warnCount < MAX_WARN - 1) {
    global.db.data.users[who].warn += 1;
    let newWarnCount = global.db.data.users[who].warn;

    m.reply(
      `⚠️ *Warning Issued* ⚠️\n\n📌 *Admin:* ${name}\n👤 *User:* @${who.split`@`[0]}\n⚠️ *Warnings:* ${newWarnCount}/${MAX_WARN}\n📝 *Reason:* ${text || 'No reason provided'}`,
      null,
      { mentions: [who] }
    );

    m.reply(
      `⚠️ *Attention!* ⚠️\nYou received a warning from an admin.\n\n⚠️ *Warnings:* ${newWarnCount}/${MAX_WARN}\n🚨 If you reach *${MAX_WARN}* warnings, you will be removed from the group.`,
      who
    );
  } else {
    // User reached max warnings → Remove from group
    global.db.data.users[who].warn = 0; // Reset warnings after removal
    m.reply(`⛔ *User exceeded ${MAX_WARN} warnings* and will be removed.`);

    await delay(3000);
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');

    m.reply(
      `♻️ You were removed from *${groupMetadata.subject}* because you received *${MAX_WARN}* warnings.`,
      who
    );
  }
};

handler.help = ['warn @user'];
handler.tags = ['group'];
handler.command = ['warn'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
