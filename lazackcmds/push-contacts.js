let handler = async (m, { conn, groupMetadata, text }) => {
    if (!text && !m.quoted) return m.reply("⚠️ *Please provide a message or reply to one!*");

    let getContacts = groupMetadata.participants
        .filter(v => v.id.endsWith('.net')) // Filtering users with WhatsApp numbers
        .map(v => v.id);

    let totalUsers = getContacts.length;
    let sentCount = 0;
    
    if (totalUsers === 0) return m.reply("⚠️ *No valid users found to notify.*");

    m.reply("⏳ *Processing notifications...*");

    for (let i = 0; i < totalUsers; i++) {
        setTimeout(async function () {
            try {
                if (text) {
                    await conn.sendMessage(getContacts[i], { text });
                } else if (m.quoted) {
                    await conn.copyNForward(getContacts[i], await m.getQuotedObj(), false);
                } else if (text && m.quoted) {
                    await conn.sendMessage(getContacts[i], {
                        text: `${text}\n\n📢 *Advertised by* ${global.botname}`
                    });
                }

                sentCount++;
            } catch (e) {
                console.error(`❌ Failed to send to: ${getContacts[i]}`, e.message);
            }

            // Once all messages are sent, send a confirmation
            if (sentCount === totalUsers) {
                m.reply(`✅ *Notification sent successfully!*

👤 *Operator:* ${global.author}
🤖 *Sender:* ${global.botname}
📨 *Total Users Notified:* ${sentCount}/${totalUsers}`);
            }
        }, i * 4000); // 4-second delay between messages to prevent spam
    }
}

handler.help = ['pushcontact', 'ads', 'promote'];
handler.tags = ['owner'];
handler.command = /^(pushcontact|ads|promote)$/i;
handler.owner = true;
handler.group = true;

export default handler;
