import acrcloud from 'acrcloud'

// Initialize ACRCloud with your credentials
let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m, { conn, usedPrefix, command }) => {
  // Use the quoted message if available, otherwise the current message
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''

  // Only proceed if it's an audio or video
  if (/video|audio/.test(mime)) {
    let buffer = await q.download() // Download the media
    let { status, metadata } = await acr.identify(buffer) // Identify the music

    if (status.code !== 0) throw status.msg // Throw error if identification failed

    // Extract music info
    let { title, artists, album, genres, release_date } = metadata.music[0]

    // Build the reply message
    let txt = '╭─⬣「 *Whatmusic Tools* 」⬣\n'
    txt += `│  ≡◦ *🍭 Title:* ${title}${artists ? `\n│  ≡◦ *👤 Artist:* ${artists.map(v => v.name).join(', ')}` : ''}`
    txt += `${album ? `\n│  ≡◦ *📚 Album:* ${album.name}` : ''}${genres ? `\n│  ≡◦ *🪴 Genre:* ${genres.map(v => v.name).join(', ')}` : ''}\n`
    txt += `│  ≡◦ *🕜 Release Date:* ${release_date}\n`
    txt += `╰─⬣`

    conn.reply(m.chat, txt, m)
  } else {
    return conn.reply(m.chat, `${emoji} Please tag a short audio or video with the command *${usedPrefix + command}* to identify the music.`, m)
  }
}

handler.help = ['whatmusic <audio/video>']
handler.tags = ['tools']
handler.command = ['shazam', 'whatmusic']
//handler.limit = 1
handler.register = true 

export default handler
