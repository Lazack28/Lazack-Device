

import fetch from "node-fetch"
import yts from 'yt-search'
import axios from "axios"

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `❀ Please enter the name of the music to download.`, m)
    }

    let videoIdToFind = text.match(youtubeRegexID) || null
    let ytplay2 = await yts(videoIdToFind === null ? text : 'https://youtu.be/' + videoIdToFind[1])

    if (videoIdToFind) {
      const videoId = videoIdToFind[1]
      ytplay2 = ytplay2.all.find(item => item.videoId === videoId) || ytplay2.videos.find(item => item.videoId === videoId)
    }

    ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2
    if (!ytplay2 || ytplay2.length == 0) {
      return m.reply('✧ No results found for your search.')
    }

    let { title, thumbnail, timestamp, views, ago, url, author } = ytplay2
    title = title || 'Not found'
    thumbnail = thumbnail || 'Not found'
    timestamp = timestamp || 'Not found'
    views = views || 'Not found'
    ago = ago || 'Not found'
    url = url || 'Not found'
    author = author || 'Not found'

    const formattedViews = formatViews(views)
    const channel = author.name ? author.name : 'Unknown'
    const infoMessage = `「✦」Downloading *<${title || 'Unknown'}>*\n\n> ✧ Channel » *${channel}*\n> ✰ Views » *${formattedViews || 'Unknown'}*\n> ⴵ Duration » *${timestamp || 'Unknown'}*\n> ✐ Published » *${ago || 'Unknown'}*\n> 🜸 Link » ${url}`

    const thumb = (await conn.getFile(thumbnail))?.data
    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    }

    await conn.reply(m.chat, infoMessage, m, JT)

    // Audio command handling
    if (['play', 'yta', 'ytmp3', 'playaudio'].includes(command)) {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/v1/download/youtube/audio?url=${url}&quality=128`)).json()
        const result = api.result.download.url

        if (!result) throw new Error('⚠ The audio link was not generated properly.')

        await conn.sendMessage(
          m.chat,
          {
            audio: { url: result },
            fileName: `${api.result.title}.mp3`,
            mimetype: 'audio/mpeg',
          },
          { quoted: m }
        )
      } catch (e) {
        return conn.reply(
          m.chat,
          '⚠︎ Could not send the audio. This might be because the file is too large or due to a URL generation error. Please try again later.',
          m
        )
      }
    }

    // Video command handling
    else if (['play2', 'ytv', 'ytmp4', 'mp4'].includes(command)) {
      try {
        const response = await fetch(`https://api.vreden.my.id/api/v1/download/youtube/video?url=${url}&quality=360`)
        const json = await response.json()
        await conn.sendFile(m.chat, json.data.url, json.title + '.mp4', title, m)
      } catch (e) {
        return conn.reply(
          m.chat,
          '⚠︎ Could not send the video. This might be because the file is too large or due to a URL generation error. Please try again later.',
          m
        )
      }
    }

    // Invalid command
    else {
      return conn.reply(m.chat, '✧︎ Unrecognized command.', m)
    }

  } catch (error) {
    return m.reply(`⚠︎ An error occurred: ${error}`)
  }
}

handler.command = handler.help = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4', 'playaudio', 'mp4']
handler.tags = ['downloads']
handler.group = true

export default handler

// Function to format view count
function formatViews(views) {
  if (views === undefined) return "Not available"

  if (views >= 1_000_000_000) {
    return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  } else if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  } else if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
  }

  return views.toString()
      }
