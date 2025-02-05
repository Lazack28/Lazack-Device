import { conn } from './connection'; // Import or define the conn object

export async function before(message, { isAdmin, isBotAdmin }) {
    // Check if the message is valid and not from a broadcast status
    if (!message || message.key.remoteJid !== 'status@broadcast') {
        return false; // Exit if the message is invalid
    }
  
    // If the message is from a broadcast status
    if (message.key.remoteJid === "status@broadcast") {
        const botJid = await conn.decodeJid(conn.user.id); // Decode the bot's JID
        await conn.sendMessage(message.key.remoteJid, {
            'react': {
                'key': message.key,
                'text': '🤟' // React with a green heart emoji
            }
        }, {
            'statusJidList': [message.key.participant, botJid] // Specify participants for the reaction
        });
    }
}
  
   