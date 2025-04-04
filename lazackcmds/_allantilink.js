import fetch from 'node-fetch'; // Optional if you're using Node.js older than v18

const isLinkTik = /tiktok.com/i;
const isLinkYt = /youtube.com|youtu.be/i;
const isLinkTel = /telegram.com/i;
const isLinkFb = /facebook.com|fb.me/i;
const isLinkIg = /instagram.com/i;
const isLinkTw = /twitter.com/i;

let handler = m => m;

handler.before = async function (m, { conn, args, usedPrefix, command, isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return !0;
  if (!m.isGroup) return !1;

  let chat = global.db.data.chats[m.chat];
  let bot = global.db.data.settings[this.user.jid] || {};
  let delet = m.key.participant;
  let bang = m.key.id;
  let toUser = `${m.sender.split("@")[0]}`;
  let aa = toUser + '@s.whatsapp.net';

  const checkAndDeleteLink = async (linkRegex, linkName) => {
    const isLinkDetected = linkRegex.exec(m.text);
    if (isLinkDetected) {
      if (isBotAdmin) {
        try {
          await conn.reply(m.chat, `『🐯』A \`${linkName}\` link was detected.\nYou will be deleted: *@${toUser}*`, null, { mentions: [aa] });
          await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
          await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        } catch (error) {
          console.error(`Error deleting ${linkName} user:`, error);
        }
      } else {
        return m.reply(`『🐯』The bot is not admin, I can't delete people.`);
      }
    }
  };

  try {
    await checkAndDeleteLink(isLinkTik, 'TikTok');
    await checkAndDeleteLink(isLinkYt, 'YouTube');
    await checkAndDeleteLink(isLinkTel, 'Telegram');
    await checkAndDeleteLink(isLinkFb, 'Facebook');
    await checkAndDeleteLink(isLinkIg, 'Instagram');
    await checkAndDeleteLink(isLinkTw, 'Twitter');
  } catch (error) {
    console.error('Error during link checking:', error);
  }

  return !0;
};

export default handler;
