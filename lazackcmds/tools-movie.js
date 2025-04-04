import fetch from 'node-fetch'

let imdbHandler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, '🎬 Please provide a movie title! Usage: *imdb <movie name>*', m)
  }

  try {
    let res = await fetch(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(text)}`)

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`)
    }

    let json = await res.json()

    console.log('JSON response:', json)

    let ratings = json.ratings.map(rating => `• *${rating.source}:* ${rating.value}`).join('\n')

    let movieInfo = `🎥 *Movie Information:*\n
    • *Title:* ${json.title}
    • *Year:* ${json.year}
    • *Seasons:* ${json.totalseasons || 'N/A'}
    • *Rated:* ${json.rated}
    • *Released:* ${json.released}
    • *Runtime:* ${json.runtime || 'N/A'}
    • *Genres:* ${json.genres.join(', ') || 'N/A'}
    • *Director:* ${json.director || 'N/A'}
    • *Writer:* ${json.writer || 'N/A'}
    • *Actors:* ${json.actors || 'N/A'}
    • *Plot:* ${json.plot || 'N/A'}
    • *Languages:* ${json.languages || 'N/A'}
    • *Country:* ${json.country || 'N/A'}
    • *Awards:* ${json.awards || 'N/A'}
    • *Metascore:* ${json.metascore || 'N/A'}
    • *Rating:* ${json.rating || 'N/A'}
    • *Votes:* ${json.votes || 'N/A'}
    • *IMDB ID:* ${json.imdbid}
    • *Type:* ${json.type}
    • *DVD:* ${json.dvd || 'N/A'}
    • *Box Office:* ${json.boxoffice || 'N/A'}
    • *Production:* ${json.production || 'N/A'}
    • *Website:* ${json.website || 'N/A'}

    🎬 *Ratings:*
    ${ratings || 'No ratings available'}`

    // Send the movie poster along with the formatted information
    await conn.sendFile(m.chat, json.poster, 'poster.jpg', movieInfo, m)
  } catch (error) {
    console.error(error)
    m.reply('❌ Sorry, I couldn’t find the movie details. Please try again later!', m)
  }
}

imdbHandler.help = ['imdb']
imdbHandler.tags = ['tools']
imdbHandler.command = /^(imdb|movie)$/i

export default imdbHandler
