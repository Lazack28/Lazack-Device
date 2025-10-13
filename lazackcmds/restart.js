let handler = async (m, { conn }) => {
  // Send a message before restarting
  await conn.reply(
    m.chat,
    `🌾 Restarting the socket...\n> 🐼 *Please wait a moment...*`,
    m
  );

  // Exit the process after 3 seconds
  setTimeout(() => {
    process.exit(0);
  }, 3000);
};

handler.help = ['restart'];
handler.tags = ['owner'];
handler.command = ['restart'];
handler.owner = true;

export default handler;
