import { promises } from 'fs';
import { join } from 'path';
import axios from 'axios'; 

let handler = async function (m, { conn, __dirname }) {
const githubRepoURL = 'https://github.com/Lazack28/Lazack-Device';
  try {
const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
if (response.status === 200) {
const repoData = response.data;
const formattedInfo = `
⚽ 𝐋𝐀𝐙𝐀𝐂𝐊-𝐌𝐃 ⚽
*ENJOYABLE FEATURES WHATSAPP BOTS BY LAZACK28*\n
𝖲𝖳𝖠𝖱✨ :: ${repoData.stargazers_count}
𝖥𝖮𝖱𝖪 🍽️ :: ${repoData.forks_count}
𝖴𝖱𝖫 👻 :: ${repoData.html_url}\n\n
\`🚀 Key Features\`
1. *Automated Messaging*\n
2. *Media Sharing*\n
3. *Chat Management*\n
4. *Interactive Features*\n
5. *Custom Commands*

*_DEPLOY NOW_*

\`\`\`Enhance your WhatsApp experience with 𝐋𝐀𝐙𝐀𝐂𝐊-𝐌𝐃 ! ⚽\`\`\`
        `.trim();
        
      await conn.relayMessage(m.chat,  {
        requestPaymentMessage: {
          currencyCodeIso4217: 'TSH',
          amount1000: 69000,
          requestFrom: m.sender,
          noteMessage: {
          extendedTextMessage: {
          text: formattedInfo,
          contextInfo: {
          externalAdReply: {
          showAdAttribution: true
          }}}}}}, {})
          
    } else {
      await conn.reply(m.chat, 'Unable to fetch repository information.', m);
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'An error occurred while fetching repository information.', m);
  }
};
handler.help = ['script'];
handler.tags = ['main'];
handler.command = ['sc', 'repo', 'script', 'code'];

export default handler;
