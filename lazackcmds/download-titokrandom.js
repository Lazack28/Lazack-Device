import axios from 'axios'

const query = [
  'story wa',
  'story sad',
  'video fun',
  'story wa galau',
  'story wa sindiran',
  'story wa bahagia',
  'story wa lirik lagu overlay',
  'story wa lirik lagu',
  'video viral'
]

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
  m.reply(wait)
  tiktoks(`${query.getRandom()}`).then(a => {
    let cap = a.title
    conn.sendMessage(m.chat, {video: {url: a.no_watermark}, caption: cap}, {quoted: m})
  }).catch(err => {
    m.reply(error)
  })
}
handler.help = ['tiktokrandom']
handler.tags = ['downloads']
handler.command = ['ttrandom', 'tiktokrandom']
handler.limit = true 
handler.group = true;
handler.register = true;
handler.coin = 2;

export default handler

async function tiktoks(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/feed/search',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: {
          keywords: query,
          count: 10,
          cursor: 0,
          HD: 1
        }
      });
      const videos = response.data.data.videos;
      if (videos.length === 0) {
        reject("No videos found.");
      } else {
        const gywee = Math.floor(Math.random() * videos.length);
        const videorndm = videos[gywee]; 

        const result = {
          title: videorndm.title,
          cover: videorndm.cover,
          origin_cover: videorndm.origin_cover,
          no_watermark: videorndm.play,
          watermark: videorndm.wmplay,
          music: videorndm.music
        };
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  });
}