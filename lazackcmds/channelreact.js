// smartAutoReactNewsletter.js
// Automatically reacts to the latest message in your WhatsApp newsletter with randomized emojis and delays

const reactedMessages = new Set(); // track messages already reacted

let handler = async (m, { conn }) => {
  try {
    // === YOUR CHANNEL CONFIG ===
    const remoteJid = "120363321705798318@newsletter"; // your newsletter channel JID

    // 10 emojis to react with
    const emojis = ["❤️", "👍", "😂", "🔥", "🥳", "🤩", "💯", "😎", "✨", "🎉"];

    // Fetch channel metadata
    const metadata = await conn.groupMetadata(remoteJid).catch(() => null);
    if (!metadata) return console.log("❌ Could not fetch newsletter info.");

    const messages = metadata.messages || [];
    if (!messages.length) return console.log("❌ No messages in newsletter yet.");

    const latestMessage = messages[messages.length - 1];
    const messageId = latestMessage.key.id;

    // Skip if already reacted
    if (reactedMessages.has(messageId)) return;

    reactedMessages.add(messageId); // mark as reacted

    console.log("🔔 Reacting to latest newsletter message...");

    // Shuffle emojis for random order
    const shuffledEmojis = emojis.sort(() => Math.random() - 0.5);

    // React sequentially with random delays
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

      // Random delay between 500ms and 2500ms
      const delay = Math.floor(Math.random() * 2000) + 500;
      await sleep(delay);
    }

    console.log("✅ Finished reacting to latest newsletter.");

  } catch (error) {
    console.error("❌ Error in smartAutoReactNewsletter:", error);
  }
};

// helper sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// === Auto-run periodically (every 15 seconds) ===
setInterval(async () => {
  await handler({});
}, 15000); // adjust interval if needed

export default handler;
