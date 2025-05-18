import axios from 'axios'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'
const baileys = (await import('@whiskeysockets/baileys')).default // Adjust according to your Baileys version

// Upload media buffer to Uguu.se and return URL
async function uploadToUguu(buffer) {
  let { ext } = await fileTypeFromBuffer(buffer)
  let filename = `upload.${ext}`
  let form = new FormData()
  form.append('files[]', buffer, { filename })
  let { data } = await axios.post('https://uguu.se/upload.php', form, {
    headers: form.getHeaders()
  })
  if (!data.files || !data.files[0]) throw 'Failed to upload to Uguu'
  return data.files[0].url
}

// Send status with mentions to group members
async function sendMentionStatus(jidList, content) {
  let colors = ['#7ACAA7', '#6E257E', '#5796FF', '#7E90A4', '#736769', '#57C9FF', '#25C3DC', '#FF7B6C', '#55C265', '#FF898B', '#8C6991', '#C69FCC', '#B8B226', '#EFB32F', '#AD8774', '#792139', '#C1A03F', '#8FA842', '#A52C71', '#8394CA', '#243640']
  let fonts = [0, 1, 2, 6, 7, 8, 9, 10]
  let mentionedUsers = []

  for (let id of jidList) {
    let group = await conn.groupMetadata(id)
    mentionedUsers.push(...group.participants.map(u => conn.decodeJid(u.id)))
  }

  let message = await conn.sendMessage('status@broadcast', content, {
    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    font: fonts[Math.floor(Math.random() * fonts.length)],
    statusJidList: mentionedUsers,
    additionalNodes: [
      {
        tag: 'meta',
        attrs: {},
        content: [
          {
            tag: 'mentioned_users',
            attrs: {},
            content: jidList.map(jid => ({
              tag: 'to',
              attrs: { jid },
              content: undefined
            }))
          }
        ]
      }
    ]
  })

  // Relay the status mention back to each group
  jidList.forEach(id => {
    conn.relayMessage(id, {
      groupStatusMentionMessage: {
        message: {
          protocolMessage: {
            key: message.key,
            type: 25
          }
        }
      }
    }, {
      userJid: conn.user.jid,
      additionalNodes: [
        {
          tag: 'meta',
          attrs: { is_status_mention: 'true' },
          content: undefined
        }
      ]
    })
  })
}

// Command handler
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text && command !== 'upsw') throw 'Please enter some text or reply to a media message.'
  
  let quoted = m.quoted ? m.quoted : m
  let mime = (quoted.msg || quoted).mimetype || ''
  let media, link

  if (mime) {
    media = await quoted.download()
    link = await uploadToUguu(media)
  }

  let content = {}

  if (command === 'upswimage' && mime.startsWith('image/')) {
    content = { image: { url: link }, caption: text || '' }
  } else if (command === 'upswvideo' && mime.startsWith('video/')) {
    content = { video: { url: link }, caption: text || '' }
  } else if (command === 'upswaudio' && mime.startsWith('audio/')) {
    content = { audio: { url: link } }
  } else if (command === 'upswtext') {
    content = { text: text }
  } else if (command === 'upsw') {
    return m.reply(`Which type do you want to post?
.upswimage <caption> - for image
.upswvideo <caption> - for video
.upswaudio - for audio
.upswtext <text> - for text`)
  } else {
    throw 'Unsupported file type or command'
  }

  await sendMentionStatus([m.chat], content)
}

// Command configuration
handler.help = ['sw', 'upsw']
handler.tags = ['owner']
handler.command = /^(sw|upsw)$/i
handler.owner = true

export default handler
