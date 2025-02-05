
import fetch from 'node-fetch'

let handler = m => m
handler.all = async function (m) {
	
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
	let pp = await this.profilePictureUrl(who, 'image').catch(_ => 'https://home.lazackorganisation.my.id/img/img1.png')
	
	//reply link wa
   global.rpgc = { contextInfo: { externalAdReply: { mediaUrl: 'https://home.lazackorganisation.my.id/img/img1.png', mediaType: 'VIDEO', description: 'support group', title: 'JOIN GROUP', body: 'support group', thumbnailUrl: 'https://home.lazackorganisation.my.id/img/img1.png', sourceUrl: 'https://whatsapp.com/channel/0029ValRlNGCXC3EussN4b2E' }}} 
	
	//reply link Instagram 
    global.rpig = { contextInfo: { externalAdReply: { mediaUrl: 'https://home.lazackorganisation.my.id/img/img1.png', mediaType: 'VIDEO', description: 'FOLLOW DEVELOPER', title: 'INSTAGRAM', body: 'Keep bot alive', thumbnailUrl: 'https://home.lazackorganisation.my.id/img/img1.png', sourceUrl: 'https://instagram.com/hackersreality' }}}
	
	//reply link yt
    global.rpyt = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: 'https://home.lazackorganisation.my.id/img/img1.png', mediaType: 'VIDEO', description: 'SUBSCRIBE : ERROR MODS YT', title: 'YouTube', body: 'learn to create your own bots', thumbnailUrl: 'https://home.lazackorganisation.my.id/img/img1.png', sourceUrl: 'https://youtube.com/@lazaromtaju' }}}

//reply link WhatsApp Channel
    global.rpwp = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: 'https://home.lazackorganisation.my.id/img/img1.png', mediaType: 'VIDEO', description: 'Follow Channel', title: 'LAZACK BOTS CHANNEL', body: 'To Get Updates LAZACK BOTS', thumbnailUrl: 'https://home.lazackorganisation.my.id/img/img1.png', sourceUrl: 'https://whatsapp.com/channel/0029ValRlNGCXC3EussN4b2E' }}}
    
	global.canal = { contextInfo: { externalAdReply: { sourceUrl: "https://whatsapp.com/channel/0029ValRlNGCXC3EussN4b2E" }}}
} 
export default handler
