import { igdl } from 'ruhend-scraper'

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `${emoji} Please enter a Facebook link.`, m)
  }

  let res;
  try {
    await m.react(rwait) // React with "waiting" emoji
    res = await igdl(args[0])
  } catch (e) {
    return conn.reply(m.chat, `${msm} Failed to fetch data. Please check the link.`, m)
  }

  let result = res.data
  if (!result || result.length === 0) {
    return conn.reply(m.chat, `${emoji2} No results found.`, m)
  }

  let data
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)")
  } catch (e) {
    return conn.reply(m.chat, `${msm} Error processing the data.`, m)
  }

  if (!data) {
    return conn.reply(m.chat, `${emoji2} No suitable resolution found.`, m)
  }

  let video = data.url
  try {
    await conn.sendMessage(
      m.chat,
      {
        video: { url: video },
        caption: `${emoji} Here you go ฅ^•ﻌ•^ฅ.`,
        fileName: 'fb.mp4',
        mimetype: 'video/mp4'
      },
      { quoted: m }
    )
    await m.react(done)
  } catch (e) {
    await m.react(error)
    return conn.reply(m.chat, `${msm} Failed to send the video.`, m)
  }
}

handler.help = ['facebook', 'fb']
handler.tags = ['downloads']
handler.command = ['facebook', 'fb']
handler.group = true
handler.coin = 2

export default handler
