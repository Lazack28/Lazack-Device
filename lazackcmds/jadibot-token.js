import fs from 'fs'
import path from 'path'

async function handler(m, { conn, usedPrefix }) {
    try {
        const userDir = path.join(`./${jadi}/`, m.sender.split('@')[0])
        const credsPath = path.join(userDir, 'creds.json')
        
        if (fs.existsSync(credsPath)) {
            // Read and encode token
            const token = Buffer.from(fs.readFileSync(credsPath, 'utf-8')).toString('base64')
            
            // Send security warning first
            await conn.reply(m.chat,
                `🔐 *Token Security Notice*\n\n` +
                `This token allows login to other bots.\n` +
                `❗ *DO NOT SHARE* this with anyone!\n\n` +
                `Your token will be sent in the next message...`,
                m
            )
            
            // Send token in separate message for security
            await conn.reply(m.chat, 
                `🛡️ *Your Bot Token:*\n\n` +
                `${token}\n\n` +
                `⚠️ Keep this private! Anyone with this token can access your account.`,
                m
            )
            
        } else {
            await conn.reply(m.chat,
                `❌ No active token found\n\n` +
                `Use *${usedPrefix}jadibot* to create a new connection token`,
                m
            )
        }
    } catch (error) {
        console.error('Token handler error:', error)
        await conn.reply(m.chat,
            '⚠️ Failed to retrieve token. Please try again later.',
            m
        )
    }
}

handler.help = ['token']
handler.command = ['token', 'mytoken']
handler.tags = ['serbot', 'security']
handler.private = true

export default handler