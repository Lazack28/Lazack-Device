import fetch from 'node-fetch'
import moment from 'moment-timezone'

// Store last known commit SHA
let lastCommitSha = null
let isTracking = false

const handler = async (m, { conn, args, usedPrefix, command }) => {
    // Configuration
    const repoOwner = 'Lazack28'
    const repoName = 'Lazack-Device'
    const channelJid = '120363321705798318@newsletter' // Your newsletter channel JID
    const checkInterval = 5 // Minutes between checks

    try {
        // Fetch repository data
        const [repoRes, commitsRes] = await Promise.all([
            fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`),
            fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`)
        ])
        
        if (!repoRes.ok || !commitsRes.ok) throw new Error('Failed to fetch repository data')
        
        const [repoData, commitsData] = await Promise.all([
            repoRes.json(),
            commitsRes.json()
        ])
        
        const latestCommit = commitsData[0]
        
        // Check for new commit
        if (lastCommitSha && lastCommitSha !== latestCommit.sha) {
            // New commit detected - send notification
            const updateMsg = createUpdateMessage(repoData, latestCommit)
            await sendNotification(conn, updateMsg, repoData.html_url, channelJid)
        }
        
        // Update last known commit
        lastCommitSha = latestCommit.sha
        
        // Handle manual check
        if (!args.includes('--subscribe')) {
            const updateMsg = createUpdateMessage(repoData, latestCommit)
            await conn.sendMessage(m.chat, { 
                text: updateMsg,
                contextInfo: {
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: channelJid,
                        newsletterName: 'Lazack Updates',
                        serverMessageId: -1
                    }
                }
            }, { quoted: m })
        }
        
        // Start tracking if requested
        if (args.includes('--subscribe') && !isTracking) {
            isTracking = true
            await conn.reply(m.chat, `🔔 Now tracking repository updates (checking every ${checkInterval} minutes)`, m)
            startTracking(conn, checkInterval, repoOwner, repoName, channelJid)
        }

    } catch (error) {
        console.error('Update Check Error:', error)
        await conn.reply(m.chat, `⚠️ Failed to check updates: ${error.message}`, m)
    }
}

// Start automatic tracking
function startTracking(conn, interval, owner, repo, channelJid) {
    setInterval(async () => {
        try {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`)
            const commits = await res.json()
            const latestCommit = commits[0]
            
            if (lastCommitSha && lastCommitSha !== latestCommit.sha) {
                const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
                const repoData = await repoRes.json()
                const updateMsg = createUpdateMessage(repoData, latestCommit)
                await sendNotification(conn, updateMsg, repoData.html_url, channelJid)
            }
            
            lastCommitSha = latestCommit.sha
        } catch (e) {
            console.error('Auto-update error:', e)
        }
    }, interval * 60 * 1000)
}

// Create formatted update message
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

// Send notification to all group chats
async function sendNotification(conn, message, url, channelJid) {
    const groups = Object.values(conn.chats).filter(chat => chat.id.endsWith('@g.us'))
    
    for (const group of groups) {
        try {
            await conn.sendMessage(group.id, {
                text: message,
                contextInfo: {
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: channelJid,
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
            })
        } catch (e) {
            console.error(`Failed to notify ${group.id}:`, e)
        }
    }
}

// Command configuration
handler.help = ['gitwatch', 'repotrack']
handler.tags = ['tools']
handler.command = ['gitwatch', 'repotrack']
handler.group = true

export default handler