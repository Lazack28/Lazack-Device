let handler = async (m, { conn, participants, usedPrefix, command }) => {
    try {
        let kickUsage = `✳️ Correct usage of the command:\n*${usedPrefix + command}* @tag`;
        
        if (!m.mentionedJid[0] && !m.quoted) {
            return m.reply(kickUsage, m.chat, { mentions: conn.parseMention(kickUsage) });
        }

        let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
        let groupMetadata = await conn.groupMetadata(m.chat);
        let groupName = groupMetadata.subject; // Get group name
        let owner = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net';

        // Delete the mentioned user's message (if quoted)
        try {
            let delet = m.message.extendedTextMessage.contextInfo.participant;
            let bang = m.message.extendedTextMessage.contextInfo.stanzaId;
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});
        } catch {
            if (m.quoted) await conn.sendMessage(m.chat, { delete: m.quoted.vM.key });
        }

        // Remove user from the group
        await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
        await conn.updateBlockStatus(user, 'block');

        // Send a DM notification to the removed user
        let kickMessage = `🚨 *You have been removed from the group: ${groupName}*\n\n❌ *Action taken by Admins.*\n💬 If you think this was a mistake, contact: @${owner.split('@')[0]}`;
        await conn.sendMessage(user, { text: kickMessage, mentions: [owner] });

        // Confirmation message in the group
        m.reply(`✅ User *@${user.split('@')[0]}* has been removed from *${groupName}*.\n\n📨 They have been notified via DM.`, m.chat, { mentions: [user] });

    } catch (error) {
        console.error(error);
        m.reply('❌ An error occurred while trying to remove the user. Ensure the bot has admin rights.');
    }
};

handler.help = ['kick @user'];
handler.tags = ['group'];
handler.command = ['kick', 'expulsar', 'k', 'kk']; 
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
