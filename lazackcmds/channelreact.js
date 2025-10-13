// smartAutoReactNewsletter.js
// Fully automatic newsletter reactor with random emojis and delays

const reactedMessages = new Set();

export default (conn) => {
  const handler = async () => {
    try {
      const remoteJid = "120363321705798318@newsletter"; // your newsletter channel
      const emojis = ["❤️", "👍", "😂", "🔥", "🥳", "🤩", "💯", "😎", "✨", "🎉"];

      const metadata = await conn.groupMetadata(remoteJid).catch(() => null);
      if (!metadata) return console.log("❌ Could not fetch newsletter info.");

      const messages = metadata.messages || [];
      if (!messages.length) return console.log("❌ No messages yet.");

      const latestMessage = messages[messages.length - 1];
      const messageId = latestMessage.key.id;

      if (reactedMessages.has(messageId)) return; // skip if already reacted
      reactedMessages.add(messageId);

      console.log("🔔 Reacting to latest newsletter message...");

      // Shuffle emojis
      const shuffledEmojis = emojis.sort(() => Math.random() - 0.5);

      for (let emoji of shuffledEmojis) {
        await conn.relayMessage(
          remoteJid,
          {
            reactMessage: {
              key: latestMessage.key,
              text: emoji
            }
          },
          {}
        );

        // Random delay 0.5s – 2.5s
        const delay = Math.floor(Math.random() * 2000) + 500;
        await sleep(delay);
      }

      console.log("✅ Finished reacting to latest newsletter.");
    } catch (err) {
      console.error("❌ Error in smartAutoReactNewsletter:", err);
    }
  };

  // Helper sleep function
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Run every 15 seconds
  setInterval(handler, 15000);
};
