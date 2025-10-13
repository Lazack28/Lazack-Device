let handler = async (m, { conn, text, args }) => {

  if (!args[0]) {
    const state = global.db.data.chats[m.chat]?.bannedGrupo ?? false;
    const stateText = state ? '✗ Disabled' : '✓ Enabled';
    const info = `*🫟 Bot Status (｡•́‿•̀｡)*\n` +
                 `🫗 *Current ›* ${stateText}\n\n` +
                 `🌱 You can change it with:\n` +
                 `> ● _Enable ›_ *bot on*\n` +
                 `> ● _Disable ›_ *bot off*`;
    return m.reply(info);
  }

  try {
    const chat = global.db.data.chats[m.chat];
    const state = chat.bannedGrupo ?? false;
    const action = args[0].toLowerCase();

    if (action === 'off') {
      if (state) return m.reply('🌱 The *Bot* was already *disabled* in this group.');
      chat.bannedGrupo = true;
      return m.reply('🫟 You have *Disabled* the *Bot* in this group.');
    }

    if (action === 'on') {
      if (!state) return m.reply('🌱 The *Bot* was already *enabled* in this group.');
      chat.bannedGrupo = false;
      return m.reply('🫟 You have *Enabled* the *Bot* in this group.');
    }

    return m.reply('🌿 Use: *bot on* or *bot off* to change the status.');
  } catch (e) {
    await m.reply('🕸 An error occurred while trying to change the bot’s status.');
  }
};

handler.tags = ['group'];
handler.help = ['bot'];
handler.command = ['bot'];
handler.admin = true;

export default handler;
