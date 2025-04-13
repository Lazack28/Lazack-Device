import fs from 'fs';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

const delayResponse = (min, max) => new Promise(res => setTimeout(res, Math.floor(Math.random() * (max - min + 1)) + min));

let handler = async (m, { conn }) => {
  const ADMIN_NUMBER = '255754347617@s.whatsapp.net';
  if (m.isGroup || m.fromMe) return;

  const text = (m.text || '').trim().toLowerCase();

  if (!global.buyStates) global.buyStates = {};
  const userState = global.buyStates[m.sender] || {};

  if (userState.isBuying) {
    if (text === 'cancel') {
      delete global.buyStates[m.sender];
      await conn.reply(m.chat, '❌ Umenyamazisha mchakato wa kununua bot.', m);
      return;
    }

    if (!userState.name) {
      global.buyStates[m.sender] = { ...userState, name: m.text, isBuying: true };
      await delayResponse(3000, 6000);
      await conn.reply(m.chat, '🤖 Ni bot gani unayotaka kununua? (mf: WhatsApp bot, Telegram bot, Discord bot):', m);
      return;
    }

    if (!userState.botType) {
      global.buyStates[m.sender] = { ...userState, botType: m.text, isBuying: true };
      await delayResponse(3000, 6000);

      const paymentInfo = `💵 Bei ya kila bot ni *Tsh 3000/-*

📲 *Tuma malipo kwa:*
• Tigo Pesa: 0779679079
• Jina: Lazaro Mtaju

📸 Kisha tuma risiti ya malipo kama *picha (image)* hapa.`;

      await conn.reply(m.chat, paymentInfo, m);
      return;
    }

    if (!userState.paymentProof && m.message.imageMessage) {
      global.buyStates[m.sender] = { ...userState, paymentProof: true };

      const confirmMsg = `📄 *TAARIFA ZA ODA YA BOT:*

👤 Jina: ${userState.name}
🤖 Aina ya Bot: ${userState.botType}
💰 Bei: Tsh 3000/-
📨 Namba ya Mteja: ${m.sender.split('@')[0]}

Andika *confirm* kuthibitisha oda au *cancel* kughairi.`;

      await conn.reply(m.chat, confirmMsg, m);
      return;
    }

    if (text === 'confirm') {
      const orderText = `📦 *ODA MPYA YA BOT* 📦

👤 Jina: ${userState.name}
🤖 Bot: ${userState.botType}
💰 Bei: Tsh 3000/-
📨 Mteja: ${m.sender.split('@')[0]}
⏰ Wakati: ${new Date().toLocaleString()}`;

      await conn.forwardMessage(ADMIN_NUMBER, m, false);
      await conn.sendMessage(ADMIN_NUMBER, { text: orderText });

      await conn.reply(m.chat, `✅ Oda yako ya bot imepokelewa kwa mafanikio!\n\nTutawasiliana nawe hivi karibuni.`, m);
      delete global.buyStates[m.sender];
      return;
    }

    if (!userState.paymentProof) {
      await conn.reply(m.chat, '📸 Tafadhali tuma ushahidi wa malipo kama picha.', m);
      return;
    }
  }

  if (text === 'nunua') {
    global.buyStates[m.sender] = { isBuying: true };
    await delayResponse(3000, 6000);
    await conn.reply(m.chat, '👋 Karibu kwenye huduma ya kununua bot kutoka *Lazack Organisation*.\n\n📌 Tafadhali tuma jina lako la kwanza:', m);
    return;
  }

  if (!userState.isBuying) {
    await delayResponse(3000, 6000);
    await conn.reply(m.chat, `❓ Samahani, sielewi amri hiyo.\n\n🛒 Andika *nunua* kuanza kununua bot kwa Tsh 3000/-.`, m);
  }
};

export default handler;
