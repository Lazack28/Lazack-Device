export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (
    m.text.includes('PIEDRA') ||
    m.text.includes('PAPEL') ||
    m.text.includes('TIJERA') ||
    m.text.includes('serbot') ||
    m.text.includes('jadibot')
  ) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  if (m.chat === '@newsletter') return !0;
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(
      `${emoji} Hello @${m.sender.split`@`[0]}, my creator has disabled commands in private chats, so you will be blocked. If you want to use the bot's commands, I invite you to join the bot's main group.\n\n${gp1}`,
      false,
      {mentions: [m.sender]}
    );
    await this.updateBlockStatus(m.chat, 'block');
  }
  return !1;
}
