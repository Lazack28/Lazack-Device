let handler = async (m, { conn }) => {
    // Alive Message with emojis + footer
    let aliveMessage = [
        "👋 Hello there!",
        "🤖 I am *Lazack Device Bot*",
        "💡 Developed by *Lazack28*",
        "🏢 Owned by *Lazack Solutions Inc*",
        "✅ The bot is *active & running smoothly* 🚀",
        "✨ Stay connected and enjoy the features! 🌟",
        "",
        "> ⚡ Powered by *Lazack Organisation* 🌐"
    ];

    // Send first line
    let sent = await conn.sendMessage(m.chat, { text: aliveMessage[0] }, { quoted: m });

    try {
        for (let i = 1; i < aliveMessage.length; i++) {
            let newText = aliveMessage.slice(0, i + 1).join("\n");

            // Edit the message each time with an extra line
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

            await sleep(1200); // Delay for typing effect
        }
    } catch (error) {
        console.error("Error in alive.js:", error);
    }
};

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

handler.help = ['alive'];
handler.tags = ['main'];
handler.command = ['alive'];

export default handler;
