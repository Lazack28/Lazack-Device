import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'
import fs from 'fs'
import { promises } from 'fs'
import { join } from 'path'

  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`

  let user = global.db.data.users[who]
  let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = user
  let username = conn.getName(who)
  let math = max - xp
  let prem = global.prems.includes(who.split`@`[0])
  let sn = createHash('md5').update(who).digest('hex')
  let totaluser = Object.values(global.db.data.users).length

  let str = `
 ┏━━━━━━━━━━━━━━┈⊷
> 🤖 ʙᴏᴛ ɴᴀᴍᴇ: 𝐋𝐚𝐳𝐚𝐜𝐤-𝐌-𝐃𝐞𝐯𝐢𝐜𝐞
> 📍 ᴠᴇʀꜱɪᴏɴ: 1.0.1
> 👨‍💻 ᴏᴡɴᴇʀ : 𝐋𝐚𝐳𝐚𝐜𝐤      
> 👤 ɴᴜᴍʙᴇʀ: 255734980103
> 📡 ᴘʟᴀᴛғᴏʀᴍ: *𝙇𝙄𝙉𝙐𝙓*
> 🛡 ᴍᴏᴅᴇ: *ℙ𝕌𝔹𝕃𝕀ℂ*
> 💫 ᴘʀᴇғɪx: [ . ]
┗━━━━━━━━━━━━━┈⊷
> © Lazack-organisation\n\n
${readMore}
───『 *I N F O  C M D*』───
> *${totalfeatures}* Commands
___________________     
${readMore}
        *INFO* 
*REPLY WITH THE NUMBER*
> *to get respected Menu*
╰───────
${readMore}
┏━━━━━━━━━━━━━━┈⊷
> *1.* Bot Menu
> *2.* Owner Menu
> *3.* Group Menu
> *4.* Fun Menu
> *5.* Reaction Menu
> *6.* Downloader Menu
> *7.* Game Menu
> *8.* Logo Menu
> *9.* Sticker Menu
> *10.* Audio Menu
> *11.* News Menu
> *12.* Economy Menu
> *13.* Anime Menu
> *14.* NSFW Menu
> *15.* Tools Menu
> *16.* AI Menu
> *17.* Religion Menu
> *18.* Plugin Menu
┗━━━━━━━━━━━━━┈⊷
`

  conn.sendFile(m.chat, './jusorts/lazack.jpg', 'perfil.jpg', str, m, null, canal)
  m.react(done)

handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu', 'help']

export default handler
