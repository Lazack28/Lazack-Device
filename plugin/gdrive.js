import pkg from "nayan-media-downloader";
const { GDLink } = pkg;

const gdriveDownload = async (m, Fox) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['gdrive', 'gd', 'gddownload'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a Google Drive URL.');

    try {
      await m.React('🕘');

      const gdriveUrl = text;
      const gdriveInfo = await GDLink(gdriveUrl);

      if (gdriveInfo && gdriveInfo.status && gdriveInfo.data) {
        const mediaUrl = gdriveInfo.data;
        const caption = `> ©ʀᴇᴅ-ꜰᴏx-ᴍᴅ`;

        // Inferring the file type based on the file extension
        const extension = mediaUrl.split('.').pop().toLowerCase();

        // Send the media using Fox.sendMedia
        await Fox.sendMedia(m.from, mediaUrl, extension, caption, m);

        await m.React('✅');
      } else {
        throw new Error('Invalid response from Google Drive.');
      }
    } catch (error) {
      console.error('Error downloading Google Drive file:', error.message);
      m.reply('Error downloading Google Drive file.');
      await m.React('❌');
    }
  }
};

export default gdriveDownload;
