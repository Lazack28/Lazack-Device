import { smsg } from './lib/simple.js'
import { format } from 'util' 
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fetch from 'node-fetch'

const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

export async function handler(chatUpdate) {
    // Initialize variables
    this.msgqueque = this.msgqueque || []
    this.uptime = this.uptime || Date.now()
    
    // Get connection
    const conn = this
    
    // Define opts if not defined
    const opts = global.opts || {
        self: false,
        autoread: false,
        restrict: false,
        noprint: false,
        swonly: false,
        nyimak: false,
        queque: false
    }
    
    if (!chatUpdate)
        return
        
    // Push messages to queue
    if (this.pushMessage) {
        this.pushMessage(chatUpdate.messages).catch(console.error)
    }
    
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m)
        return
        
    // Load database if not loaded
    if (global.db && global.db.data == null)
        await global.loadDatabase()
        
    // Define currency
    const moneda = global.moneda || 'coins'
    
    try {
        m = smsg(this, m) || m
        if (!m)
            return
            
        // Handle status broadcasts
        if (m.chat === 'status@broadcast') {
            await this.readMessages([m.key]).catch(() => {})
            console.log(`Viewed status from: ${m.sender}`)
            return
        }
        
        // Initialize message properties
        m.exp = 0
        m.coin = false
        
        console.log('════════════════════════════')
        console.log('📨 MESSAGE RECEIVED')
        console.log('════════════════════════════')
        console.log('Chat:', m.chat)
        console.log('Sender:', m.sender)
        console.log('Text:', m.text || '(no text)')
        console.log('Is Group:', m.isGroup)
        console.log('════════════════════════════')
        
        try {
            // Initialize user data
            if (global.db && global.db.data) {
                let user = global.db.data.users[m.sender]
                if (typeof user !== 'object') {
                    global.db.data.users[m.sender] = {}
                    user = global.db.data.users[m.sender]
                }
                
                if (user) {
                    // Initialize default values
                    if (!isNumber(user.exp)) user.exp = 0
                    if (!isNumber(user.coin)) user.coin = 10
                    if (!isNumber(user.level)) user.level = 0
                    if (!('registered' in user)) user.registered = false
                    if (!('premium' in user)) user.premium = false
                    if (!('banned' in user)) user.banned = false
                    if (!('name' in user)) user.name = m.pushName || 'User'
                }
                
                // Initialize chat data
                let chat = global.db.data.chats[m.chat]
                if (typeof chat !== 'object') {
                    global.db.data.chats[m.chat] = {}
                    chat = global.db.data.chats[m.chat]
                }
                
                if (chat) {
                    if (!('isBanned' in chat)) chat.isBanned = false
                    if (!('welcome' in chat)) chat.welcome = true
                    if (!('detect' in chat)) chat.detect = true
                    if (!('antiLink' in chat)) chat.antiLink = true
                }
            }
        } catch (e) {
            console.error('Database init error:', e)
        }

        // Get user from database
        let _user = global.db && global.db.data && global.db.data.users ? global.db.data.users[m.sender] : null

        // Check user permissions
        const detectwhat = m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net'
        const isROwner = global.owner ? [...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + detectwhat).includes(m.sender) : false
        const isOwner = isROwner || m.fromMe
        const isMods = isROwner || (global.mods ? global.mods.map(v => v.replace(/[^0-9]/g, '') + detectwhat).includes(m.sender) : false)
        const isPrems = isROwner || (global.prems ? global.prems.map(v => v.replace(/[^0-9]/g, '') + detectwhat).includes(m.sender) : false) || (_user && _user.premium == true)

        // Skip Baileys messages
        if (m.isBaileys) return
        if (opts['nyimak']) return
        if (!isROwner && opts['self']) return
        if (opts['swonly'] && m.chat !== 'status@broadcast') return
        
        // Ensure text is string
        if (typeof m.text !== 'string')
            m.text = ''

        // Add random exp
        m.exp += Math.ceil(Math.random() * 10)

        // Get prefix
        const prefix = conn.prefix || global.prefix || '!'
        
        // Check if message starts with prefix
        if (m.text && m.text.startsWith(prefix)) {
            console.log('✅ COMMAND DETECTED!')
            console.log('Prefix:', prefix)
            
            // Extract command and arguments
            const usedPrefix = prefix
            const noPrefix = m.text.slice(prefix.length).trim()
            const [command, ...args] = noPrefix.split(/\s+/).filter(v => v)
            const cmd = (command || '').toLowerCase()
            const text = args.join(' ')
            
            console.log('Command:', cmd)
            console.log('Args:', args)
            console.log('Text:', text)
            
            // Skip if no command
            if (!cmd) return
            
            // Store command globally
            global.comando = cmd
            
            // Check if user is banned
            if (_user && _user.banned && !isROwner) {
                m.reply(`《✦》You are banned, you cannot use commands in this bot!\n\n${_user.bannedReason ? `✰ *Reason:* ${_user.bannedReason}` : '✰ *Reason:* Not Specified'}`)
                return
            }
            
            // Check if chat is banned
            const chat = global.db && global.db.data && global.db.data.chats ? global.db.data.chats[m.chat] : null
            if (chat && chat.isBanned && !isROwner) {
                m.reply(`《✦》This chat is banned from using the bot!`)
                return
            }
            
            // Plugin directory
            const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
            
            // Check if plugins are loaded
            if (!global.plugins || Object.keys(global.plugins).length === 0) {
                console.error('❌ No plugins loaded!')
                m.reply('❌ No plugins loaded. Please wait...')
                return
            }
            
            console.log(`🔍 Searching ${Object.keys(global.plugins).length} plugins for command: ${cmd}`)
            
            // Iterate through plugins
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin || plugin.disabled)
                    continue
                    
                console.log(`   Checking plugin: ${name}`)
                
                // Check if command matches
                let isAccept = false
                
                if (plugin.command instanceof RegExp) {
                    isAccept = plugin.command.test(cmd)
                } else if (Array.isArray(plugin.command)) {
                    isAccept = plugin.command.some(c => {
                        if (c instanceof RegExp) return c.test(cmd)
                        if (typeof c === 'string') return c.toLowerCase() === cmd
                        return false
                    })
                } else if (typeof plugin.command === 'string') {
                    isAccept = plugin.command.toLowerCase() === cmd
                }
                
                if (!isAccept) continue
                
                console.log(`✅ Found matching plugin: ${name}`)
                m.plugin = name
                m.isCommand = true
                
                // Check permissions
                let failReason = null
                
                if (plugin.rowner && !isROwner) failReason = 'rowner'
                else if (plugin.owner && !isOwner) failReason = 'owner'
                else if (plugin.mods && !isMods) failReason = 'mods'
                else if (plugin.premium && !isPrems) failReason = 'premium'
                else if (plugin.group && !m.isGroup) failReason = 'group'
                else if (plugin.private && m.isGroup) failReason = 'private'
                else if (plugin.register == true && _user && !_user.registered) failReason = 'unreg'
                
                // Check admin permissions if in group
                if (m.isGroup) {
                    try {
                        const groupMetadata = await this.groupMetadata(m.chat).catch(() => null) || {}
                        const participants = groupMetadata.participants || []
                        const user = participants.find(p => p.id === m.sender) || {}
                        const bot = participants.find(p => p.id === conn.user.jid) || {}
                        
                        const isRAdmin = user?.admin === "superadmin"
                        const isAdmin = isRAdmin || user?.admin === "admin"
                        const isBotAdmin = !!bot?.admin
                        
                        if (plugin.admin && !isAdmin) failReason = 'admin'
                        if (plugin.botAdmin && !isBotAdmin) failReason = 'botAdmin'
                    } catch (e) {
                        console.error('Error checking group permissions:', e)
                    }
                }
                
                // Handle permission failure
                if (failReason) {
                    console.log(`❌ Permission denied: ${failReason}`)
                    const fail = plugin.fail || global.dfail
                    if (fail) {
                        fail(failReason, m, this, cmd)
                    } else {
                        m.reply(`❌ You don't have permission to use this command (${failReason})`)
                    }
                    continue
                }
                
                // Check level requirement
                if (plugin.level > (_user?.level || 0)) {
                    m.reply(`❮✦❯ Required level: *${plugin.level}*\n• Your current level: *${_user?.level || 0}*`)
                    continue
                }
                
                // Check coin requirement
                if (plugin.coin && _user && _user.coin < plugin.coin) {
                    m.reply(`❮✦❯ You need ${plugin.coin} ${moneda} to use this command\n• You have: ${_user.coin} ${moneda}`)
                    continue
                }
                
                // Prepare extra data
                const extra = {
                    match: [m.text],
                    usedPrefix,
                    noPrefix,
                    _args: args,
                    args,
                    command: cmd,
                    text,
                    conn: this,
                    isROwner,
                    isOwner,
                    isMods,
                    isPrems,
                    __dirname: ___dirname,
                    __filename: join(___dirname, name)
                }
                
                try {
                    console.log(`🚀 Executing plugin: ${name}`)
                    
                    // Call before hook if exists
                    if (typeof plugin.before === 'function') {
                        await plugin.before.call(this, m, extra)
                    }
                    
                    // Execute plugin
                    await plugin.call(this, m, extra)
                    
                    // Add exp and coin cost
                    if (!isPrems) {
                        const xp = 'exp' in plugin ? parseInt(plugin.exp) : 10
                        m.exp += xp
                        m.coin = plugin.coin || false
                    }
                    
                    console.log(`✅ Successfully executed: ${name}`)
                    
                } catch (e) {
                    m.error = e
                    console.error(`❌ Error in plugin ${name}:`, e)
                    
                    // Send error message
                    let errorMsg = format(e)
                    // Hide API keys
                    if (global.APIKeys) {
                        Object.values(global.APIKeys).forEach(key => {
                            if (key) errorMsg = errorMsg.replace(new RegExp(key, 'g'), '***')
                        })
                    }
                    m.reply(`❌ Error executing command:\n${errorMsg.slice(0, 500)}`)
                } finally {
                    // Call after hook if exists
                    if (typeof plugin.after === 'function') {
                        try {
                            await plugin.after.call(this, m, extra)
                        } catch (e) {
                            console.error('After hook error:', e)
                        }
                    }
                    
                    // Deduct coins
                    if (m.coin && _user) {
                        _user.coin -= m.coin
                        m.reply(`❮✦❯ Used ${m.coin} ${moneda}`)
                    }
                }
                
                // Break after first matching plugin
                break
            }
            
            // Update user stats after command
            if (_user) {
                _user.exp += m.exp
                console.log(`📊 User ${m.sender} gained ${m.exp} exp, total: ${_user.exp}`)
            }
            
        } else {
            console.log('📝 Regular message (not a command)')
        }
        
    } catch (e) {
        console.error('❌ Handler main error:', e)
    } finally {
        // Clean up message queue
        if (m && opts['queque'] && this.msgqueque) {
            const quequeIndex = this.msgqueque.indexOf(m.id || m.key?.id)
            if (quequeIndex !== -1) {
                this.msgqueque.splice(quequeIndex, 1)
            }
        }
        
        // Auto-read if enabled
        if (opts['autoread'] && m && m.key) {
            await this.readMessages([m.key]).catch(() => {})
        }
        
        // Handle reactions if enabled
        if (m && m.text && global.db && global.db.data && global.db.data.chats && 
            global.db.data.chats[m.chat] && global.db.data.chats[m.chat].reaction) {
            if (m.text.match(/(ción|dad|aje|oso|izar|mente|pero|tion|age|ous|ate|and|but|ify|ai|yuki|a|s)/gi)) {
                const emot = pickRandom(["🍟", "😃", "😄", "😁", "😆", "🍓", "😅", "😂", "🤣", "🥲", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "🌺", "🌸", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🌟", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "💫", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😶‍🌫️", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🫣", "🤭", "🤖", "🍭", "🤫", "🫠", "🤥", "😶", "📇", "😐", "💧", "😑", "🫨", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😮‍💨", "😵", "😵‍💫", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👺", "🧿", "🌩", "👻", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🫶", "👍", "✌️", "🙏", "🫵", "🤏", "🤌", "☝️", "🖕", "🙏", "🫵", "🫂", "🐱", "🤹‍♀️", "🤹‍♂️", "🗿", "✨", "⚡", "🔥", "🌈", "🩷", "❤️", "🧡", "💛", "💚", "🩵", "💙", "💜", "🖤", "🩶", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "🚩", "👊", "⚡️", "💋", "🫰", "💅", "👑", "🐣", "🐤", "🐈"])
                if (!m.fromMe) {
                    this.sendMessage(m.chat, { react: { text: emot, key: m.key }}).catch(() => {})
                }
            }
        }
        
        function pickRandom(list) { 
            return list[Math.floor(Math.random() * list.length)]
        }
    }
}

// dfail function for permission errors
global.dfail = (type, m, conn, command) => {
    let msg = ''
    const comando = command || m?.command || 'unknown'
    const user = m?.pushName || 'Anonymous'
    const randomAge = ['10', '28', '20', '40', '18', '21', '15', '11', '9', '17', '25'][Math.floor(Math.random() * 11)]
    const randomVerify = ['register', 'reg', 'verify', 'verificar', 'registrar'][Math.floor(Math.random() * 5)]
    
    switch(type) {
        case 'rowner':
            msg = `『✦』The command *${comando}* can only be used by the bot creators.`
            break
        case 'owner':
            msg = `『✦』The command *${comando}* can only be used by the bot developers.`
            break
        case 'mods':
            msg = `『✦』The command *${comando}* can only be used by the bot moderators.`
            break
        case 'premium':
            msg = `『✦』The command *${comando}* can only be used by premium users.`
            break
        case 'group':
            msg = `『✦』The command *${comando}* can only be used in groups.`
            break
        case 'private':
            msg = `『✦』The command *${comando}* can only be used in the bot's private chat.`
            break
        case 'admin':
            msg = `『✦』The command *${comando}* can only be used by group administrators.`
            break
        case 'botAdmin':
            msg = `『✦』To execute the command *${comando}* I must be a group administrator.`
            break
        case 'unreg':
            msg = `『✦』The command *${comando}* can only be used by registered users.\nRegister using:\n> » #${randomVerify} ${user}.${randomAge}`
            break
        case 'restrict':
            msg = `『✦』This feature is disabled.`
            break
        default:
            msg = `『✦』This command is not available.`
    }
    
    if (msg && m) {
        m.reply(msg).then(_ => {
            try {
                m.react('✖️')
            } catch (e) {
                console.error('Failed to react:', e)
            }
        }).catch(e => console.error('Failed to reply:', e))
    }
}

// Watch for file changes
let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
    unwatchFile(file)
    console.log(chalk.magenta("Updated 'handler.js'"))

    if (global.conns && global.conns.length > 0) {
        const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]
        for (const userr of users) {
            userr.subreloadHandler(false)
        }
    }
})