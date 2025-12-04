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
    this.msgqueque = this.msgqueque || []
    this.uptime = this.uptime || Date.now()
    
    // Get connection
    const conn = this
    
    if (!chatUpdate)
        return
        
    this.pushMessage(chatUpdate.messages).catch(console.error)
    
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m)
        return
        
    if (global.db.data == null)
        await global.loadDatabase()       
        
    // Add moneda definition
    const moneda = global.moneda || 'coins'
    
    try {
        m = smsg(this, m) || m
        if (!m)
            return
            
        if (m.chat === 'status@broadcast') {
            await this.readMessages([m.key])
            console.log(`Viewed status from: ${m.sender}`)
        }
        
        m.exp = 0
        m.coin = false
        
        // Debug logging
        console.log('Received message:', m.text)
        console.log('Sender:', m.sender)
        console.log('Chat:', m.chat)
        
        try {
            let user = global.db.data.users[m.sender]
            if (typeof user !== 'object')  
                global.db.data.users[m.sender] = {}
                
            if (user) {
                if (!isNumber(user.exp))
                    user.exp = 0
                if (!isNumber(user.coin))
                    user.coin = 10
                if (!isNumber(user.joincount))
                    user.joincount = 1
                if (!isNumber(user.diamond))
                    user.diamond = 3
                if (!isNumber(user.lastadventure))
                    user.lastadventure = 0
                if (!isNumber(user.lastclaim))
                    user.lastclaim = 0
                if (!isNumber(user.health))
                    user.health = 100
                if (!isNumber(user.crime))
                    user.crime = 0
                if (!isNumber(user.lastcofre))
                    user.lastcofre = 0
                if (!isNumber(user.lastdiamantes))
                    user.lastdiamantes = 0
                if (!isNumber(user.lastpago))
                    user.lastpago = 0
                if (!isNumber(user.lastcode))
                    user.lastcode = 0
                if (!isNumber(user.lastcodereg))
                    user.lastcodereg = 0
                if (!isNumber(user.lastduel))
                    user.lastduel = 0
                if (!isNumber(user.lastmining))
                    user.lastmining = 0
                    
                if (!('muto' in user))
                    user.muto = false
                if (!('premium' in user))
                    user.premium = false
                if (!user.premium)
                    user.premiumTime = 0
                if (!('registered' in user))
                    user.registered = false
                if (!('genre' in user))
                    user.genre = ''
                if (!('birth' in user))
                    user.birth = ''
                if (!('marry' in user))
                    user.marry = ''
                if (!('description' in user))
                    user.description = ''
                if (!('packstickers' in user))
                    user.packstickers = null
                    
                if (!user.registered) {
                    if (!('name' in user))
                        user.name = m.name
                    if (!isNumber(user.age))
                        user.age = -1
                    if (!isNumber(user.regTime))
                        user.regTime = -1
                }
                
                if (!isNumber(user.afk))
                    user.afk = -1
                if (!('afkReason' in user))
                    user.afkReason = ''
                if (!('role' in user))
                    user.role = 'Nuv'
                if (!('banned' in user))
                    user.banned = false
                if (!('useDocument' in user))
                    user.useDocument = false
                if (!isNumber(user.level))
                    user.level = 0
                if (!isNumber(user.bank))
                    user.bank = 0
                if (!isNumber(user.warn))
                    user.warn = 0
            } else {
                global.db.data.users[m.sender] = {
                    exp: 0,
                    coin: 10,
                    joincount: 1,
                    diamond: 3,
                    lastadventure: 0,
                    health: 100,
                    lastclaim: 0,
                    lastcofre: 0,
                    lastdiamantes: 0,
                    lastcode: 0,
                    lastduel: 0,
                    lastpago: 0,
                    lastmining: 0,
                    lastcodereg: 0,
                    muto: false,
                    registered: false,
                    genre: '',
                    birth: '',
                    marry: '',
                    description: '',
                    packstickers: null,
                    name: m.name,
                    age: -1,
                    regTime: -1,
                    afk: -1,
                    afkReason: '',
                    banned: false,
                    useDocument: false,
                    bank: 0,
                    level: 0,
                    role: 'Nuv',
                    premium: false,
                    premiumTime: 0,                 
                }
            }
            
            let chat = global.db.data.chats[m.chat]
            if (typeof chat !== 'object')
                global.db.data.chats[m.chat] = {}
                
            if (chat) {
                if (!('isBanned' in chat))
                    chat.isBanned = false
                if (!('sAutoresponder' in chat))
                    chat.sAutoresponder = ''
                if (!('welcome' in chat))
                    chat.welcome = true
                if (!('autolevelup' in chat))
                    chat.autolevelup = false
                if (!('autoAceptar' in chat))
                    chat.autoAceptar = false
                if (!('autosticker' in chat))
                    chat.autosticker = false
                if (!('autoRechazar' in chat))
                    chat.autoRechazar = false
                if (!('autoresponder' in chat))
                    chat.autoresponder = false
                if (!('detect' in chat))
                    chat.detect = true
                if (!('antiBot' in chat))
                    chat.antiBot = false
                if (!('antiBot2' in chat))
                    chat.antiBot2 = false
                if (!('modoadmin' in chat))
                    chat.modoadmin = false   
                if (!('antiLink' in chat))
                    chat.antiLink = true
                if (!('reaction' in chat))
                    chat.reaction = false
                if (!('nsfw' in chat))
                    chat.nsfw = false
                if (!('antifake' in chat))
                    chat.antifake = false
                if (!('delete' in chat))
                    chat.delete = false
                if (!isNumber(chat.expired))
                    chat.expired = 0
            } else {
                global.db.data.chats[m.chat] = {
                    isBanned: false,
                    sAutoresponder: '',
                    welcome: true,
                    autolevelup: false,
                    autoresponder: false,
                    delete: false,
                    autoAceptar: false,
                    autoRechazar: false,
                    detect: true,
                    antiBot: false,
                    antiBot2: false,
                    modoadmin: false,
                    antiLink: true,
                    antifake: false,
                    reaction: false,
                    nsfw: false,
                    expired: 0, 
                    antiLag: false,
                    per: [],
                }
            }
            
            var settings = global.db.data.settings[this.user.jid]
            if (typeof settings !== 'object') 
                global.db.data.settings[this.user.jid] = {}
                
            if (settings) {
                if (!('self' in settings)) 
                    settings.self = false
                if (!('restrict' in settings)) 
                    settings.restrict = true
                if (!('jadibotmd' in settings)) 
                    settings.jadibotmd = true
                if (!('antiPrivate' in settings)) 
                    settings.antiPrivate = false
                if (!('autoread' in settings)) 
                    settings.autoread = false
            } else {
                global.db.data.settings[this.user.jid] = {
                    self: false,
                    restrict: true,
                    jadibotmd: true,
                    antiPrivate: false,
                    autoread: false,
                    status: 0
                }
            }
        } catch (e) {
            console.error('Database error:', e)
        }

        let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

        const detectwhat = m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net'
        const isROwner = [...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + detectwhat).includes(m.sender)
        const isOwner = isROwner || m.fromMe
        const isMods = isROwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + detectwhat).includes(m.sender)
        const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + detectwhat).includes(m.sender) || (_user && _user.premium == true)

        if (m.isBaileys) return
        if (opts['nyimak']) return
        if (!isROwner && opts['self']) return
        if (opts['swonly'] && m.chat !== 'status@broadcast') return
        
        if (typeof m.text !== 'string')
            m.text = ''

        if (opts['queque'] && m.text && !(isMods || isPrems)) {
            let queque = this.msgqueque, time = 1000 * 5
            const previousID = queque[queque.length - 1]
            queque.push(m.id || m.key.id)
            setInterval(async function () {
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                await delay(time)
            }, time)
        }

        m.exp += Math.ceil(Math.random() * 10)

        let usedPrefix

        async function getLidFromJid(id, conn) {
            if (id.endsWith('@lid')) return id
            try {
                if (conn.onWhatsApp && typeof conn.onWhatsApp === 'function') {
                    const res = await conn.onWhatsApp(id).catch(() => [])
                    return res[0]?.lid || id
                }
            } catch (e) {
                console.error('Error in getLidFromJid:', e)
            }
            return id
        }
        
        const senderLid = await getLidFromJid(m.sender, conn)
        const botLid = await getLidFromJid(conn.user.jid, conn)
        const senderJid = m.sender
        const botJid = conn.user.jid
        const groupMetadata = m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}
        const participants = m.isGroup ? (groupMetadata.participants || []) : []
        const user = participants.find(p => p.id === senderLid || p.id === senderJid) || {}
        const bot = participants.find(p => p.id === botLid || p.id === botJid) || {}
        const isRAdmin = user?.admin === "superadmin"
        const isAdmin = isRAdmin || user?.admin === "admin"
        const isBotAdmin = !!bot?.admin

        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
        
        // Check if plugins are loaded
        if (!global.plugins || Object.keys(global.plugins).length === 0) {
            console.error('No plugins loaded!')
            return
        }
        
        for (let name in global.plugins) {
            let plugin = global.plugins[name]
            if (!plugin)
                continue
            if (plugin.disabled)
                continue
                
            const __filename = join(___dirname, name)
            
            console.log('Processing plugin:', name)
            
            if (typeof plugin.all === 'function') {
                try {
                    await plugin.all.call(this, m, {
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename
                    })
                } catch (e) {
                    console.error(e)
                }
            }
            
            if (!opts['restrict']) {
                if (plugin.tags && plugin.tags.includes('admin')) {
                    continue
                }
            }
            
            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
            let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
            
            // Simplified prefix matching
            let match = null
            let usedPrefixStr = ''
            
            if (typeof _prefix === 'string') {
                if (m.text.startsWith(_prefix)) {
                    match = [m.text, new RegExp(str2Regex(_prefix))]
                    usedPrefixStr = _prefix
                }
            } else if (Array.isArray(_prefix)) {
                for (let p of _prefix) {
                    if (typeof p === 'string' && m.text.startsWith(p)) {
                        match = [m.text, new RegExp(str2Regex(p))]
                        usedPrefixStr = p
                        break
                    } else if (p instanceof RegExp) {
                        const matchResult = p.exec(m.text)
                        if (matchResult) {
                            match = [matchResult, p]
                            usedPrefixStr = matchResult[0]
                            break
                        }
                    }
                }
            } else if (_prefix instanceof RegExp) {
                const matchResult = _prefix.exec(m.text)
                if (matchResult) {
                    match = [matchResult, _prefix]
                    usedPrefixStr = matchResult[0]
                }
            }
            
            if (!match) continue
            
            usedPrefix = usedPrefixStr
            
            let noPrefix = m.text.replace(usedPrefix, '').trim()
            let [command, ...args] = noPrefix.split(/\s+/).filter(v => v)
            args = args || []
            let _args = args
            let text = args.join(' ')
            command = (command || '').toLowerCase()
            
            console.log('Command extracted:', command)
            console.log('Args:', args)
            
            let fail = plugin.fail || global.dfail
            let isAccept = false
            
            if (plugin.command instanceof RegExp) {
                isAccept = plugin.command.test(command)
            } else if (Array.isArray(plugin.command)) {
                isAccept = plugin.command.some(cmd => {
                    if (cmd instanceof RegExp) {
                        return cmd.test(command)
                    }
                    return cmd === command
                })
            } else if (typeof plugin.command === 'string') {
                isAccept = plugin.command === command
            } else {
                isAccept = false
            }
            
            console.log('Command accepted:', isAccept, 'for command:', command)

            if ((m.id.startsWith('NJX-') || (m.id.startsWith('BAE5') && m.id.length === 16) || (m.id.startsWith('B24E') && m.id.length === 20))) 
                continue

            if (!isAccept) {
                continue
            }
            
            m.plugin = name
            
            if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                let chat = global.db.data.chats[m.chat]
                let user = global.db.data.users[m.sender]
                
                if (!['grupo-unbanchat.js'].includes(name) && chat && chat.isBanned && !isROwner) 
                    return
                    
                if (name != 'grupo-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'grupo-delete.js' && chat?.isBanned && !isROwner) 
                    return
                    
                if (m.text && user && user.banned && !isROwner) {
                    m.reply(`《✦》You are banned, you cannot use commands in this bot!\n\n${user.bannedReason ? `✰ *Reason:* ${user.bannedReason}` : '✰ *Reason:* Not Specified'}\n\n> ✧ If this Bot is an official account and you have evidence that this message is an error, you can present your case to a moderator.`)
                    return
                }

                if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                    let chat = global.db.data.chats[m.chat]
                    let user = global.db.data.users[m.sender]
                    let setting = global.db.data.settings[this.user.jid]
                    
                    if (name != 'grupo-unbanchat.js' && chat?.isBanned)
                        return 
                    if (name != 'owner-unbanuser.js' && user?.banned)
                        return
                }
            }
            
            let hl = _prefix 
            let adminMode = global.db.data.chats[m.chat]?.modoadmin || false
            let mini = `${plugin.botAdmin || plugin.admin || plugin.group || plugin || noPrefix || hl ||  m.text.slice(0, 1) == hl || plugin.command}`
            
            if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && mini) 
                return
                
            if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { 
                fail('owner', m, this, command)
                continue
            }
            
            if (plugin.rowner && !isROwner) { 
                fail('rowner', m, this, command)
                continue
            }
            
            if (plugin.owner && !isOwner) { 
                fail('owner', m, this, command)
                continue
            }
            
            if (plugin.mods && !isMods) { 
                fail('mods', m, this, command)
                continue
            }
            
            if (plugin.premium && !isPrems) { 
                fail('premium', m, this, command)
                continue
            }
            
            if (plugin.group && !m.isGroup) { 
                fail('group', m, this, command)
                continue
            } 
            
            if (plugin.botAdmin && !isBotAdmin) { 
                fail('botAdmin', m, this, command)
                continue
            } 
            
            if (plugin.admin && !isAdmin) { 
                fail('admin', m, this, command)
                continue
            }
            
            if (plugin.private && m.isGroup) {
                fail('private', m, this, command)
                continue
            }
            
            if (plugin.register == true && _user && _user.registered == false) { 
                fail('unreg', m, this, command)
                continue
            }
            
            m.isCommand = true
            let xp = 'exp' in plugin ? parseInt(plugin.exp) : 10
            m.exp += xp
            
            if (!isPrems && plugin.coin && _user && _user.coin < plugin.coin * 1) {
                conn.reply(m.chat, `❮✦❯ You have run out of ${moneda}`, m)
                continue
            }
            
            if (plugin.level > (_user?.level || 0)) {
                conn.reply(m.chat, `❮✦❯ Required level: *${plugin.level}*\n\n• Your current level is: *${_user?.level || 0}*\n\n• Use this command to level up:\n*${usedPrefix}levelup*`, m)
                continue
            }
            
            let extra = {
                match,
                usedPrefix,
                noPrefix,
                _args,
                args,
                command,
                text,
                conn: this,
                participants,
                groupMetadata,
                user,
                bot,
                isROwner,
                isOwner,
                isRAdmin,
                isAdmin,
                isBotAdmin,
                isPrems,
                chatUpdate,
                __dirname: ___dirname,
                __filename
            }
            
            console.log('Executing plugin:', name, 'with command:', command)
            
            try {
                await plugin.call(this, m, extra)
                
                if (!isPrems)
                    m.coin = m.coin || plugin.coin || false
                    
            } catch (e) {
                m.error = e
                console.error('Plugin execution error:', e)
                
                if (e) {
                    let text = format(e)
                    for (let key of Object.values(global.APIKeys || []))
                        text = text.replace(new RegExp(key, 'g'), 'Administrator')
                    m.reply(text)
                }
            } finally {
                if (typeof plugin.after === 'function') {
                    try {
                        await plugin.after.call(this, m, extra)
                    } catch (e) {
                        console.error(e)
                    }
                }
                
                if (m.coin) {
                    conn.reply(m.chat, `❮✦❯ You used ${+m.coin} ${moneda}`, m)
                }
            }
            
            console.log('Successfully executed command:', command)
            break
        }
    } catch (e) {
        console.error('Handler main error:', e)
    } finally {
        if (opts['queque'] && m && m.text) {
            const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (quequeIndex !== -1)
                this.msgqueque.splice(quequeIndex, 1)
        }
        
        let user
        let stats = global.db.data.stats || {}
        
        if (m) { 
            let utente = global.db.data.users?.[m.sender]
            
            if (utente && utente.muto == true) {
                let bang = m.key.id
                let cancellazzione = m.key.participant
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: cancellazzione }})
            }
            
            if (m.sender && (user = global.db.data.users?.[m.sender])) {
                user.exp += m.exp
                user.coin -= m.coin * 1
            }

            let stat
            if (m.plugin) {
                let now = +new Date
                if (m.plugin in stats) {
                    stat = stats[m.plugin]
                    if (!isNumber(stat.total))
                        stat.total = 1
                    if (!isNumber(stat.success))
                        stat.success = m.error != null ? 0 : 1
                    if (!isNumber(stat.last))
                        stat.last = now
                    if (!isNumber(stat.lastSuccess))
                        stat.lastSuccess = m.error != null ? 0 : now
                } else {
                    stat = stats[m.plugin] = {
                        total: 1,
                        success: m.error != null ? 0 : 1,
                        last: now,
                        lastSuccess: m.error != null ? 0 : now
                    }
                }
                
                stat.total += 1
                stat.last = now
                
                if (m.error == null) {
                    stat.success += 1
                    stat.lastSuccess = now
                }
            }
        }
        
        try {
            if (!opts['noprint']) 
                await (await import(`./lib/print.js`)).default(m, this)
        } catch (e) { 
            console.log('Print error:', e)
        }
        
        let settingsREAD = global.db.data.settings?.[this.user.jid] || {}  
        if (opts['autoread']) 
            await this.readMessages([m.key])

        if (global.db.data.chats?.[m.chat]?.reaction && m.text && m.text.match(/(ción|dad|aje|oso|izar|mente|pero|tion|age|ous|ate|and|but|ify|ai|yuki|a|s)/gi)) {
            let emot = pickRandom(["🍟", "😃", "😄", "😁", "😆", "🍓", "😅", "😂", "🤣", "🥲", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "🌺", "🌸", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🌟", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "💫", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😶‍🌫️", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🫣", "🤭", "🤖", "🍭", "🤫", "🫠", "🤥", "😶", "📇", "😐", "💧", "😑", "🫨", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😮‍💨", "😵", "😵‍💫", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👺", "🧿", "🌩", "👻", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🫶", "👍", "✌️", "🙏", "🫵", "🤏", "🤌", "☝️", "🖕", "🙏", "🫵", "🫂", "🐱", "🤹‍♀️", "🤹‍♂️", "🗿", "✨", "⚡", "🔥", "🌈", "🩷", "❤️", "🧡", "💛", "💚", "🩵", "💙", "💜", "🖤", "🩶", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "🚩", "👊", "⚡️", "💋", "🫰", "💅", "👑", "🐣", "🐤", "🐈"])
            if (!m.fromMe) 
                this.sendMessage(m.chat, { react: { text: emot, key: m.key }})
        }
        
        function pickRandom(list) { 
            return list[Math.floor(Math.random() * list.length)]
        }
    }
}

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