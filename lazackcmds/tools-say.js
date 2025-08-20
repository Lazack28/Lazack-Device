let handler = async (m, { conn, args }) => {
    // If the user doesn't provide any text after the command
    if (!args.length) 
        return conn.sendMessage(m.chat, { text: `${emoji} Please type the text you want me to repeat.` });

    // Combine all words into one message string
    let message = args.join(' ');

    // Invisible character (used so the message looks different or avoids filters)
    let invisibleChar = '\u200B';
    let finalMessage = invisibleChar + message;

    // Check if the message contains mentions like @123456789
    let mentions = [...message.matchAll(/@(\d+)/g)].map(v => v[1] + '@s.whatsapp.net');

    // If mentions exist, send message tagging those users
    if (mentions.length) {
        conn.sendMessage(m.chat, { text: finalMessage, mentions });
    } else {
        // Otherwise, just send the repeated message
        conn.sendMessage(m.chat, { text: finalMessage });
    }
};

// Command can be triggered with !say or !decir
handler.command = ['say', 'decir'];

// It’s categorized under tools
handler.tag = ['tools'];

// Can only be used in groups
handler.group = true;

export default handler;
