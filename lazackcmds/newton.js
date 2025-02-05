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
  
    // Check if the status saver is enabled
    if (process.env.Status_Saver !== 'true') {
        console.log("Status Saver is disabled."); // Log that the feature is disabled
        return false; // Exit the function
    }
  
    // Initialize story array if it doesn't exist
    this.story = this.story || [];
    const { mtype, sender } = message; // Destructure message type and sender
    console.log("Received message object:", JSON.stringify(message, null, 2)); // Log the received message
  
    // Check if sender is null or undefined
    if (!sender) {
        console.error("Sender is null or undefined"); // Log an error message
        return false; // Exit the function
    }
  
    const senderName = conn.getName(sender) || "Unknown"; // Get sender's name or set to "Unknown"
    console.log("Bot ID:", conn.user.id); // Log the bot's ID
  
    try {
        let responseMessage = ''; // Initialize response message
        const base64Message = Buffer.from("QVVUTyBTVEFUVVMgU0FWRVI=", "base64").toString("utf-8"); // Decode a base64 message
        console.log("Message type:", mtype); // Log the message type
  
        // Handle different message types
        if (mtype === 'imageMessage' || mtype === "videoMessage") {
            responseMessage = '*' + base64Message + "*\n*mmm*\n\n*🩵Status:* " + senderName + "\n*🩵Caption:* " + (message.caption || '');
            await conn.copyNForward(conn.user.id, message, true); // Forward the message to the bot
            await this.reply(conn.user.id, responseMessage, message, {
                'mentions': [sender] // Mention the sender in the reply
            });
            this.story.push({
                'type': mtype,
                'quoted': message,
                'sender': sender,
                'caption': responseMessage,
                'buffer': message // Store the message in the story
            });
        } else if (mtype === 'audioMessage') {
            responseMessage = '*' + base64Message + "* \n\n*🩵Status:* " + senderName;
            await conn.copyNForward(conn.user.id, message, true); // Forward the audio message
            await this.reply(conn.user.id, responseMessage, message, {
                'mimetype': message.mimetype // Send the reply with the appropriate mimetype
            });
            this.story.push({
                'type': mtype,
                'quoted': message,
                'sender': sender,
                'buffer': message // Store the audio message in the story
            });
        } else if (mtype === "extendedTextMessage") {
            responseMessage = '*' + base64Message + "*\n\n" + (message.text || '');
            await this.reply(conn.user.id, responseMessage, message, {
                'mentions': [sender] // Mention the sender in the reply
            });
            this.story.push({
                'type': mtype,
                'quoted': message,
                'sender': sender,
                'message': responseMessage // Store the extended text message in the story
            });
            return; // Exit after handling extended text messages
        } else {
            // Handle quoted messages
            if (message.quoted) {
                await conn.copyNForward(conn.user.id, message.quoted, true); // Forward the quoted message
                await conn.sendMessage(message.chat, responseMessage, {
                    'quoted': message // Send a response to the original message
                });
            } else {
                console.log("Unsupported message type or empty message."); // Log unsupported message types
                return false; // Exit if the message type is unsupported
            }
        }
  
        // Check if status reply is enabled
        if (process.env.STATUS_REPLY && process.env.STATUS_REPLY.toLowerCase() === "true") {
            const replyMessage = process.env.STATUS_MSG || "😎😍"; // Get the reply message from environment variable or set a default
            console.log("Sending status reply to sender:", replyMessage); // Log the reply message
            
            // Check if the command to enable/disable status like is sent
            if (message.body === '!enableStatusLike' && isAdmin) {
                if (process.env.STATUS_REPLY === 'true') {
                    await this.reply(message.chat, 'Status liking is already enabled.', message);
                } else {
                    process.env.STATUS_REPLY = 'true';
                    await this.reply(message.chat, 'Status liking enabled.', message);
                }
                return true;
            } else if (message.body === '!disableStatusLike' && isAdmin) {
                if (process.env.STATUS_REPLY === 'false') {
                    await this.reply(message.chat, 'Status liking is already disabled.', message);
                } else {
                    process.env.STATUS_REPLY = 'false';
                    await this.reply(message.chat, 'Status liking disabled.', message);
                }
                return true;
            }
  
            const quotedMessage = {
                'key': {
                    'remoteJid': 'status@broadcast',
                    'id': message.key.id,
                    'participant': sender // Create a quoted message object
                },
                'message': message.message // Include the original message
            };
            await conn.sendMessage(sender, {
                'text': replyMessage // Send the reply message to the sender
            }, {
                'quoted': quotedMessage // Include the quoted message
            });
        }
    } catch (error) {
        console.error("Failed to process message:", error.message || "Unknown error"); // Log any errors that occur
        if (message.quoted && message.quoted.text) {
            await message.reply(message.quoted.text); // Reply with the quoted text if available
        } else {
            await this.reply(conn.user.id, "Failed to process message: " + (error.message || "Unknown error"), message, {
                'mentions': [sender] // Mention the sender in the error reply
            });
        }
    }
    return true; // Return true to indicate successful processing
  }