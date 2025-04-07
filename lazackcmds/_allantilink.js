import fetch from 'node-fetch'; // Optional if you're using Node.js older than v18

const isLinkTik = /tiktok.com/i;
const isLinkYt = /youtube.com|youtu.be/i;
const isLinkTel = /t\.me|telegram\.me|telegram\.com/i;
const isLinkFb = /facebook.com|fb.me/i;
const isLinkIg = /instagram.com/i;
const isLinkTw = /twitter.com/i;
const isLinkWa = /chat\.whatsapp\.com|whatsapp\.com\/channel/i; // Covers group & channel

const excludedNumbers = ['255734980103']; // Numbers to exclude from deletion

let handler = m => m;

handler.before = async function (m, { conn, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return !0;
  if (!m.isGroup) return !1;

  const senderNumber = m.sender.split("@")[0];

  if (excludedNumbers.includes(senderNumber)) return !0; // Skip if user is excluded

  const delet = m.key.participant;
  const bang = m.key.id;
  const aa = `${senderNumber}@s.whatsapp.net`;

  const checkAndDeleteLink = async (linkRegex, linkName) => {
    if (linkRegex.test(m.text)) {
      if (isBotAdmin) {
        try {
          await conn.reply(m.chat, `『🐯』A \`${linkName}\` link was detected.\nYou will be deleted: *@${senderNumber}*`, null, { mentions: [aa] });
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
    await checkAndDeleteLink(isLinkWa, 'WhatsApp');
  } catch (error) {
    console.error('Error during link checking:', error);
  }

  return !0;
};

export default handler;
