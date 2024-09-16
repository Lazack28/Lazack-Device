import { lyrics, lyricsv2 } from '@bochilteam/scraper';

const lyricsCommand = async (m, Fox) => {
  try {
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['lyrics'];
    if (!validCommands.includes(cmd)) return;

    if (!text) {
      return m.reply('Please provide a song name to get the lyrics.');
    }

    m.reply('Searching for lyrics, please wait...');

    const result = await lyricsv2(text).catch(async () => await lyrics(text));

    if (!result) {
      return m.reply('No lyrics found for the provided song.');
    }

    const replyMessage = `
      *✍️ Title:* ${result.title}
      *👨‍🎤 Author:* ${result.author}
      *🔗 Url:* ${result.link}

      *📝 Lyrics:*\n\n ${result.lyrics}
    `.trim();

    m.reply(replyMessage);

  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default lyricsCommand;
