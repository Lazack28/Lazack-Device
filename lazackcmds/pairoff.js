let handler = async (m, { conn, args }) => {
  const isSocketOwner = [
    conn.user.jid,
    ...(global.owner || []).map(n => n + '@s.whatsapp.net'),
  ].includes(m.sender);

  if (!isSocketOwner) {
    return m.reply('🕸 Only the socket owner can use this command.');
  }

  const settings = global.db.data.settings[conn.user.jid] || {};
  const state = settings.self ?? false;

  if (args[0] === 'enable' || args[0] === 'on') {
    if (state) return m.reply('🍋‍🟩 *Self Mode* is already enabled.');
    settings.self = true;
    return m.reply('ꕥ You have *Enabled* *Self Mode*.');
  }

  if (args[0] === 'disable' || args[0] === 'off') {
    if (!state) return m.reply('🍋‍🟩 *Self Mode* is already disabled.');
    settings.self = false;
    return m.reply('🫟 You have *Disabled* *Private Mode*.');
  }

  return m.reply(
    `*🫟 Self Mode (✿❛◡❛)*\n🍋‍🟩 *Status ›* ${state ? '✓ Enabled' : '✗ Disabled'}\n\n🪼 You can change it using:\n> ● _Enable ›_ *self enable*\n> ● _Disable ›_ *self disable*`
  );
};

handler.help = ['self'];
handler.tags = ['jadibot'];
handler.command = ['self'];

export default handler;
