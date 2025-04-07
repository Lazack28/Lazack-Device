let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;
let linkRegex1 = /whatsapp\.com\/channel\/([0-9A-Za-z]{20,24})/i;

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants }) {
  if (!m.isGroup) return;
  if (isAdmin || isOwner || m.fromMe || isROwner) return;

  let chat = global.db.data.chats[m.chat];
  let userData = global.db.data.users[m.sender] || {};
  global.db.data.users[m.sender] = userData;

  let delet = m.key.participant;
  let bang = m.key.id;
  const user = `@${m.sender.split`@`[0]}`;
  const groupAdmins = participants.filter(p => p.admin);
  const isGroupLink = linkRegex.exec(m.text) || linkRegex1.exec(m.text);
  const grupo = `https://chat.whatsapp.com`;

  if (isAdmin && chat.antiLink && m.text.includes(grupo)) {
    return m.reply(`🏷 *Anti-link is active, but you're an admin — no action taken.*`);
  }

  if (chat.antiLink && isGroupLink && !isAdmin) {
    if (!isBotAdmin) {
      return conn.sendMessage(m.chat, {
        text: `⚠️ *Anti-link detected, but I'm not an admin.*`,
        mentions: groupAdmins.map(v => v.id)
      }, { quoted: m });
    }

    // Delete the message
    await conn.sendMessage(m.chat, {
      delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }
    });

    // Add a warning
    userData.warn = (userData.warn || 0) + 1;

    if (userData.warn >= 3) {
      // Kick after 3 warnings
      await conn.sendMessage(m.chat, {
        text: `🚫 *${user} ha sido eliminado por exceder el límite de advertencias (3).*`,
        mentions: [m.sender]
      }, { quoted: m });

      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      userData.warn = 0; // Reset warn count after kick
    } else {
      // Warn the user
      await conn.sendMessage(m.chat, {
        text: `⚠️ *${user}, has sido advertido por enviar un enlace prohibido.*\nAdvertencias: ${userData.warn}/3`,
        mentions: [m.sender]
      }, { quoted: m });
    }
  }

  return !0;
}
