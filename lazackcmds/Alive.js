let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Sound
  let name = m.pushName || conn.getName(m.sender)
  var vn = 'https://cdn.jsdelivr.net/gh/Lazack28/Lazack-Device@main/Botify/lazack2.mp3'
  let url = 'https://github.com/Lazack28/Lazack-md'
  let murl = 'https://youtu.be/3j_EIP--2t8?si=4TFWV0On6Bl1wr-e'
  let img = 'https://i.imgur.com/QMyKIPq.jpeg'

  let con = {
    key: {
      fromMe: false,
      participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}),
    },
    message: {
      contactMessage: {
        displayName: `${name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  }

  let doc = {
    audio: {
      url: vn,
    },
    mimetype: 'audio/mpeg',
    ptt: true,
    waveform: [100, 0, 100, 0, 100, 0, 100],
    fileName: 'lazack',

    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: '✨ *ℒ𝒜𝒵𝒜𝒞𝒦 ℳ𝒟 𝒜ℒℐ𝒱ℰ* ✨',
        body: 'Lazack MD - Stay Alive and Energized!',
        thumbnailUrl: img,
        sourceUrl: 'https://chat.whatsapp.com/IIpL6gf6dcq4ial8gaJLE9',
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  }

  let aliveMessage = `🔥 *Hey ${name}!*\nYour bot is alive and running smoothly. Let's keep the energy flowing! 💥\n\nCheck out more updates:\n🔗 [GitHub Repository](https://github.com/Lazack28/Lazack-md)\n📺 [Watch the demo video](https://youtu.be/3j_EIP--2t8?si=4TFWV0On6Bl1wr-e)\n\nFeel free to ask for any help! 💬`

  // Send alive message along with the audio and contact message
  await conn.sendMessage(m.chat, { text: aliveMessage, mentions: [m.sender] }, { quoted: con })
  await conn.sendMessage(m.chat, doc, { quoted: con })
}

handler.help = ['alive']
handler.tags = ['main']
handler.command = /^(alive)$/i

export default handler
