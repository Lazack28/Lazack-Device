/* CODED BY AJU
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');


Asena.addCommand({pattern: 'mood ?(.*)', fromMe: true}, (async (message, match) => {

    await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + ' *I am Searching This User’s Mood..* ', MessageType.text, {
        quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}

    });

    await new Promise(r => setTimeout(r, 4000));

    var r_text = new Array ();
r_text[0] = " *I am Looking at Old Messages From You..* ";
r_text[1] = " *I am Trying to Understand The Messages You Wrote..* ";
r_text[2] = " *I am Searching Your Daily Messages..* ";
r_text[3] = " *I am Trying to Understand The Emojis You Sent..* ";
r_text[4] = " *I am Trying to Understand Your Mood..* ";

var i = Math.floor(5*Math.random())

    await message.sendMessage(`${r_text[i]}`);

    await new Promise(r => setTimeout(r, 3700));

    var r_text = new Array ();
r_text[0] = " *Woaw, I Found Somethings Different* 🤭 ";
r_text[1] = " *Whoa, Look at Your Old Messages* 😯 ";
r_text[2] = " *Let’s See What We Got* 😝 ";
r_text[3] = " *I See Different Things* 😳";
r_text[4] = " *My Eyes!, Bleeding* 😱";
r_text[5] = " *What are These Messages?* 🤯";
r_text[6] = " *Interesting* 🤔";

var i = Math.floor(7*Math.random())

    await message.sendMessage(`${r_text[i]}`);

    await new Promise(r => setTimeout(r, 2000));

    var r_text = new Array ();
r_text[0] = " *I Gathered İnformation About You.* ✅";
r_text[1] = " *I Got The Necessary İnformation. It is time to see the result..* ";
r_text[2] = " *I am Using My Metaphysical Powers* 😎";
r_text[3] = " *I Can Now Guess The Result* ";
r_text[4] = " *Bip Bop. I Gat-her-ed Informant.* 🤖";
r_text[5] = " *Boss, I am Done. Calculating..* ";
r_text[6] = " *Finally, I Got an İdea About You* ";

var i = Math.floor(7*Math.random())

    await message.sendMessage(`${r_text[i]}`);

    await new Promise(r => setTimeout(r, 2100));

    var r_text = new Array ();
r_text[0] = "🤩 *So Happy* 😎";
r_text[1] = "😌 *Trying To Happy* ☺️";
r_text[2] = "✨ *Felling Perfect* 💯";
r_text[3] = "💔 *A Panda With a Broken Heart* 😣";
r_text[4] = "😑 *Dont Feel Anything* 😶";
r_text[5] = "😢 *Upset* 😞";
r_text[6] = "🤔 *Trying to Understand People* 😮";
r_text[7] = "🗑️ *Felling Like an Empty Can* 🗨️";
r_text[8] = "😋 *Starve* ⚰️";
r_text[9] = "🤒 *Sick* 🤢";
r_text[10] = " 😵 *Trying to Control Your Emotions* 😬";
r_text[11] = "😤 *Angy* 🗯️";
r_text[12] = "🤬 *Very Angry* 🔪";
r_text[13] = "💕 *Want to Interest* 🤗";
r_text[14] = "😍 *Fall in love* ♥️";
r_text[15] = "✉️ *Waiting a Message From Special One* 💫";
r_text[16] = "👻 *Psycho* 🤪";
r_text[17] = "🥱 *Want to Sleep* 😴";
r_text[18] = "😪 *Tired* 😩";
r_text[19] = "🚬 *Get bored of Life* 🏳️";
r_text[20] = "🎭 *Watching Movie* 📽️";
r_text[21] = "💞 *Fall in love Like Your Dreams* 🔥";
r_text[22] = "🎮 *Playing Games.* 🕹️";

var i = Math.floor(23*Math.random())

await message.sendMessage(`According To My Calculations🧐\nYou Are Now ${r_text[i]}`);


}));

Asena.addCommand({pattern: 'infomood', fromMe: true}, (async (message, match) => {
    
    await message.sendMessage('*Codded by Aju*\n💻Usage: *.mood <reply>*\nℹ️Desc: Finds what your responding one‘s moods.\n🆕 _Support Filters!_');

}));
