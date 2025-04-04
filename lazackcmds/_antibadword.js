const offensiveWords = [
  // English offensive words
  'gandu', 'maderchod', 'bhosdike', 'bhosda', 'laud?a', 'chut?iya', 'maa ki chut', 'behenchod', 'behen ki chut', 'tatto ke saudagar',
  'machar ki jhant', 'jhant? ka baal', 'Rand?i ka aulad', 'chuchi', 'booob?ie?s', 'to?lo?l', 'idiot', 'nigga', 'fuck', 'dick', 'bitch',
  'tits', 'bastard', 'asshole', 'a[su,w,yu]',
  // Swahili offensive words
  'ujinga', 'mpumbavu', 'malaya', 'mavi', 'punda', 'mchafu', 'mwizi', 'kaka', 'shenzi', 'kapuku', 'mbwa', 'mavi ya mbwa'
];

const linkRegex = /(?:chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})|https:\/\/whatsapp\.com\/channel\/[0-9A-Za-z]+)/i;
import axios from 'axios';
import fetch from 'node-fetch';

export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;

  let chat = global.db.data.chats[m.chat];
  let bot = global.db.data.settings[this.user.jid] || {};
  const isAntiToxic = isToxic.exec(m.text);
  let removeParticipant = m.key.participant;
  let messageId = m.key.id;

  // Check for offensive words in both English and Swahili
  const containsOffensiveWords = offensiveWords.some(word => new RegExp(word, 'i').test(m.text));
  
  if (containsOffensiveWords || isAntiToxic) {
    let toxicityLevel = 0;

    // Analyze the toxicity if we need more info
    if (isAntiToxic) {
      var analysisResult = await Analyze(m.text);
      var toxicityPercentage = Number(analysisResult.toxicity * 100).toFixed(2);

      if (toxicityPercentage > 50) toxicityLevel = 5;
      else if (toxicityPercentage > 35) toxicityLevel = 4;
      else if (toxicityPercentage > 20) toxicityLevel = 3;
      else if (toxicityPercentage > 10) toxicityLevel = 2;
      else toxicityLevel = 1;
    }

    // Send a message to the group with the verdict
    const toxicityLevels = [
      '❤️  ❤️  ❤️  ❤️  ❤️', // Very friendly
      '☠️  ❤️  ❤️  ❤️  ❤️', // Mildly toxic
      '☠️  ☠️  ❤️  ❤️  ❤️', // A bit toxic
      '☠️  ☠️  ☠️  ❤️  ❤️', // Quite toxic
      '☠️  ☠️  ☠️  ☠️  ❤️', // Highly toxic
      '☠️  ☠️  ☠️  ☠️  ☠️', // Extremely toxic
    ];

    const toxicityVerdict = [
      'You are so friendly. Very welcoming to know you!',
      'You are not too toxic, is it fun?',
      'You appear to be toxic. Calm down!',
      "Don't be so toxic. You can relax!",
      "You're totally the most toxic person in the world!",
      'Your toxic meter also goes above 100%.',
    ];

    const caption = `*[ TOXIC STRENGTH ]*\n\n${toxicityLevels[toxicityLevel]}\n${toxicityVerdict[toxicityLevel]}`;

    await this.reply(
      m.chat,
      `*Bad Words Detected!*\n ${caption} ${isBotAdmin ? '' : '\n\n_Bot is not admin_'}`,
      m
    );

    // Delete the message with the link or offensive word
    if (isBotAdmin) {
      global.db.data.users[m.sender].warn += 1;
      return this.sendMessage(m.chat, {
        delete: { remoteJid: m.chat, fromMe: false, id: messageId, participant: removeParticipant },
      });
    }
  }

  return true;
}

async function Analyze(text) {
  try {
    const result = await axios.post(
      'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=YOUR_API_KEY',
      {
        comment: {
          text: text,
          type: 'PLAIN_TEXT',
        },
        languages: ['en'],
        requestedAttributes: { SEVERE_TOXICITY: {}, INSULT: {} },
      }
    );

    return {
      toxicity: result.data.attributeScores.SEVERE_TOXICITY.summaryScore.value,
      insult: result.data.attributeScores.INSULT.summaryScore.value,
      combined:
        (result.data.attributeScores.SEVERE_TOXICITY.summaryScore.value +
          result.data.attributeScores.INSULT.summaryScore.value) / 2,
    };
  } catch (error) {
    console.error(error);
    return { toxicity: NaN, insult: NaN, combined: NaN };
  }
}
