import { generateWAMessageFromContent } from '@adiwajshing/baileys'; // Ensure you have this library installed
import axios from 'axios';

// Handler function
let handler = async (m, { conn }) => {
  const githubRepoURL = 'https://github.com/Lazack28/Lazack-Device';

  try {
    // Extract username and repo name from the URL
    const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
    
    // Fetch repository data from GitHub API
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
    
    if (response.status === 200) {
      const repoData = response.data;

      // Create the location message with the repository information
      let msg = await generateWAMessageFromContent(m.chat, {
        locationMessage: {
          degreesLatitude: 0,
          degreesLongitude: 0,
          name: repoData.name,
          address: 'Tanzania', // Change this to a more relevant address if needed
          url: repoData.html_url,
          isLive: true,
          accuracyInMeters: 0,
          speedInMps: 0,
          degreesClockwiseFromMagneticNorth: 2,
          comment: repoData.description || "Your Welcome",
          jpegThumbnail: await conn.resize("https://imgur.com/q7WXO5w.jpeg", 300, 300), // Ensure this image URL is valid
        },
      }, { quoted: m });

      // Send the location message
      return conn.relayMessage(m.chat, msg.message, {});
    } else {
      throw new Error(`Error fetching repository: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, `An error occurred: ${error.message}`, m);
  }
}

// Command metadata
handler.help = ['repo'];
handler.tags = ['info'];
handler.command = ['sc', 'repo'];

export default handler;