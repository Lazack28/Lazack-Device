import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  console.log(`📩 Received: ${m.text}`); // Debugging log

  const url = 'https://all-api.payus.web.id';
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch API list!`);
    
    const apiList = await response.json();
    if (!Array.isArray(apiList) || apiList.length === 0) {
      return m.reply('*No APIs found in the list!*');
    }

    // Format API list into a readable message
    let message = '*📜 Available APIs:*\n\n';
    apiList.forEach((api, index) => {
      message += `🔹 *${index + 1}. ${api.name}*\n`;
      message += `📌 Endpoint: ${api.url}\n`;
      message += `📄 Description: ${api.description}\n\n`;
    });

    console.log(`✅ Fetched ${apiList.length} APIs`); // Debugging log

    // Send the API list as a message
    await conn.sendMessage(m.chat, { text: message });

  } catch (error) {
    console.error(error);
    await m.reply('*Failed to fetch API list!*');
  }
};

handler.help = ['apis'];
handler.tags = ['tools'];
handler.command = /^apis$/i;

export default handler;
