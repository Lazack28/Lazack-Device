let handler = async (m, { conn, args }) => {
    // Define regex and default message
    let regix = /\S+/; // Matches any non-space character
    let asta = "Sending love to you! ❤️"; // Default message if no input

    // Check if the input matches the regex; if not, use a default message
    let messageToSend = regix.test(args.join(' ')) ? args.join(' ') : asta;

    // Array of heart emojis
    let heartEmojis = [
        "❤", "💕", "😻", "🧡", "💛", "💚", "💙", "💜", "🖤", "❣", 
        "💞", "💓", "💗", "💖", "💘", "💝", "💟", "♥", "💌", 
        "🙂", "🤗", "😌", "😉", "🤗", "😊", "🎊", "🎉", "🎁", "❤"
    ];

    // Send the first heart emoji message
    let sentMessage = await conn.reply(m.chat, messageToSend.replace(/\{emoji\}/g, heartEmojis[0]), m);
    let messageKey = sentMessage?.key; // Ensure messageKey exists

    // Loop through the heart emojis and send them with a delay
    for (let i = 0; i < heartEmojis.length; i++) {
        await sleep(800); // Wait for 800 milliseconds
        if (messageKey) {
            await conn.reply(m.chat, messageToSend.replace(/\{emoji\}/g, heartEmojis[i]), { edit: messageKey });
        }
    }
}

// Sleep function to create delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

handler.help = ['love'];
handler.tags = ['fun'];
handler.command = ['love'];

export default handler;
