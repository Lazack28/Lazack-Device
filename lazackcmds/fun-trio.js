let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!m.mentionedJid || m.mentionedJid.length < 2) {
        return conn.reply(m.chat, 
            `${emoji} Please mention 2 users to calculate trio compatibility (e.g., ${usedPrefix}threesome @user1 @user2)`, 
            m
        );
    }

    const [person1, person2] = m.mentionedJid.slice(0, 2);
    const names = {
        user1: await conn.getName(person1),
        user2: await conn.getName(person2),
        sender: await conn.getName(m.sender)
    };

    const compatibilities = {
        pair1: Math.floor(Math.random() * 100),
        pair2: Math.floor(Math.random() * 100),
        pair3: Math.floor(Math.random() * 100)
    };

    const pp = './src/Imagen.jpg';
    const trioMessage = `
    🌶️ *THREESOME COMPATIBILITY* 🌶️

${names.user1} and ${names.user2} have *${compatibilities.pair1}%* compatibility
${names.user1} and ${names.sender} have *${compatibilities.pair2}%* compatibility
${names.user2} and ${names.sender} have *${compatibilities.pair3}%* compatibility

${pickRandom([
    "What do you think about a spicy threesome? 😈",
    "This could get interesting... 😏",
    "Someone's getting lucky tonight! 💋",
    "The chemistry is real! 🔥",
    "Looks like a perfect match! 👌"
])}`;

    await conn.sendMessage(m.chat, { 
        image: { url: pp }, 
        caption: trioMessage, 
        mentions: [person1, person2, m.sender] 
    }, { quoted: m });
}

handler.help = ['threesome @user1 @user2', 'trio @user1 @user2'];
handler.tags = ['fun', 'nsfw'];
handler.command = ['threesome', 'trio', 'formartrio', 'trioheat'];
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}