let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) throw `✳️ Reply to the message you want to delete!`;

    try {
        // Extract message details
        let key = m.quoted.key;
        await conn.sendMessage(m.chat, { delete: key });
        m.reply('✅ Message successfully deleted!');
    } catch (error) {
        console.error(error);
        m.reply('❌ Failed to delete the message.');
    }
};

handler.help = ['delete'];
handler.tags = ['group'];
handler.command = ['delete', 'del', 'dlt', 'dt'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
