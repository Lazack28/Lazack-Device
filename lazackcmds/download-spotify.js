import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return conn.reply(m.chat, `❀ Please provide the name of a song or artist.`, m)

    try {
        let songInfo = await spotifyxv(text)
        if (!songInfo.length) throw `✧ Song not found.`
        let song = songInfo[0]
        const res = await fetch(`https://api.sylphy.xyz/download/spotify?url=${song.url}&apikey=sylph-96ccb836bc`)

        if (!res.ok) throw `Error fetching data from API, status code: ${res.status}`

        const data = await res.json().catch((e) => { 
            console.error('Error parsing JSON:', e)
            throw "Error parsing JSON response."
        })

        if (!data.data.dl_url) throw "Could not get download link."
        const info = `「✦」Downloading *<${data.data.title}>*\n\n> ✧ Artist » *${data.data.artist}*\n> ✰ Album » *${data.data.album}*\n> ⴵ Duration » *${data.data.duration}*\n> 🜸 Link » ${song.url}`

        await conn.sendMessage(m.chat, { text: info, contextInfo: { forwardingScore: 9999999, isForwarded: false, 
        externalAdReply: {
            showAdAttribution: true,
            containsAutoReply: true,
            renderLargerThumbnail: true,
            title: botname,
            body: dev,
            mediaType: 1,
            thumbnailUrl: data.data.img,
            mediaUrl: song.url,
            sourceUrl: song.url
        }}}, { quoted: m })

        conn.sendMessage(m.chat, { audio: { url: data.data.dl_url }, fileName: `${data.data.title}.mp3`, mimetype: 'audio/mp4', ptt: true }, { quoted: m })

    } catch (e1) {
        m.reply(`${e1.message || e1}`)
    }
}
handler.help = ['spotify', 'music']
handler.tags = ['downloader']
handler.command = ['spotify', 'splay']
handler.group = true

export default handler

async function spotifyxv(query) {
    let token = await tokens()
    let response = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/search?q=' + query + '&type=track',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    const tracks = response.data.tracks.items
    const results = tracks.map((track) => ({
        name: track.name,
        artist: track.artists.map((artist) => artist.name),
        album: track.album.name,
        duration: timestamp(track.duration_ms),
        url: track.external_urls.spotify,
        image: track.album.images.length ? track.album.images[0].url : ''
    }))
    return results
}

async function tokens() {
    const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from('acc6302297e040aeb6e4ac1fbdfd62c3:0e8439a1280a43aba9a5bc0a16f3f009').toString('base64')
        },
        data: 'grant_type=client_credentials'
    })
    return response.data.access_token
}

function timestamp(time) {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

async function getBuffer(url, options) {
    try {
        options = options || {}
        const res = await axios({
            method: 'get',
            url,
            headers: {
                DNT: 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (err) {
        return err
    }
}

async function getTinyURL(text) {
    try {
        let response = await axios.get(`https://tinyurl.com/api-create.php?url=${text}`)
        return response.data
    } catch (error) {
        return text
    }
}
