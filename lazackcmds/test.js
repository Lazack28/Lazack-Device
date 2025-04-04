import fs from 'fs';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix: _p }) => {
  let img = 'https://avatars.githubusercontent.com/u/106463398?v=4'; // Image for the bot avatar
  let info = `*BOT ACTIVE*\n\nHello, *${m.pushName}*! 👋\nThe bot is currently online and operational. ⚡\n\nPlease type any command to interact with me!`; // Personalized bot message

  // Send the message with external ad reply and image
  await conn.reply(m.chat, info, m, {
    contextInfo: {
      mentionedJid: [m.sender], // Mention the sender in the message
      forwardingScore: 256, // Forwarding score to make it look like it's forwarded
      isForwarded: true, // Mark the message as forwarded
      externalAdReply: {
        title: 'Bot Status Update', // Title for the external ad
        body: `*${botname}* is now active!`, // Body content for the external ad
        sourceUrl: 'https://github.com/Lazack28', // URL to the bot's source (replace with actual link)
        thumbnail: await conn.getFile(img), // Thumbnail image (bot avatar)
        mediaType: 1, // 1 indicates image media type
        renderLargerThumbnail: true, // Show a larger thumbnail
      },
    },
  });

  // React to the message with a success emoji
  m.react('✅');
};

handler.customPrefix = /^(tes|tess|test)$/i; // Trigger for the command, can be 'test', 'tes', or 'tess'
handler.command = new RegExp(); // Set the command regex pattern to trigger the handler

export default handler;
