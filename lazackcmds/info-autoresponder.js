/**
 * Auto-responder configuration handler
 * Allows admins to set custom auto-response messages for chats
 * @param {Object} m - The message object
 * @param {Object} options - Function parameters
 */
let handler = async (m, { conn, text, usedPrefix, command, isOwner, isAdmin, isROwner }) => {
    // Permission check
    if (!(isOwner || isAdmin || isROwner)) {
        return conn.reply(m.chat, 
            '⚠️ Sorry, only group admins can customize the auto-responder in this chat.', 
            m
        )
    }

    const chatData = global.db.data.chats[m.chat] || {}
    const responses = {
        alreadySet: `✅ There's already an auto-responder prompt set. To configure a new one, first clear the current one by using:\n> *${usedPrefix + command}*`,
        successSet: `✅ Auto-responder configured successfully.\n\nℹ️ If the auto-responder is disabled, enable it using:\n> *${usedPrefix}autoresponder*`,
        successClear: '🗑️ Auto-responder prompt cleared successfully.',
        notFound: `ℹ️ There's no custom auto-responder prompt in this chat.\n\nYou can set one using:\n> *${usedPrefix + command} [your message]*`
    }

    try {
        if (text) {
            // Set new auto-responder
            if (chatData.sAutoresponder) {
                return conn.reply(m.chat, responses.alreadySet, m)
            }
            chatData.sAutoresponder = text.trim()
            return conn.reply(m.chat, responses.successSet, m)
        } else {
            // Clear existing auto-responder
            if (chatData.sAutoresponder) {
                chatData.sAutoresponder = ''
                return conn.reply(m.chat, responses.successClear, m)
            }
            return conn.reply(m.chat, responses.notFound, m)
        }
    } catch (error) {
        console.error('Auto-responder config error:', error)
        return conn.reply(m.chat, 
            '❌ An error occurred while configuring the auto-responder. Please try again later.', 
            m
        )
    }
}

// Command metadata
handler.tags = ['group', 'admin']
handler.help = [
    'editautoresponder [text] - Set custom auto-responder message',
    'autoresponder2 - Clear current auto-responder'
]
handler.command = ['editautoresponder', 'autoresponder2', 'setautoreply']

export default handler