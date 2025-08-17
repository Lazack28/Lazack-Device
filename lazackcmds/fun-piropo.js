const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

var handler = async (m, { conn, text }) => {
  conn.reply(m.chat, `${emoji2} Searching for a compliment, please wait...`, m);
  
  const compliment = pickRandom(global.compliments);
  const formattedMsg = `*┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n❥ *"${compliment}"*\n\n*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`;
  
  conn.reply(m.chat, formattedMsg, m);
};

handler.help = ['compliment'];
handler.tags = ['fun'];
handler.command = ['compliment', 'flirt'];
handler.fail = null;
handler.exp = 0;
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

global.compliments = [
  "If your body were a prison and your lips chains, what a beautiful place to serve my sentence.",
  "You’re a two-for-one deal: gorgeous *and* charming!",
  "Science has evolved—now even chocolates can walk.",
  "I’d trade the moon for a kiss, the sun for all it’s worth, but for the light in your eyes, I’d give my soul on Earth.",
  "If I were a plane and you an airport, I’d spend my life landing on your runway.",
  "So many stars in the sky, yet none shine as bright as you.",
  "I like coffee, but I’d rather *have-tea* (have you).",
  "You’re not Google, but you’ve got everything I search for.",
  "My desire for you doesn’t fade—it stacks up like unpaid bills.",
  "Here’s a flower, though none could ever be as beautiful as you.",
  "When you get fined for ‘excessive beauty,’ I’ll pay the ticket.",
  "If every drop on your skin were a kiss, I’d turn into a storm.",
  "You’re the kind of person stars wish upon.",
  "If loving you is a sin, I’ll book my spot in hell now.",
  "Disneyland claims to be the happiest place on Earth. Clearly, they’ve never stood next to you.",
  "Are you Wi-Fi? Because I’m feeling a *strong connection*.",
  "Is your dad a boxer? Because damn, you’re a knockout!",
  "You must be tired—you’ve been running through my mind all day.",
  "Roses are red, my face is too—but only when I’m blushing over you.",
  "I’d complain to Spotify for not making you this week’s top hit.",
  "If we were socks, we’d make the perfect pair.",
  "I’m not a photographer, but I can picture us together.",
  "You’re the reason Santa keeps a *naughty list*.",
  "Are you a time traveler? Because I see you in my future.",
  "Let’s make a deal: You stop being so sweet, and I’ll stop getting cavities.",
  "You must be a magician—every time I look at you, everyone else disappears.",
  "I’d call you ‘art,’ but even the Louvre doesn’t deserve you.",
  "Is your name Netflix? Because I could binge-watch you for hours.",
  "If beauty were time, you’d be *eternity*.",
  "I’d lend you my heart, but you already stole it."
];