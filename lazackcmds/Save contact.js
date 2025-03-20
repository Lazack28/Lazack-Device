let handler = async (m, { conn, args }) => {
    let who = m.mentionedJid && m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.fromMe 
            ? conn.user.jid 
            : m.sender;
    
    if (!who) throw '⚠️ *Please tag someone to save their contact!*';

    let username = await conn.getName(who);
    let contact = [`${who.split('@')[0]}@s.whatsapp.net`, username];

    await conn.sendContact(m.chat, [contact], m);
    m.reply(`✅ *Contact saved successfully!*  
📌 *Name:* ${username}  
📞 *Number:* ${who.split('@')[0]}`);
};

handler.help = ['savecontact *@tag*'];
handler.tags = ['tools'];
handler.command = ['savecontact', 'save'];

export default handler;
