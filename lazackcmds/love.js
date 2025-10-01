let handler = async (m, { conn, args }) => {
    // Define regex and default message
    let regix = /\S+/; // Matches any non-space character
    let asta = "I LOVE YOU! "; // Default message if no input

    // Check if input matches regex, else use default
    let messageToSend = regix.test(args.join(' ')) ? args.join(' ') : asta;

    // Array of heart emojis
    let heartEmojis = [
        "❤", "💕", "😻", "🧡", "💛", "💚", "💙", "💜", "🖤", "❣", 
        "💞", "💓", "💗", "💖", "💘", "💝", "💟", "♥", "💌", 
        "🙂", "🤗", "😌", "😉", "🤗", "😊", "🎊", "🎉", "🎁", "❤"
    ];

    // Send initial message
    let sent = await conn.sendMessage(m.chat, { text: `${messageToSend} 💖` }, { quoted: m });

    try {
        for (let i = 0; i < heartEmojis.length; i++) {
            let newText = `${heartEmojis[i]}`;

            // Edit the message using protocolMessage
            await conn.relayMessage(
                m.chat,
                {
                    protocolMessage: {
                        key: sent.key,
                        type: 14,
                        editedMessage: { conversation: newText },
                    },
                },
                {}
            );

            await sleep(800); // Delay between edits
        }
    } catch (error) {
        console.error("Error in love.js:", error);
    }
};

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

handler.help = ['love'];
handler.tags = ['fun'];
handler.command = ['love'];

export default handler;