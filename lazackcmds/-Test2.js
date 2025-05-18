let handler = async (m, { text, conn, isOwner, command }) => {
  if (!isOwner) return m.reply('Only the owner can use this command.');

  const fancyLetters = {
    a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
    h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
    o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
    v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
    '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
    '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
  };

  const convert = str =>
    str.toLowerCase().split('').map(c => c === ' ' ? '―' : fancyLetters[c] || c).join('');

  if (!text) {
    return m.reply(
      'Example usage:\n' +
      `.autoreactch https://whatsapp.com/channel/abc/123 ❤️WELCOME\n` +
      `.autoreactch off https://whatsapp.com/channel/abc/123\n` +
      `.autoreactch offall`
    );
  }

  if (text.toLowerCase() === 'offall') {
    global.autoreactDB = {};
    if (global.autoreactInterval) clearInterval(global.autoreactInterval);
    global.autoreactInterval = null;
    return m.reply('❌ Auto reaction turned off for all channels.');
  }

  if (text.toLowerCase().startsWith('off ')) {
    const url = text.split(' ')[1];
    const channelId = (url || '').split('/')[4];
    if (!channelId || !global.autoreactDB?.[channelId]) {
      return m.reply('No auto reaction found for this channel.');
    }
    delete global.autoreactDB[channelId];
    if (Object.keys(global.autoreactDB).length === 0 && global.autoreactInterval) {
      clearInterval(global.autoreactInterval);
      global.autoreactInterval = null;
    }
    return m.reply(`❌ Auto reaction turned off for channel ${channelId}.`);
  }

  const [link, ...emojiWords] = text.trim().split(' ');
  const [_, __, ___, ____, channelId, messageId] = link.split('/');
  const startId = parseInt(messageId);

  if (!channelId || isNaN(startId)) return m.reply('Invalid or incomplete channel link.');
  const emojiText = emojiWords.join(' ').trim();
  if (!emojiText) return m.reply('Please provide an emoji or text.');

  const emoji = convert(emojiText);

  global.autoreactDB = global.autoreactDB || {};
  global.autoreactDB[channelId] = {
    lastId: startId,
    emoji
  };

  if (global.autoreactInterval) clearInterval(global.autoreactInterval);
  global.autoreactInterval = setInterval(() => {
    for (const id in global.autoreactDB) {
      conn.sendMessage(id, { react: { text: global.autoreactDB[id].emoji, key: null } }).catch(() => {});
    }
  }, 10000);

  m.reply(`✅ Auto reaction activated with *${emoji}* for channel ${channelId}. Starting from message ID: ${startId}`);
};

handler.tags = ['owner'];
handler.help = ['autoreactch <link> <emoji/text>', 'autoreactch off <link>', 'autoreactch offall'];
handler.command = /^autoreactch$/i;
handler.owner = true;

export default handler;
