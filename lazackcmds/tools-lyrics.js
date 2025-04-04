import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
  
  if (!teks) {
    return conn.reply(m.chat, '🔍 Please enter the song name to get the lyrics! Usage: *lyrics <song name>*', m)
  }
  
  try {
    // Fetch song lyrics using the API
    let res = await fetch(global.API('https://some-random-api.com', '/lyrics', { title: teks }))
    if (!res.ok) throw await res.text()
    
    let json = await res.json()
    
    if (!json.thumbnail.genius) throw '❌ Sorry, I couldn’t find any lyrics for this song!'
    
    // Sending the formatted result to the user
    conn.sendFile(
      m.chat,
      json.thumbnail.genius,
      null,
      `🎵 *Song Lyrics* 🎶

▢ *Title:* ${json.title}
*Artist:* ${json.author}

🔗 *Link:* [Genius Lyrics](https://genius.com/${json.title.replace(/ /g, '-').toLowerCase()}-lyrics)

📜 *Lyrics:*
${json.lyrics}

Hope you enjoy the music! 🎧 🎶`,
      m
    )
    m.react('✅')
  } catch (e) {
    // Error handling
    console.error(e)
    m.react('❌')
    conn.reply(m.chat, 'Sorry, I couldn’t fetch the lyrics. Please try again later!', m)
  }
}

handler.help = ['lyrics']
handler.tags = ['tools']
handler.command = ['letra', 'lyrics', 'letras']

export default handler
