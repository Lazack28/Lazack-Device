const handler = async (m, { conn, text }) => {
    // Split the input text into number, message, and count
    const [number, message, count] = text.split('|');

    // Validate input
    if (!number) 
        return conn.reply(m.chat, `${emoji} Please enter a number to spam.`, m);

    if (!message) 
        return conn.reply(m.chat, `${emoji} Correct Usage:\n\n> ${emoji2} #spamwa number|text|count`, m);

    if (count && isNaN(count)) 
        return conn.reply(m.chat, `${emoji2} Count must be a number.`, m);

    // Format the phone number to WhatsApp format
    const fixedNumber = number.replace(/[-+<>@]/g, '')
                              .replace(/ +/g, '')
                              .replace(/^[0]/g, '62') + '@s.whatsapp.net';
    const fixedCount = count ? Number(count) : 10;

    if (fixedCount > 999) 
        return conn.reply(m.chat, `${emoji3} Minimum limit is 50 characters.`, m);

    // Notify user that spam has started
    await conn.reply(m.chat, `${emoji4} Spam sent successfully.`, m);

    // Send the message multiple times
    for (let i = fixedCount; i > 1; i--) {
        if (i !== 0) conn.reply(fixedNumber, message.trim(), null);
    }
};

handler.help = ['spamwa <number>|<message>|<number of messages>'];
handler.tags = ['tools'];
handler.command = ['spam', 'spamwa'];
handler.premium = true; // Only available for premium users

export default handler;
