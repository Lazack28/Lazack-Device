import util from 'util';
import path from 'path';

async function handler(m, { groupMetadata, conn, text }) {
    const mentionUser = (a) => '@' + a.split('@')[0];
    
    if (!text) return conn.reply(m.chat, 
        `${emoji} Please specify what you want to raffle (e.g., !raffle Gift Card).`, 
        m
    );

    const participants = groupMetadata.participants.map(v => v.id);
    const winner = pickRandom(participants);
    const randomSound = Math.floor(Math.random() * 70);
    const soundUrl = `https://hansxd.nasihosting.com/sound/sound${randomSound}.mp3`;
    
    let announcement = `*[🎉 GIVEAWAY RESULTS 🎉]*\n\n`;
    announcement += `${mentionUser(winner)} 🎊\n`;
    announcement += `Congratulations! You won the "${text}" raffle!\n\n`;
    announcement += `_All participants: ${participants.length}_`;

    // Send celebration audio
    await conn.sendMessage(m.chat, { 
        audio: { url: soundUrl }, 
        mimetype: 'audio/mp4',
        ptt: true 
    });

    // Animated text typing effect
    let displayText = '';
    for (const char of announcement) {
        await new Promise(resolve => setTimeout(resolve, 15));
        displayText += char;
        
        // Update typing indicator periodically
        if (displayText.length % 10 === 0) {
            await conn.sendPresenceUpdate('composing', m.chat);
        }
    }

    // Send final announcement
    await conn.sendMessage(m.chat, { 
        text: displayText, 
        mentions: conn.parseMention(displayText) 
    }, {
        quoted: m,
        ephemeralExpiration: 24*60*100,
        disappearingMessagesInChat: 24*60*100
    });
}

handler.help = ['raffle <prize>', 'giveaway <prize>'];
handler.command = ['raffle', 'giveaway', 'sorteo', 'premio'];
handler.tags = ['fun', 'group'];
handler.group = true;
handler.admin = false;
handler.register = true;
handler.botAdmin = true; // Needed for mentions

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}