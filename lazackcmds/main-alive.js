import util from 'util';

let handler = async (m, { conn }) => {
  // User details
  let name = m.pushName || conn.getName(m.sender);
  let senderId = m.sender.split('@')[0];

  // Media URLs
  const audioUrl = 'https://cdn.jsdelivr.net/gh/Lazack28/Lazack-md@main/media/Alive.mp3';
  const githubUrl = 'https://github.com/Lazack28/Lazack-md';
  const youtubeUrl = 'https://youtu.be/3j_EIP--2t8?si=4TFWV0On6Bl1wr-e';
  const imageUrl = 'https://i.imgur.com/QMyKIPq.jpeg';
  const groupInviteUrl = 'https://chat.whatsapp.com/IIpL6gf6dcq4ial8gaJLE9';

  // Contact Information
  let contact = {
    key: {
      fromMe: false,
      participant: `${senderId}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}),
    },
    message: {
      contactMessage: {
        displayName: name,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nitem1.TEL;waid=${senderId}:${senderId}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };

  // Audio Message with Metadata
  let responseMessage = {
    audio: { url: audioUrl },
    mimetype: 'audio/mpeg',
    ptt: true,
    waveform: [100, 0, 100, 0, 100, 0, 100],
    fileName: 'Lazack_MD_Alive',
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: 'LAZACK MD - ALIVE',
        body: 'Experience the best of Lazack MD',
        thumbnailUrl: imageUrl,
        sourceUrl: groupInviteUrl,
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  };

  // Send message
  await conn.sendMessage(m.chat, responseMessage, { quoted: contact });
};

handler.help = ['alive'];
handler.tags = ['main'];
handler.command = /^alive$/i;

export default handler;
