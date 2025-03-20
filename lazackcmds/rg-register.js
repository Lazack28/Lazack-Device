//import db from '../lib/database.js'
import { createHash } from 'crypto';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {
    let user = global.db.data.users[m.sender];
    let senderName = conn.getName(m.sender);

    if (user.registered) {
        throw `✅ *You are already registered!*  
        
🔄 Do you want to re-register?  
🗑️ Use *${usedPrefix}unreg <Serial Number>* to remove your record.`;
    }

    if (!Reg.test(text)) {
        throw `⚠️ *Incorrect format!*  
        
📝 Use: *${usedPrefix + command} name.age*  
📌 Example: *${usedPrefix + command}* ${senderName}.16`;
    }

    let [_, name, , age] = text.match(Reg);
    
    if (!name) throw '⚠️ *Name cannot be empty!*';
    if (!age) throw '⚠️ *Age cannot be empty!*';
    if (name.length >= 30) throw '⚠️ *Name is too long! (Max: 30 characters)*';
    
    age = parseInt(age);
    
    if (isNaN(age)) throw '⚠️ *Invalid age format!*';
    if (age > 100) throw '👴🏻 *Whoa, grandpa wants to play with the bot!*';
    if (age < 5) throw '🚼 *Are you a baby trying to register?* 😂';

    // Register user
    user.name = name.trim();
    user.age = age;
    user.regTime = +new Date();
    user.registered = true;

    // Generate Serial Number
    let serialNumber = createHash('md5').update(m.sender).digest('hex');

    // Success message
    m.reply(
        `🎉 *Registration Successful!*  
        
📌 *Name:* ${name}  
🎂 *Age:* ${age} years  
🔢 *Serial Number:*  
${serialNumber}  

✅ *Use ${usedPrefix}help to see available commands!*`
    );
}

handler.help = ['reg'].map(v => v + ' <name.age>');
handler.tags = ['register'];
handler.command = ['verify', 'reg', 'register', 'registrar'];

export default handler;
