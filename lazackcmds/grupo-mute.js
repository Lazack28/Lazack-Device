import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, isAdmin }) => {
  // Validate admin permissions
  if (!isAdmin) {
    return m.reply('🍬 *Only admins can execute this command*');
  }

  // Get mentioned user or quoted sender
  const user = m.mentionedJid?.[0] || 
              (m.quoted ? m.quoted.sender : text) || 
              m.sender;

  // Validate user input
  if (!user) {
    const usage = command === 'mute' 
      ? '🍬 *Mention the person you want to mute*' 
      : '🍬 *Mention the person you want to unmute*';
    return m.reply(usage);
  }

  // Protected users that can't be muted
  const botOwner = global.owner[0][0] + '@s.whatsapp.net';
  const groupMetadata = await conn.groupMetadata(m.chat);
  const groupOwner = groupMetadata.owner || m.chat.split('-')[0] + '@s.whatsapp.net';

  if (user === conn.user.jid) {
    return m.reply('🍭 *You cannot mute the bot*');
  }
  if (user === botOwner) {
    return m.reply('🍬 *The bot creator cannot be muted*');
  }
  if (user === groupOwner) {
    return m.reply('🍭 *You cannot mute the group creator*');
  }

  // Handle mute/unmute commands
  const userData = global.db.data.users[user] || {};

  if (command === 'mute') {
    if (userData.mute) {
      return m.reply('🍭 *This user is already muted*');
    }
    
    userData.mute = true;
    const muteMessage = {
      key: { participants: ['0@s.whatsapp.net'], fromMe: false, id: 'Halo' },
      message: {
        locationMessage: {
          name: 'LazackOrganisation',
          jpegThumbnail: await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
        }
      },
      participant: '0@s.whatsapp.net'
    };
    
    await conn.reply(m.chat, '*Your messages will be deleted*', muteMessage, { mentions: [user] });
    
  } else if (command === 'unmute') {
    if (!userData.mute) {
      return m.reply('🍭 *This user is not muted*');
    }
    
    userData.mute = false;
    const unmuteMessage = {
      key: { participants: ['0@s.whatsapp.net'], fromMe: false, id: 'Halo' },
      message: {
        locationMessage: {
          name: 'LazackOrganisation',
          jpegThumbnail: await (await fetch('https://lazackorganisation.my.id/lazack.jpg')).buffer(),
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
        }
      },
      participant: '0@s.whatsapp.net'
    };
    
    await conn.reply(m.chat, '*Your messages will not be deleted*', unmuteMessage, { mentions: [user] });
  }
};

handler.help = ['mute @user', 'unmute @user'];
handler.tags = ['group', 'moderation'];
handler.command = ['mute', 'unmute', 'muto', 'desmute'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;