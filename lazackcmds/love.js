let regix = /love/i; // Regex pattern to match the word "love" (case insensitive)
let asta = "I love you! 💖"; // Default message if the regex does not match

let handler = async (m, { conn, args }) => {
    // Check if the input matches the regex; if not, use a default message
    let messageToSend = regix.test(args.join(' ')) ? args.join(' ') : asta;

    // Array of heart emojis
    let heartEmojis = [
        "❤", "💕", "😻", "🧡", "💛", "💚", "💙", "💜", "🖤", "❣", 
        "💞", "💓", "💗", "💖", "💘", "💝", "💟", "♥", "💌", 
        "🙂", "🤗", "😌", "😉", "🤗", "😊", "🎊", "🎉", "🎁", "❤"
    ];

    // Send the first heart emoji
    let { key: messageKey } = await conn.reply(m.chat, messageToSend.replace(regix, "" + heartEmojis[0]), m);

    // Loop through the heart emojis and send them with a delay
    for (let i = 0; i < heartEmojis.length; i++) {
        await sleep(800); // Wait for 800 milliseconds
        await conn.reply(m.chat, messageToSend.replace(regix, "" + heartEmojis[i]), { edit: messageKey });
    }
}

handler.help = ['love']
handler.tags = ['fun']
handler.command = ['love']
// Change to true if only the owner should use it
export default handler;