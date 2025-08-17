import { delay } from '@whiskeysockets/baileys';

const gameRooms = {};

const handler = async (m, { conn }) => {
    const chatId = m.chat;
    const senderId = m.sender;

    if (gameRooms[chatId]) 
        return conn.reply(m.chat, '⚠️ There is already an active game in this group. Please wait for it to finish.', m);

    gameRooms[chatId] = { players: [senderId], status: 'waiting' };

    await conn.sendMessage(m.chat, { 
        text: `🔥 *Death Roulette* 🔥\n\n@${senderId.split('@')[0]} started a game session.\n> Type *accept* to join. Time remaining: 60 seconds...`, 
        mentions: [senderId] 
    }, { quoted: m });

    await delay(60000);
    if (gameRooms[chatId] && gameRooms[chatId].status === 'waiting') {
        delete gameRooms[chatId];
        await conn.sendMessage(m.chat, { text: '⌛ No one accepted the challenge. The room has been closed.' });
    }
};

handler.command = ['deathroulette', 'dr'];
handler.botAdmin = true;
handler.group = true;
handler.owner = false;

export default handler;

handler.before = async (m, { conn }) => {
    const chatId = m.chat;
    const senderId = m.sender;
    const text = m.text?.toLowerCase();

    if (!gameRooms[chatId]) return;

    if (text === 'accept' || text === 'acepto') {
        if (gameRooms[chatId].players.length >= 2) 
            return conn.reply(m.chat, '⚠️ This room already has two players.', m);

        if (senderId === gameRooms[chatId].players[0])
            return conn.reply(m.chat, '❌ You cannot accept your own challenge.', m);

        gameRooms[chatId].players.push(senderId);
        gameRooms[chatId].status = 'complete';

        await conn.sendMessage(m.chat, { 
            audio: { url: "https://qu.ax/iwAmy.mp3" }, 
            mimetype: "audio/mp4", 
            ptt: true 
        });

        await conn.sendMessage(m.chat, { 
            text: '🔥 *Death Roulette* 🔥\n\n⚡ The room is now full!\n\n> Selecting the loser...' 
        });

        const loadingMessages = [
            "《 █▒▒▒▒▒▒▒▒▒▒▒》10%\nCalculating probabilities...",
            "《 ████▒▒▒▒▒▒▒▒》30%\nDestiny is being decided...",
            "《 ███████▒▒▒▒▒》50%\nThe wheel is spinning...",
            "《 ██████████▒▒》80%\nAlmost there...",
            "《 ████████████》100%\nFinal result!"
        ];

        let { key } = await conn.sendMessage(m.chat, { text: "⚡ Calculating result!" }, { quoted: m });

        for (let msg of loadingMessages) {
            await delay(3000);
            await conn.sendMessage(m.chat, { text: msg, edit: key }, { quoted: m });
        }

        const [player1, player2] = gameRooms[chatId].players;
        const loser = Math.random() < 0.5 ? player1 : player2;

        await conn.sendMessage(m.chat, { 
            text: `💀 *Final Verdict* 💀\n\n@${loser.split('@')[0]} is the loser.\n\n> You have 60 seconds for your last words...`, 
            mentions: [loser] 
        });

        await delay(60000);
        await conn.groupParticipantsUpdate(m.chat, [loser], 'remove');
        await conn.sendMessage(m.chat, { 
            text: `☠️ @${loser.split('@')[0]} has been eliminated. Game over.`, 
            mentions: [loser] 
        });
        
        delete gameRooms[chatId];
    }

    if (text === 'cancel' && senderId === gameRooms[chatId].players[0]) {
        delete gameRooms[chatId];
        await conn.sendMessage(m.chat, { text: '❌ The game has been canceled by the challenger.' });
    }
};