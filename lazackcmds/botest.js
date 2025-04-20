let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    conn.sendButton(
        m.chat,
        `*HELLO DID YOU CALL OUT FOR ME*      
        @${m.sender.split('@')[0]} 
        *AM LAZACK MD USER WHATSAPP BOT HOW CAN I ASSIST YOU TODAY/TONIGHT? 😇*`.trim(),
        igfg,
        null,
        [
            ['TOUCH ME', '.grp'],
            ['BOT SC', '.repo']
        ],
        m,
        { mentions: [m.sender] }
    );
};

// Custom prefix and command configuration
handler.customPrefix = /^(bot)$/i;
handler.command = new RegExp();

// Export the handler
export default handler;

// Utility function to pick a random item from a list
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}
