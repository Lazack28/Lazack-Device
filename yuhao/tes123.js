var handler  = async (m, 
             { conn, 
                usedPrefix: _p }) => {
var media = 'https://telegra.ph/file/c819fd3a9d9a37df5032e.png'    
var pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/gS0XrNc/avatar-contact.png')           
return conn.sendImageAsSticker(m.chat, media, m, {packname: global.packname, author: global.author,
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    showAdAttribution: true,
    mediaType: 2,
    description: wm , 
    title: 'Aktif kak',
    body: namebot,
    thumbnailUrl: pp,
    sourceUrl: sgh
     }}
  })
}
handler.customPrefix = /^(tes|bot|test)$/i
handler.command = new RegExp
module.exports = handler