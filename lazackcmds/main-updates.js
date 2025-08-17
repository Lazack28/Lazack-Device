import fetch from 'node-fetch'
import moment from 'moment-timezone'

// Configuration
const config = {
    repoOwner: 'Lazack28',
    repoName: 'Lazack-Device',
    channelJid: '120363321705798318@newsletter', // Your newsletter channel JID
    checkInterval: 5, // Minutes between checks
    notificationTarget: '120363305007891497@g.us' // YOUR bot's number or specific chat
}

// State tracking
let lastCommitSha = null
let isTracking = false
let trackingInterval = null

const handler = async (m, { conn, args }) => {
    try {
        // Fetch latest repository data
        const [repoData, latestCommit] = await getRepoData()
        
        // Check for new commit
        if (lastCommitSha && lastCommitSha !== latestCommit.sha) {
            await sendUpdateNotification(conn, repoData, latestCommit)
        }
        
        // Update last known commit
        lastCommitSha = latestCommit.sha
        
        // Handle manual check
        if (!args.includes('--subscribe')) {
            const updateMsg = createUpdateMessage(repoData, latestCommit)
            await conn.sendMessage(m.chat, { 
                text: updateMsg,
                contextInfo: createContextInfo(repoData.html_url)
            }, { quoted: m })
        }
        
        // Start tracking if requested
        if (args.includes('--subscribe') && !isTracking) {
            isTracking = true
            await m.reply(`🔔 Now tracking repository updates (checking every ${config.checkInterval} minutes)`)
            startTracking(conn)
        }

        // Stop tracking if requested
        if (args.includes('--unsubscribe') && isTracking) {
            stopTracking()
            await m.reply('🔕 Stopped tracking repository updates')
        }

    } catch (error) {
        console.error('Update Check Error:', error)
        await m.reply(`⚠️ Failed to check updates: ${error.message}`)
    }
}

// Helper functions
async function getRepoData() {
    const [repoRes, commitsRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${config.repoOwner}/${config.repoName}`),
        fetch(`https://api.github.com/repos/${config.repoOwner}/${config.repoName}/commits`)
    ])
    if (!repoRes.ok || !commitsRes.ok) throw new Error('Failed to fetch repository data')
    
    const [repoData, commitsData] = await Promise.all([
        repoRes.json(),
        commitsRes.json()
    ])
    
    return [repoData, commitsData[0]]
}

function startTracking(conn) {
    trackingInterval = setInterval(async () => {
        try {
            const [repoData, latestCommit] = await getRepoData()
            if (lastCommitSha && lastCommitSha !== latestCommit.sha) {
                await sendUpdateNotification(conn, repoData, latestCommit)
            }
            lastCommitSha = latestCommit.sha
        } catch (e) {
            console.error('Auto-update error:', e)
        }
    }, config.checkInterval * 60 * 1000)
}

function stopTracking() {
    clearInterval(trackingInterval)
    isTracking = false
    trackingInterval = null
}

async function sendUpdateNotification(conn, repoData, commit) {
    const updateMsg = createUpdateMessage(repoData, commit)
    await conn.sendMessage(config.notificationTarget, {
        text: updateMsg,
        contextInfo: createContextInfo(repoData.html_url)
    })
}

function createUpdateMessage(repoData, commit) {
    return `🚀 *New Update Available!*\n\n` +
           `📦 Repository: ${repoData.full_name}\n` +
           `⭐ Stars: ${repoData.stargazers_count}\n` +
           `🔄 Last Updated: ${moment(repoData.pushed_at).tz('Africa/Nairobi').format('DD/MM/YY HH:mm:ss')}\n\n` +
           `🔨 Latest Commit:\n` +
           `• Message: ${commit.commit.message.split('\n')[0]}\n` +
           `• Author: ${commit.commit.author.name}\n` +
           `• Date: ${moment(commit.commit.author.date).tz('Africa/Nairobi').format('DD/MM/YY HH:mm:ss')}\n\n` +
           `🔗 View Changes: ${repoData.html_url}/commits`
}

function createContextInfo(url) {
    return {
        forwardedNewsletterMessageInfo: {
            newsletterJid: config.channelJid,
            newsletterName: 'Lazack Updates',
            serverMessageId: -1
        },
        externalAdReply: {
            title: 'New Repository Update!',
            body: 'Click to view changes',
            thumbnailUrl: 'https://lazackorganisation.my.id/mtaju.jpg',
            sourceUrl: url,
            mediaType: 1
        }
    }
}

// Command configuration
handler.help = ['gitwatch', 'repotrack']
handler.tags = ['tools']
handler.command = ['gitwatch', 'repotrack']
handler.group = true

export default handler