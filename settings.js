//ubah semuanya di sini
let moment = require('moment-timezone')
let fs = require('fs')
let chalk = require('chalk')

// Waktu
let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
    
// Hari Tanggal
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    
global.botdate = `⫹⫺ Day's: ${week} ${date}`
global.bottime = `ᴛɪᴍᴇ: ${wktuwib}`

        /*============== SOURCE URL ==============*/

// kalo ga punya ketik "-" atau biarin aja biar ada creditsnya :v
global.sig = 'https://instagram.com' //Link Instagrammu
global.sgh = 'https://github.com/Nayla-Hanifah' //Link Githubmu
global.sgc = 'https://chat.whatsapp.com/IrFeKGgeIJ46m6IIGogYKc' //link Group mu
global.sch = 'https://whatsapp.com/channel/0029VaEkiXhD38CPyrDyQK3c' //Link Saluran Wa mu Kalo Gada Biarin aja
global.snh = 'https://nhentai.net/g/HaramTod🗿' //Hmmm, Ini boleh kalian isi terserah :v
        
/*============== STAFF ==============*/
global.owner = ['6287792911529', '6285775496304']  
global.mods = ['6287792911529'] 
global.prems = ['']
global.nameown = 'Nayla'
global.numberowner = '6287792911529' 
global.mail = 'hnayla225@gmail.com' 

/*============== PAYMENT ==============*/
global.dana = '085775496304'
global.pulsa = '6285775496304 (indosat)'

/*============== WATERMARK ==============*/
global.namebot = 'Hᴜᴏ Yᴜʜᴀᴏ'
global.namedoc = 'ᴡᴀ ʙᴏᴛ ʙʏ ɴᴀʏʟᴀ'
global.wm = 'ʜᴜᴏ ʏᴜʜᴀᴏ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ'
global.titlebot = '🎋 ┊ sɪᴍᴘʟᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ'
global.watermark = wm
global.wm2 = '⫹⫺ ɴαуℓα ʜᴀɴɪꜰᴀʜ'
global.packname = 'Made with'
global.author = 'Bot WhatsApp'

/*============== TEXT ==============*/
global.wait = '```L O A D I N G...```'
global.eror = '```404 ERROR```'
global.benar = '*Benar* ✅\n'
global.salah = '*Salah* ❌\n'

/*============== LOGO ==============*/
global.thumb = 'https://telegra.ph/file/773891a7fc838a2dccf61.jpg'

global.APIs = {   
//isi apikey yang di perlukan
}
global.APIKeys = { 
// isi yang di perlukan 
}

/*================ HIASAN ================*/
global.sa = "╭─"
global.gx = "│✇"
global.gy = "│•"
global.gz = "│"
global.sb = "╰────࿐"
global.kki ="「"
global.kka = "」"

/*=========== FAKE SIZE ===========*/
global.fsizedoc = '99999999999999' // default 10TB
global.fpagedoc = '999'
        
global.multiplier = 45
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      sampah: '🗑',
      armor: '🥼',
      sword: '⚔️',
      kayu: '🪵',
      batu: '🪨',
      string: '🕸️',
      kuda: '🐎',
      kucing: '🐈' ,
      anjing: '🐕',
      petFood: '🍖',
      gold: '👑',
      emerald: '💚'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }
}

//------ JANGAN DIUBAH -----
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  delete require.cache[file]
  require(file)
}) 
