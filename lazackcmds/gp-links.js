import { areJidsSameUser } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args }) => {
    try {
        let group = m.chat;

        // Check if the user provided a group ID
        if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) {
            group = args[0];
        }

        // Validate if it's a WhatsApp group ID
        if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) {
            return m.reply('⚠️ *This command can only be used in groups or with a valid group ID!*');
        }

        // Fetch group metadata
        let groupMetadata = await conn.groupMetadata(group);
        if (!groupMetadata) return m.reply('⚠️ *Group metadata could not be retrieved.*');

        // Ensure participants list is available
        if (!groupMetadata.participants) return m.reply('⚠️ *Could not retrieve group participants.*');

        // Check if the bot is in the group
        let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id));
        if (!me) return m.reply('❌ *I am not in this group!*');

        // Check if the bot is an admin
        if (!me.admin) return m.reply('❌ *I need to be an admin to generate an invite link!*');

        // Generate and send the group invite link
        let inviteLink = await conn.groupInviteCode(group);
        m.reply(`🔗 *Here is the invite link for the group:* \n\nhttps://chat.whatsapp.com/${inviteLink}`);
    } catch (error) {
        console.error(error);
        m.reply('❌ *An error occurred while generating the link. Please try again later.*');
    }
};

handler.help = ['link'];
handler.tags = ['group'];
handler.command = ['link', 'linkgroup'];
handler.group = true; // Ensure it runs in groups only

export default handler;
