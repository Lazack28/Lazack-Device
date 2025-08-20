import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

// Main handler function
var handler = m => m
handler.all = async function (m) {
    // Global utility function to fetch buffers from URLs
    global.getBuffer = async function getBuffer(url, options) {
        try {
            options = options || {}
            const res = await axios({
                method: "get",
                url,
                headers: {
                    'DNT': 1,
                    'User-Agent': 'GoogleBot',
                    'Upgrade-Insecure-Request': 1
                },
                ...options,
                responseType: 'arraybuffer'
            })
            return res.data
        } catch (e) {
            console.error(`Buffer Fetch Error: ${e}`)
            return null
        }
    }

    // Bot owner/creator information
    global.creator = 'wa.me/255734980103'
    global.botUser = `${conn.user.jid.split('@')[0]}`
    
    // Channel and group names
    global.channelName = '=͟͟͞❀ Lazackorganisation ⏤͟͟͞͞★'
    global.channelName2 = '=͟͟͞❀ silvatech ⏤͟͟͞͞★'
    global.groupName = 'ᰔᩚ lazack28 ❀'
    global.communityName = 'ᰔᩚ javascript users ❀'
    
    // Ready message and profile picture
    global.ready = '❀ *Here you go ฅ^•ﻌ•^ฅ*'
    global.profilePhoto = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://lazackorganisation.my.id/mtaju.jpg')

    // Channel lists and random channel selection
    global.channelIdList = ["120363321705798318@newsletter", "120363321705798318@newsletter"]
    global.channelNameList = ["Lazackorganisation", "LzcTeam"]
    global.randomChannel = await getRandomChannel()

    // Date and time formatting
    global.d = new Date(new Date + 3600000)
    global.locale = 'en'
    global.day = d.toLocaleDateString(locale, { weekday: 'long' })
    global.date = d.toLocaleDateString('en', { day: 'numeric', month: 'numeric', year: 'numeric' })
    global.month = d.toLocaleDateString('en', { month: 'long' })
    global.year = d.toLocaleDateString('en', { year: 'numeric' })
    global.time = d.toLocaleString('en-US', { 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true 
    })

    // Status icons
    global.rwait = '🕒'
    global.done = '✅'
    global.error = '✖️'
    global.msg = '⚠︎'

    // Emoji collections
    global.emoji = '❀'
    global.emoji2 = '✧'
    global.emoji3 = '✦'
    global.emoji4 = '❍'
    global.emoji5 = '✰'
    global.emojis = pickRandom([emoji, emoji2, emoji3, emoji4])

    // Wait messages
    global.wait = '❍ Wait a moment, I am slow...'
    global.waitt = global.wait
    global.waittt = global.wait
    global.waitttt = global.wait

    // Social media links
    const channel = 'https://github.com/lazack28'
    const community = 'https://github.com/lazack28'
    const web = 'https://github.com/lazack28'
    const web2 = 'https://github.com/lazack28/Lazack-Device'
    const web3 = 'support.lazackorganisation.my.id'
    global.socials = pickRandom([channel, community, web, web2, web3])

    // Database handling for random images
    const category = "image"
    const db = './src/database/db.json'

    let db_
    try {
        db_ = JSON.parse(fs.readFileSync(db))
        if (!db_.links || !db_.links[category] || !Array.isArray(db_.links[category]) || db_.links[category].length === 0) {
            throw new Error(`No links found for category: ${category}`)
        }
        
        const random = Math.floor(Math.random() * db_.links[category].length)
        const randomlink = db_.links[category][random]
        const response = await fetch(randomlink)
        const rimg = await response.buffer()
        global.icons = rimg
    } catch (e) {
        console.error("Database Error:", e)
        global.icons = null
    }

    // Time-based greeting
    const now = new Date()
    const hour = now.getHours()
    let greeting
    switch (true) {
        case hour >= 0 && hour < 3:
        case hour >= 18 && hour <= 23:
            greeting = 'Good Night 🌃'; break
        case hour >= 3 && hour < 7:
            greeting = 'Good Morning 🌄'; break
        case hour >= 7 && hour < 10:
            greeting = 'Good Morning 🌅'; break
        case hour >= 10 && hour < 14:
            greeting = 'Good Day 🌤'; break
        case hour >= 14 && hour < 18:
            greeting = 'Good Afternoon 🌆'; break
        default:
            greeting = 'Hello 👋'; break
    }
    global.greeting = greeting

    // User information
    global.name = m.pushName || 'Anonymous'
    global.taguser = '@' + m.sender.split("@")[0]
    const more = String.fromCharCode(8206)
    global.readMore = more.repeat(850)

    // Sticker pack information
    global.packsticker = `°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\nᰔᩚ User: ${name}\n❀ Bot: ${botname}\n✦ Date: ${date}\nⴵ Time: ${time}`
    global.packsticker2 = `\n°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\n\n${dev}`

    // Fake contact information
    global.fakeContact = {
        key: {
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: `@g.us` } : {})
        },
        message: {
            'contactMessage': {
                'displayName': `${name}`,
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${name},;;;\nFN:${name},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
                'jpegThumbnail': null, 
                thumbnail: null, 
                sendEphemeral: true
            }
        }
    }

    // Fake forwarded message context
    global.fake = {
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: randomChannel.id,
                newsletterName: randomChannel.name,
                serverMessageId: -1
            }
        }
    }

    // Random icon selection
    global.icon = pickRandom([
        'https://lazackorganisation.my.id/mtaju.jpg',
    ])

    // Channel message context
    global.rchannel = {
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: randomChannel.id,
                serverMessageId: 100,
                newsletterName: randomChannel.name,
            },
            externalAdReply: {
                showAdAttribution: true,
                title: packname,
                body: dev,
                mediaUrl: null,
                description: null,
                previewType: "PHOTO",
                thumbnailUrl: icon,
                sourceUrl: socials,
                mediaType: 1,
                renderLargerThumbnail: false
            },
        }
    }
}

export default handler

// Helper function to pick random item from array
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

// Function to get random channel from lists
async function getRandomChannel() {
    const randomIndex = Math.floor(Math.random() * channelIdList.length)
    const id = channelIdList[randomIndex]
    const name = channelNameList[randomIndex]
    return { id, name }
}