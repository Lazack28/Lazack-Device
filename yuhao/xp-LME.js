let fs = require('fs')
let handler = async (m, { conn, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let name = conn.getName(m.sender)
    let thumbnail = fs.readFileSync('./media/bank.jpg')
    let user = global.db.data.users[who]
    
    let anu = `
Name: *${user.name}*
Money: *${user.money}*
Exp: *${user.exp}*
Limit: *${user.limit}*`
conn.reply(m.chat, anu, m, {
        contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
     	showAdAttribution: true,
          title: `Your ${command}`,
          body: 'Click here to chat with the bot owner ',
          thumbnailUrl: fla  + command,
          sourceUrl: 'https://wa.me/62857754963046',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
       
}
handler.help = ['limit @user', 'money @user', 'exp @user']
handler.tags = ['xp']
handler.command = /^(limit|exp|money)$/i

module.exports = handler