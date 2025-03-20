import axios from 'axios';

let handler = async function (m, { conn }) {
  const githubRepoURL = 'https://github.com/Lazack28/Lazack-Device';

  try {
    const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);

    if (response.status === 200) {
      const repoData = response.data;

      // Format the repository information with emojis
      const formattedInfo = `
🚀 *Lazack-Device Repository*
Lazack-Device is a powerful and feature-rich WhatsApp bot framework designed to enhance automation, security, and user experience. Perfect for developers looking to build advanced WhatsApp bots.

📂 *Repository Name:* ${repoData.name}
📝 *Description:* ${repoData.description || 'No description available'}
👤 *Owner:* ${repoData.owner.login}
⭐ *Stars:* ${repoData.stargazers_count}
🍴 *Forks:* ${repoData.forks_count}
🛠 *Open Issues:* ${repoData.open_issues_count}
🔄 *Last Updated:* ${new Date(repoData.updated_at).toLocaleString()}
🌐 *URL:* ${repoData.html_url}

💡 *Key Features:*
✅ Easy to deploy and modify  
✅ Supports multiple commands  
✅ Secure and optimized  
✅ Regular updates and improvements  

🔗 *Clone & Start Building:*
\`\`\`bash
git clone ${repoData.clone_url}
cd ${repoData.name}
npm install
node index.js
\`\`\`

📢 Join our community and contribute to the project!  
      `.trim();

      // Send the formatted information as a message
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: 'INR',
            amount1000: 69000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text: formattedInfo,
                contextInfo: {
                  externalAdReply: {
                    title: 'Lazack-Device - Advanced WhatsApp Bot',
                    body: 'Click here to visit the GitHub repository',
                    mediaType: 1,
                    mediaUrl: repoData.html_url,
                    sourceUrl: repoData.html_url,
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {}
      );
    } else {
      await conn.reply(m.chat, '❌ Unable to fetch repository information.', m);
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, '⚠️ An error occurred while fetching repository information.', m);
  }
};

handler.help = ['script'];
handler.tags = ['main'];
handler.command = ['sc', 'repo'];

export default handler;
