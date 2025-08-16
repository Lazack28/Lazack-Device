const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text}) => {

conn.reply(m.chat, `${emoji2} Searching for a phrase, please wait a moment...`, m)

conn.reply(m.chat, `*┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n❥ *"${pickRandom(global.frases)}"*\n\n*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`, m)

}
handler.help = ['phrase']
handler.tags = ['fun']
handler.command = ['phrase']
handler.fail = null
handler.exp = 0
handler.group = true;
handler.register = true

export default handler

let hasil = Math.floor(Math.random() * 5000)
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}

global.frases = [
    "Remember that you cannot fail at being yourself. (Wayne Dyer)",
    "It is always too early to give up. (Jorge Álvarez Camacho)",
    "Only one thing makes a dream impossible: the fear of failure. (Paulo Coelho)",
    "What you do today can improve all your tomorrows. (Ralph Marston)",
    "Fall seven times and get up eight. (Japanese proverb)",
    "Nothing happens until something moves. (Albert Einstein)",
    "Happiness is hidden in the waiting room of happiness. (Eduard Punset)",
    "The true seeker grows and learns, and discovers that he is always the main person responsible for what happens. (Jorge Bucay)",
    "Life begins at the end of your comfort zone. (Neale Donald Walsch)",
    "Self-confidence is the first secret of success. (Ralph Waldo Emerson)",
    "There is no way to peace, peace is the way. (Mahatma Gandhi)",
    "Life is what happens while you are busy making other plans. (John Lennon)",
    "Life is 10% what happens to me and 90% how I react to it. (Charles R. Swindoll)",
    "The only way to do great work is to love what you do. (Steve Jobs)",
    "It doesn't matter how slowly you go, as long as you do not stop. (Confucius)",
    "Don't worry if you don't succeed, you can always be a good example of how not to do it.",
    "The only reason I'm in shape is because I'm round.",
    "I'm multitasking: I can procrastinate, ignore, and forget at the same time.",
    "If life gives you lemons, ask for salt and tequila.",
    "Laughter is the shortest distance between two people.",
    "I'm not completely useless, at least I serve as a bad example.",
    "Sometimes the greatest adventure is simply an act of bravery.",
    "I'm lazy, but I don't like being called lazy.",
    "If you can't convince them, confuse them.",
    "Life is short, make it count.",
    "Life is a comedy written by a playwright who is a bit deaf.",
    "Do it or don't do it, but don't try.",
    "Happiness is not a destination, it's a way of traveling. (Margaret Lee Runbeck)",
    "Time flies, but I am the pilot.",
    "I'm not lazy, I'm in energy-saving mode.",
    "Life is like riding a bicycle. To keep your balance, you must keep moving. (Albert Einstein)",
    "Never argue with a fool, he will drag you down to his level and beat you with experience.",
    "Yesterday was the deadline for all my problems.",
    "The only way to do great work is to love what you do. (Steve Jobs)",
    "Life is a challenge, face it.",
    "If you don't have a plan, you're planning to fail.",
    "Life is an adventure, dare to live it."
];