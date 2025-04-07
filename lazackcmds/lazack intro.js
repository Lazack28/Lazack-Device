let handler = async (m, { conn, args }) => {
    // Define regex and default message
    let regix = /\S+/; // Matches any non-space character
    let asta = "Welcome to Lazack Organisation! 🚀 We are a tech-driven organization focused on innovation, empowering developers, and creating impactful solutions for the digital world. From cutting-edge projects to open-source collaborations, we are committed to pushing the boundaries of technology. Join us in shaping the future of tech! 🌍💡"; // Default introduction message

    // Check if input matches regex, else use default
    let messageToSend = regix.test(args.join(' ')) ? args.join(' ') : asta;

    // Array of Lazack Organisation-related emojis
    let organisationEmojis = [
        "🌐", "💡", "🚀", "🎯", "📈", "🔧", "🖥️", "⚡", "💼", "🌍",
        "🤖", "💻", "🛠️", "🔗", "👥", "📊", "💬", "💪", "👨‍💻", "👩‍💻",
        "📚", "📝", "🔍", "📍", "✨"
    ];

    // Send initial message
    let sent = await conn.sendMessage(m.chat, { text: `${messageToSend} 💼` }, { quoted: m });

    try {
        for (let i = 0; i < organisationEmojis.length; i++) {
            let newText = `${organisationEmojis[i]} Lazack Organisation is here to innovate and create change in the tech world!`;

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
        console.error("Error in Lazack Organisation intro.js:", error);
    }
};

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

handler.help = ['intro'];
handler.tags = ['info'];
handler.command = ['intro'];

export default handler;
