import { canLevelUp } from '../lib/levelling.js'

const roles = {
'*Adventurer - Novice V*': 0,
'*Adventurer - Novice IV*': 2,
'*Adventurer - Novice III*': 4,
'*Adventurer - Novice II*': 6,
'*Adventurer - Novice I*': 8,
'*Path Apprentice V*': 10,
'*Path Apprentice IV*': 12,
'*Path Apprentice III*': 14,
'*Path Apprentice II*': 16,
'*Path Apprentice I*': 18,
'*Valley Explorer V*': 20,
'*Valley Explorer IV*': 22,
'*Valley Explorer III*': 24,
'*Valley Explorer II*': 26,
'*Valley Explorer I*': 28,
'*Dawn Warrior V*': 30,
'*Dawn Warrior IV*': 32,
'*Dawn Warrior III*': 34,
'*Dawn Warrior II*': 36,
'*Dawn Warrior I*': 38,
'*Forest Guardian V*': 40,
'*Forest Guardian IV*': 42,
'*Forest Guardian III*': 44,
'*Forest Guardian II*': 46,
'*Forest Guardian I*': 48,
'*Twilight Mage V*': 50,
'*Twilight Mage IV*': 52,
'*Twilight Mage III*': 54,
'*Twilight Mage II*': 56,
'*Twilight Mage I*': 58,
'*Crown Hero V*': 60,
'*Crown Hero IV*': 62,
'*Crown Hero III*': 64,
'*Crown Hero II*': 66,
'*Crown Hero I*': 68,
'*Diamond Paladin V*': 70,
'*Diamond Paladin IV*': 72,
'*Diamond Paladin III*': 74,
'*Diamond Paladin II*': 76,
'*Diamond Paladin I*': 78,
'*Star Master V*': 80,
'*Star Master IV*': 85,
'*Star Master III*': 90,
'*Star Master II*': 95,
'*Star Master I*': 99,
'*Valley Legend V*': 100,
'*Valley Legend IV*': 110,
'*Valley Legend III*': 120,
'*Valley Legend II*': 130,
'*Valley Legend I*': 140,
'*Kingdom Sovereign V*': 150,
'*Kingdom Sovereign IV*': 160,
'*Kingdom Sovereign III*': 170,
'*Kingdom Sovereign II*': 180,
'*Kingdom Sovereign I*': 199,
'*Northern Titan V*': 200,
'*Northern Titan IV*': 225,
'*Northern Titan III*': 250,
'*Northern Titan II*': 275,
'*Northern Titan I*': 299,
'*Light Guardian V*': 300,
'*Light Guardian IV*': 325,
'*Light Guardian III*': 350,
'*Light Guardian II*': 375,
'*Light Guardian I*': 399,
'*Magic Master V*': 400,
'*Magic Master IV*': 425,
'*Magic Master III*': 450,
'*Magic Master II*': 475,
'*Magic Master I*': 499,
'*Warlord V*': 500,
'*Warlord IV*': 525,
'*Warlord III*': 550,
'*Warlord II*': 575,
'*Warlord I*': 599,
'*Immortal Hero V*': 600,
'*Immortal Hero IV*': 625,
'*Immortal Hero III*': 650,
'*Immortal Hero II*': 675,
'*Immortal Hero I*': 699,
'*Reality Master V*': 700,
'*Reality Master IV*': 725,
'*Reality Master III*': 750,
'*Reality Master II*': 775,
'*Reality Master I*': 799,
'*Eternal Sage V*': 800,
'*Eternal Sage IV*': 825,
'*Eternal Sage III*': 850,
'*Eternal Sage II*': 875,
'*Eternal Sage I*': 899,
'*Multiverse Traveler V*': 900,
'*Multiverse Traveler IV*': 925,
'*Multiverse Traveler III*': 950,
'*Multiverse Traveler II*': 975,
'*Multiverse Traveler I*': 999,
'*Eternity Deity V*': 1000,
'*Eternity Deity IV*': 2000,
'*Eternity Deity III*': 3000,
'*Eternity Deity II*': 4000,
'*Eternity Deity I*': 5000,
'*Grand Monarch of Shadows*': 10000,
}

let handler = m => m
handler.before = async function (m, { conn }) {
    
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[m.sender]
    
    let level = user.level
    let before = user.level * 1
    
    while (canLevelUp(user.level, user.exp, global.multiplier)) 
        user.level++
    
    if (before !== user.level) {
        let special = 'coin'
        let special2 = 'exp'
        let specialAmount = Math.floor(Math.random() * (100 - 10 + 1)) + 10
        let specialAmount2 = Math.floor(Math.random() * (100 - 10 + 1)) + 10

        if (user.level % 5 === 0) {
            user[special] += specialAmount
            user[special2] += specialAmount2
        }
    }

    let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([, minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
    user.role = role

    return !0
}

export default handler
