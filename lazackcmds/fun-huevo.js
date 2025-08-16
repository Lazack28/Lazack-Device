//Code created by Destroy wa.me/584120346669

const handler = async (m, { conn, usedPrefix, command, text }) => {
  let who;

  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  } else {
    who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
  }

  if (!who) return m.reply(`${emoji} Please mention a user.`);

  let pp = './src/catalogo.jpg';
  try {
    pp = await conn.getProfilePicture(who);
  } catch (e) {
  } finally {
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/catalogo.jpg');
    let username = conn.getName(who);
    let str = `@${m.sender.split('@')[0]} is grabbing the egg of @${who.split('@')[0]}.`;
    let mentionedJid = [who, m.sender];

    const abrazo = await conn.reply(m.chat, str, m, { mentions: mentionedJid });
    
    conn.sendMessage(m.chat, { react: { text: '🍆', key: abrazo.key } });
  }
};

handler.help = ['egg @user'];
handler.tags = ['fun'];
handler.command = ['egg'];
handler.group = true;
handler.register = true;

export default handler;