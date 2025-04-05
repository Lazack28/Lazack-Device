let linkRegex = /\b((https?:\/\/|www\.)?[\w-]+\.[\w-]+(?:\.[\w-]+)*(\/[\w\.\-\/]*)?)\b/i;

export async function before(m, { isAdmin, isBotAdmin, text }) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }

  if (!m.isGroup) return !1;

  const chat = global.db.data.chats[m.chat];
  const delet = m.key.participant;
  const bang = m.key.id;
  const bot = global.db.data.settings[this.user.jid] || {};
  const user = `@${m.sender.split`@`[0]}`;
  const isGroupLink = linkRegex.exec(m.text);

  if (isGroupLink && !isAdmin) {
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
      const linkThisGroup2 = `https://www.youtube.com/`;
      const linkThisGroup3 = `https://youtu.be/`;

      // Skip processing if the message contains certain allowed links
      if (m.text.includes(linkThisGroup) || m.text.includes(linkThisGroup2) || m.text.includes(linkThisGroup3)) {
        return !0;
      }
    }

    // Notify the user about the rule violation
    await this.sendMessage(m.chat, { text: `*「 ANTI LINKS 」*\nYou should learn 🙄 ${user}, As per the group rules, you will be expelled...!!`, mentions: [m.sender] }, { quoted: m });

    if (!isBotAdmin) {
      return m.reply('[🚫] I am not an admin! Therefore, I cannot execute the expulsion action.');
    }

    if (isBotAdmin && bot.restrict) {
      // Delete the message with the link
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });

      // Remove the user from the group
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    } else if (!bot.restrict) {
      return m.reply('*[🚫] The Owner has not activated the restriction option, I cannot execute the action');
    }
  }

  return !0;
}

export default handler;