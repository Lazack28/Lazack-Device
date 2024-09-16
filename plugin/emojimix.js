import fetch from 'node-fetch';
import fs from 'fs';

const emojimix = async (m, Fox) => {
  try {
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['emojimix', 'emix'];
    if (!validCommands.includes(cmd)) return;

    let [emoji1, emoji2] = text.split('=');
    if (!emoji1 || !emoji2) {
      return m.reply(`Example: ${prefix + cmd} 🧛‍♂=🦊`);
    }

    const url = `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`;
    const response = await fetch(url);
    const anu = await response.json();

    if (!anu.results || anu.results.length === 0) {
      return m.reply('No emoji mix found for the provided emojis.');
    }

    for (let res of anu.results) {
      const encmedia = await Fox.sendImageAsSticker(m.from, res.url, m, { packname: "", author: "mrhansamala", categories: res.tags });
      await fs.unlinkSync(encmedia);
    }
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default emojimix;
