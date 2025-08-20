function handler(m, { text }) {
    // If no text is provided, reply asking the user to enter text
    if (!text) return conn.reply(m.chat, `${emoji} Please enter the text you want to transform.`, m)

    // Get the text:
    // - If 'text' is given, use it
    // - Otherwise, check if the user replied to a quoted message and use its text
    // - Otherwise, use the current message's text
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text

    // Replace each letter in the text with a styled Unicode version
    m.reply(teks.replace(/[a-z]/gi, v => {
        return {
            'a': 'ᥲ',
            'b': 'ᑲ',
            'c': 'ᥴ',
            'd': 'ძ',
            'e': 'ᥱ',
            'f': '𝖿',
            'g': 'g',
            'h': 'һ',
            'i': 'і',
            'j': 'ȷ',
            'k': 'k',
            'l': 'ᥣ',
            'm': 'm',
            'n': 'ᥒ',
            'o': '᥆',
            'p': '⍴',
            'q': '𝗊',
            'r': 'r',
            's': 's',
            't': '𝗍',
            'u': 'ᥙ',
            'v': '᥎',
            'w': 'ᥕ',
            'x': '᥊',
            'y': 'ᥡ',
            'z': 'z'
        }[v.toLowerCase()] || v // If the letter exists in the map, replace it; otherwise keep original
    }))
}

handler.help = ['letter *<text>*'] // Help command usage
handler.tags = ['fun']             // Command category
handler.command = ['letter']       // Command name
handler.register = true            // Requires registration

export default handler
