let handler = async (m, { conn, text }) => {
    const [groupLink, message, count] = text.split('|'); // Split input into group link, message, and count

    if (!groupLink || !message) return conn.reply(m.chat, '*Correct Usage:*\n*🐉 #sendgroup groupLink|text|count*', m);

    if (count && isNaN(count)) return conn.reply(m.chat, '*💨 The count must be a number*', m);

    const fixedCount = count ? Math.min(parseInt(count), 999) : 10; // Default 10, max 999

    // Extract invite code from group link
    const groupIdMatch = groupLink.match(/https:\/\/chat\.whatsapp\.com\/([A-Za-z0-9]+)/);
    if (!groupIdMatch) return conn.reply(m.chat, '*Invalid group link.*', m);
    
    const inviteCode = groupIdMatch[1];

    try {
        // Join the group if not already a member
        const groupId = await conn.groupAcceptInvite(inviteCode);

        await conn.reply(m.chat, `☁️ Sending message to the group ${groupId}...`, m);

        for (let i = 0; i < fixedCount; i++) {
            await conn.sendMessage(groupId, { text: message.trim() });
            await new Promise(res => setTimeout(res, 2000)); // Delay to avoid spam detection
        }

        await conn.reply(m.chat, '*✅ Message sent successfully.*', m);
    } catch (error) {
        console.error('❌ Error sending message to group:', error);
        return conn.reply(m.chat, '*❌ Failed to send message to the group.*', m);
    }
};

handler.help = ['sendgroup <groupLink>|<message>|<number of messages>'];
handler.tags = ['tools'];
handler.command = ['sendgroup'];
handler.premium = true;

export default handler;
