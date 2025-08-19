import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { text }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Please enter what you want to search on Wikipedia.`, m)
    
    try {
        const response = await axios.get(`https://en.wikipedia.org/wiki/${text}`)
        const $ = cheerio.load(response.data)
        let title = $('#firstHeading').text().trim()
        let content = $('#mw-content-text > div.mw-parser-output').find('p').text().trim()
        
        m.reply(`▢ *Wikipedia*

‣ Searched : ${title}

${content}`)
    } catch (e) {
        m.reply(`${emoji2} No results found.`)
    }
}

handler.help = ['wikipedia']
handler.tags = ['tools']
handler.command = ['wiki', 'wikipedia']

export default handler
