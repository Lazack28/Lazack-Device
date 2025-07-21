const handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
  if (!args[0]) return conn.reply(m.chat, `${emoji} Please enter a country code prefix to execute this command.`, m);

  if (isNaN(args[0])) return conn.reply(m.chat, `${emoji} Please enter a valid country prefix.\nExample: ${usedPrefix + command} 212`, m);

  const prefix = args[0].replace(/[+]/g, '');
  const filteredNumbers = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(prefix));
  const bot = global.db.data.settings[conn.user.jid] || {};

  if (filteredNumbers.length === 0) return m.reply(`${emoji2} No members found with the prefix +${prefix}.`);

  const numberList = filteredNumbers.map(v => '⭔ @' + v.replace(/@.+/, ''));
  const delay = time => new Promise(res => setTimeout(res, time));

  switch (command) {
    case 'listanum':
    case 'listnum':
      conn.reply(
        m.chat,
        `${emoji} List of numbers with prefix +${prefix} in this group:\n\n` + numberList.join`\n`,
        m,
        { mentions: filteredNumbers }
      );
      break;

    case 'kicknum':
      if (!bot.restrict) return conn.reply(m.chat, `${emoji} This command is disabled by the bot owner.`, m);
      if (!isBotAdmin) return m.reply(`${emoji2} The bot is not an admin.`);

      await conn.reply(m.chat, `♻️ Starting to remove members...`, m);

      const ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';
      for (const user of filteredNumbers) {
        const errorMsg = `@${user.split('@')[0]} has already been removed or left the group.`;
        if (
          user !== ownerGroup &&
          user !== global.conn.user.jid &&
          user !== global.owner + '@s.whatsapp.net' &&
          user !== isSuperAdmin &&
          isBotAdmin &&
          bot.restrict
        ) {
          await delay(2000);
          const response = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
          if (response[0].status === '404') {
            m.reply(errorMsg, m.chat, { mentions: conn.parseMention(errorMsg) });
          }
          await delay(10000);
        } else {
          return m.reply(m.chat, `${msm} An error occurred.`, m);
        }
      }
      break;
  }
};

handler.command = ['kicknum', 'listnum', 'listanum'];
handler.group = true;
handler.botAdmin = true;
handler.admin = true;
handler.fail = null;

export default handler;
