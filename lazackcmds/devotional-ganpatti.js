import axios from 'axios'

let handler = async (m, { conn }) => {

let msg = `Ganpati Bappa Morya !! 🙇`
let endpoint = `https://shizoapi.onrender.com/api/devotional/ganpati?apikey=shizo`
const response = await fetch(endpoint);
if (response.ok) {
      const imageBuffer = await response.buffer();
      await conn.sendFile(m.chat, imageBuffer, 'shizo.techie.error.png', msg, m, null, rpig);
    } else {
      throw bug
    }
}

handler.tags = ['images']
handler.help = handler.command = ['ganpati', 'ganesh']

export default handler
