import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `${emoji} Please enter a YouTube search query.`, m)

  conn.reply(m.chat, wait, m)

  let results = await yts(text)
  let videos = results.all

  let responseText = videos.map(v => {
    if (v.type === 'video') {
      return `📌 Search results for *<${text}>*

🎵 Title » *${v.title}*
📺 Channel » *${v.author.name}*
⏱ Duration » *${v.timestamp}*
📆 Uploaded » *${v.ago}*
👁 Views » *${v.views.toLocaleString()}*
🔗 Link » ${v.url}`
    }
  }).filter(Boolean).join('\n\n' + '━━━━━━━━━━━━━━━━━━━━━━━\n\n')

  conn.sendFile(m.chat, videos[0].thumbnail, 'yt-search.jpg', responseText, fkontak, m)
}

handler.help = ['ytsearch']
handler.tags = ['search']
handler.command = ['ytsearch', 'yts',]
handler.coin = 1

export default handler
