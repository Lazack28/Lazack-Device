const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text}) => {

conn.reply(m.chat, `${emoji2} Looking for a joke, please wait a moment...`, m)

conn.reply(m.chat, `*┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n❥ *"${pickRandom(global.chiste)}"*\n\n*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`, m)

}
handler.help = ['joke']
handler.tags = ['fun']
handler.command = ['joke']
handler.fail = null
handler.exp = 0
handler.group = true;
handler.register = true

export default handler

let hasil = Math.floor(Math.random() * 5000)
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}

global.chiste = [
    "What was the last animal to get on Noah's Ark? The dolph-in.",
    "How do you say handkerchief in Japanese? Saka-moko.",
    "How do you say shot in Arabic? There-goes-the-bullet.",
    "What does one worm say to another worm? I'm going to take a walk around the apple.",
    "A cat starts barking on the roof of a house. Another cat, surprised, says: You're crazy cat, why are you barking instead of meowing? The kitten replies: Can't I learn another language?",
    "The doctor says to the patient: take a deep breath, I'm going to auscultate you. The patient replies: Doctor, who are you going to hide me from? I don't owe anyone anything.\nThe doctor comes out after a birth and the father asks: Doctor, how did everything go? The doctor says: Everything went well, but we had to give the baby oxygen. The father, horrified, says: But doctor, we wanted to name him Gabriel.",
    "A fish asks another fish: What does your mom do? He answers: She swims, what about yours? She swims too.",
    "What's Aladdin's biggest irony? Having a bad genie.",
    "The teacher says to the student after correcting his homework: Your work moved me. The student, surprised, asks: Why is that, teacher? The teacher, mocking, says: Because it made me feel sorry.",
    "The boy says to his mother: Mom, I don't want to play with Pedrito anymore. The mother asks: Why not? Because when we play with wooden blocks and I hit him on the head, he suddenly starts crying.",
    "Juanito's teacher asks: Juanito, what would you do if you were drowning in the pool? Juanito replies: I'd cry a lot to get it off my chest.",
    "Mom, I look fat, ugly, and old. What do I have, son, what do I have? Mom, you're absolutely right.",
    "How do you say dirty hair in Chinese? Chin cham pu.",
    "Once upon a time there was a boy so, so, so absent-minded that... never mind, I forgot the joke!",
    "A friend says to another: How's married life? Well, I can't complain, she says. So it's going very well, right? No, I can't complain because my husband is right here next to me.",
    "Why do seals always look up? Because that's where the spotlights are!",
    "Waiter, this steak is very nervous. Well, that's normal, it's the first time it's being eaten.",
    "What's Bruce Lee's cousin's name? Broco Lee.",
    "A mother says to her son: Jaimito, a little bird told me you do drugs. You're the one who does drugs, you talk to little birds."
]