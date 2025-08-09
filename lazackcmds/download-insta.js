import { igdl } from 'ruhend-scraper';

const handler = async (m, { args, conn }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `${emoji} Please enter an Instagram link.`, m);
  }

  try {
    await m.react(rwait);
    const res = await igdl(args[0]);
    const data = res.data;

    for (let media of data) {
      await conn.sendFile(m.chat, media.url, 'instagram.mp4', `${emoji} Here you go ฅ^•ﻌ•^ฅ.`, m);
      await m.react(done);
    }
  } catch (e) {
    return conn.reply(m.chat, `${msm} An error occurred.`, m);
    await m.react(error);
  }
};

handler.command = ['instagram', 'ig'];
handler.tags = ['downloads'];
handler.help = ['instagram', 'ig'];
handler.group = true;
handler.register = true;
handler.coin = 2;

export default handler;