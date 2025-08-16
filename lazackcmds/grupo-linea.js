import axios from "axios";

const handler = async (m, { conn, args }) => {
  try {
    // Get group profile picture or default icon
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => global.icon);
    
    // Determine group ID (from args or current chat)
    const groupId = args?.[0]?.match(/\d+\-\d+@g.us/)?.[0] || m.chat;
    
    // Get unique participants from chat messages
    const messages = conn.chats[groupId]?.messages || {};
    const uniqueParticipants = Object.values(messages)
      .map(item => item.key?.participant)
      .filter(Boolean) // Remove null/undefined
      .filter((value, index, self) => self.indexOf(value) === index); // Unique values

    // Sort participants by their number
    const sortedParticipants = uniqueParticipants.sort((a, b) => 
      a.split("@")[0].localeCompare(b.split("@")[0])
    );

    // Format the online list
    const onlineList = sortedParticipants.length > 0
      ? sortedParticipants.map(p => `• @${p.split("@")[0]}`).join("\n")
      : "✧ No online users found at this time.";

    // Send the formatted message
    await conn.sendMessage(
      m.chat,
      {
        image: { url: pp },
        caption: `*❀ Online Users List:*\n\n${onlineList}\n\n> ${dev}`,
        mentions: sortedParticipants,
      },
      { quoted: m }
    );

    await m.react("✅");
    
  } catch (error) {
    console.error("Online list error:", error);
    await m.reply(`⚠️ Error: ${error.message}`);
    await m.react("❌");
  }
};

// Command configuration
handler.help = ["online [group-id]", "listonline"];
handler.tags = ["group", "tools"];
handler.command = ["online", "listonline"];
handler.group = true;
handler.admin = false; // Anyone can use

export default handler;