let handler = async (m, { conn }) => {
    // Alive message
    let aliveMessage = "hello this is lazack device bot, developed by lazack28 and owned by lazack solutions, the bot is active";

    // Split into words
    let words = aliveMessage.split(" ");

    // Send first word
    let sent = await conn.sendMessage(m.chat, { text: words[0] }, { quoted: m });

    try {
        for (let i = 1; i < words.length; i++) {
            let newText = words.slice(0, i + 1).join(" ");

            // Edit the message each time with additional word
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

            await sleep(800); // delay for typing effect
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
