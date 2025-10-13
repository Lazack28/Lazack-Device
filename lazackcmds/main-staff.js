let handler = async (m, { conn, participants, groupMetadata }) => {
    // Get group profile picture or fallback image
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './Botify/lazack.jpg';
  
    // Find group admins
    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n▢ ');
  
    // Determine group owner
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || 
                  (participants.length > 0 ? participants[0].id : m.chat.split`-`[0] + '@s.whatsapp.net');
  
    // Handle empty admin case
    if (groupAdmins.length === 0) {
      return m.reply(`❌ *No admins found in the group!*`);
    }
  
    // Message content
    let text = `
  ≡ *GROUP ADMINS* 📌 _${groupMetadata.subject}_
  
  👑 *Owner:* @${owner.split('@')[0]}
  
  ┌─⊷ *ADMIN LIST*  
  ▢ ${listAdmin}
  └───────────────
  `.trim();
  
    // Send formatted admin list with profile picture
    await conn.sendFile(m.chat, pp, 'admins.png', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] });
  };
  
  handler.help = ['staff'];
  handler.tags = ['group'];
  handler.command = ['staff', 'admins', 'listadmin']; 
  handler.group = true;
  
  export default handler;
  