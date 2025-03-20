import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, participants }) => {
    try {
        let users = participants.map(u => conn.decodeJid(u.id)); // Extract participant JIDs
        let q = m.quoted ? m.quoted : m; // Get quoted message or the original one
        let c = m.quoted ? m.quoted : m.msg; // Get quoted content or message itself
        
        if (!text && !q.text) throw '❌ Please provide a message to send with the hidetag!';
        
        const msg = conn.cMod(
            m.chat,
            generateWAMessageFromContent(
                m.chat,
                {
                    [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON
                        ? c.toJSON()
                        : { text: c || '' },
                },
                {
                    quoted: m,
                    userJid: conn.user.id,
                }
            ),
            text || q.text,
            conn.user.jid,
            { mentions: users }
        );

        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } catch (error) {
        console.error(error);
        m.reply('❌ An error occurred while sending the hidetag message.');
    }
};

handler.help = ['hidetag'];
handler.tags = ['group'];
handler.command = ['hidetag', 'notify'];
handler.group = true;
handler.admin = true;

export default handler;
