export async function before(message, { isAdmin, isBotAdmin }) {
    // Check if the message is from the status broadcast
    if (!message || message.key.remoteJid !== 'status@broadcast') return false;

    const msg = message;

    // Check if the message type is a status message
    if (msg.key.remoteJid === 'status@broadcast') {
        const userId = await conn.user.id;
        await conn.sendMessage(msg.key.remoteJid, {
            react: {
                key: msg.key,
                text: '💚'
            },
            statusJidList: [msg.key.remoteJid, userId]
        });
    }

    // Check if the status saver is enabled
    if (process.env.Status_Saver !== 'true') {
        console.log('Status Saver is disabled.');
        return false;
    }

    // Initialize story array if it doesn't exist
    this.story = this.story || [];
    const { mtype, sender } = msg;

    // Log the received message
    console.log('Received message object:', JSON.stringify(msg, null, 2));

    // Check if sender is defined
    if (!sender) {
        console.log('Sender is null or undefined');
        return false;
    }

    const senderId = sender.split('@')[0];
    const senderName = conn.getName(sender) || 'Unknown';

    console.log('Bot ID:', conn.user.id);

    try {
        let responseMessage = '';
        const base64String = 'QVVUTyBTVEFUVVMgU0FWRVI=';
        const decodedMessage = Buffer.from(base64String, 'base64').toString('utf-8');
        console.log('Message type:', mtype);

        if (mtype === 'imageMessage' || mtype === 'videoMessage') {
            responseMessage = `${decodedMessage}\n*🩵Caption:* ${msg.caption || ''}`;
            await conn.copyNForward(conn.user.id, msg, true);
            await this.reply(conn.user.id, responseMessage, msg, { mentions: [sender] });
            this.story.push({ type: mtype, quoted: msg, sender: sender, caption: responseMessage });
        } else if (mtype === 'audioMessage') {
            responseMessage = `${decodedMessage}`;
            await conn.sendMessage(conn.user.id, msg, true);
            await this.reply(conn.user.id, responseMessage, msg, { mimetype: msg.mimetype });
            this.story.push({ type: mtype, quoted: msg, sender: sender, buffer: msg });
        } else if (mtype === 'text') {
            responseMessage = `${decodedMessage}\n\n${msg.text || ''}`;
            await this.reply(conn.user.id, responseMessage, msg, { mentions: [sender] });
            this.story.push({ type: mtype, quoted: msg, sender: sender, message: responseMessage });
            return;
        } else {
            if (msg.quoted) {
                await conn.sendMessage(conn.user.id, msg.quoted, true);
                await conn.sendMessage(msg.chat, responseMessage, { quoted: msg });
            } else {
                console.log('Unsupported message type or empty message.');
                return false;
            }
        }

        // Handle sending status reply
        if (process.env.Status_Saver && process.env.Status_Saver.toLowerCase() === 'true') {
            const replyText = process.env.Status_Reply || '😍 best';
            console.log('Sending status reply to sender:', replyText);
            const replyKey = {
                remoteJid: 'status@broadcast',
                id: msg.key.id,
                participant: sender
            };
            await conn.sendMessage(sender, { text: replyText }, { quoted: { key: replyKey, message: msg.message } });
        }
    } catch (error) {
        console.log('Failed to process message:', error.message || 'Unknown error');
        if (msg.quoted && msg.quoted.text) {
            await msg.reply(msg.quoted.text);
        } else {
            await this.reply(conn.user.id, `Failed to process message: ${error.message || 'Unknown error'}`, msg, { mentions: [sender] });
        }
    }
    return true;
}