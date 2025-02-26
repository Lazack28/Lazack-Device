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

    let lastMessage; // Store last message key

    try {
        for (let i = 0; i < heartEmojis.length; i++) {
            // If there's a previous message, delete it
            if (lastMessage) {
                await conn.sendMessage(m.chat, { delete: lastMessage });
            }

            // Send new heart emoji message
            let sentMessage = await conn.sendMessage(m.chat, { text: `${messageToSend} ${heartEmojis[i]}` }, { quoted: m });
            lastMessage = sentMessage?.key; // Store the key of the last sent message

            await sleep(800); // Wait for 800ms before sending the next emoji
        }
    } catch (error) {
        console.error("Error in love.js:", error);
    }
};

// Sleep function to create delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

handler.help = ['love'];
handler.tags = ['fun'];
handler.command = ['love'];

export default handler;
