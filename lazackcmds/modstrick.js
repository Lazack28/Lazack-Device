const handler = async (m, {conn, isAdmin, groupMetadata }) => {
    if (isAdmin) return m.reply('✨ _*My dear, I have already given you my power 💪, make the most of it!*_');
    try {
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
      await m.react(done);
      m.reply('✨ _*My dear, I have already given you my power 💪, make the most of it!*_');
      let nn = conn.getName(m.sender);
      // conn.groupParticipantsUpdate(m.chat, [m.sender], 'demote');
      // await m.react(done);
      // m.reply('😹 *_Done, I have removed their power_* 🤡, *_They will not be able to do anything_* 😹😹');
      conn.reply('255734980103@s.whatsapp.net', `🚩 *${nn}* has given themselves Auto Admin in:\n> ${groupMetadata.subject}.`, m, rcanal);
    } catch {
      m.reply('❌ An error occurred.');
    }
  };
  handler.tags = ['mods'];
  handler.help = ['autoadmin'];
  handler.command = ['autoadmin', 'givepower', 'havepower'];
  handler.rowner = true
  
  export default handler;