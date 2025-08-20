const handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return conn.reply(m.chat, 
        `${emoji} Please enter your birth date in format YYYY MM DD\n> Example: ${usedPrefix + command} 2003 02 07`, 
        m
    );

    // Parse input date
    const [year, month, day] = text.split(' ').map(Number);
    if (!year || !month || !day) {
        return conn.reply(m.chat, 
            '⚠️ Invalid date format. Please use: YYYY MM DD\nExample: 2003 02 07', 
            m
        );
    }

    const birthDate = new Date(year, month - 1, day);
    if (isNaN(birthDate.getTime())) {
        return conn.reply(m.chat, 
            '❌ Invalid date. Please check your input', 
            m
        );
    }

    // Current date
    const now = new Date();
    const [currentYear, currentMonth, currentDay] = [
        now.getFullYear(), 
        now.getMonth() + 1, 
        now.getDate()
    ];

    // Calculate age
    let age = currentYear - year;
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        age--;
    }

    // Calculate next birthday
    let nextBirthdayYear = currentYear;
    if (currentMonth > month || (currentMonth === month && currentDay >= day)) {
        nextBirthdayYear++;
    }
    const nextBirthday = `${nextBirthdayYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Check if today is birthday
    const isBirthday = currentMonth === month && currentDay === day;
    
    // Get zodiac sign
    const zodiac = getZodiac(month, day);

    // Format response
    const response = `
✨ *Birthday Information* ✨

📅 Birth Date: ${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}
🎂 Next Birthday: ${nextBirthday}
🧮 Age: ${age} ${isBirthday ? '🎉 Happy Birthday!' : ''}
♈ Zodiac Sign: ${zodiac} ${getZodiacEmoji(zodiac)}

${getZodiacTraits(zodiac)}
`.trim();

    await conn.reply(m.chat, response, m);
};

handler.help = ['zodiac <YYYY MM DD>', 'birthinfo <YYYY MM DD>'];
handler.tags = ['fun', 'tools'];
handler.command = ['zodiac', 'birthinfo', 'zodia', 'horoscope'];
handler.group = true;
handler.register = true;

export default handler;

// Zodiac data with emojis and traits
const zodiacData = [
    { name: "Capricorn", start: [12, 22], end: [1, 19], emoji: "♑", traits: "Ambitious, disciplined, patient" },
    { name: "Aquarius", start: [1, 20], end: [2, 18], emoji: "♒", traits: "Innovative, humanitarian, independent" },
    { name: "Pisces", start: [2, 19], end: [3, 20], emoji: "♓", traits: "Compassionate, artistic, intuitive" },
    { name: "Aries", start: [3, 21], end: [4, 19], emoji: "♈", traits: "Courageous, energetic, optimistic" },
    { name: "Taurus", start: [4, 20], end: [5, 20], emoji: "♉", traits: "Reliable, patient, sensual" },
    { name: "Gemini", start: [5, 21], end: [6, 20], emoji: "♊", traits: "Adaptable, curious, quick-witted" },
    { name: "Cancer", start: [6, 21], end: [7, 22], emoji: "♋", traits: "Loyal, emotional, protective" },
    { name: "Leo", start: [7, 23], end: [8, 22], emoji: "♌", traits: "Charismatic, generous, warm-hearted" },
    { name: "Virgo", start: [8, 23], end: [9, 22], emoji: "♍", traits: "Analytical, practical, perfectionist" },
    { name: "Libra", start: [9, 23], end: [10, 22], emoji: "♎", traits: "Diplomatic, social, fair-minded" },
    { name: "Scorpio", start: [10, 23], end: [11, 21], emoji: "♏", traits: "Passionate, resourceful, determined" },
    { name: "Sagittarius", start: [11, 22], end: [12, 21], emoji: "♐", traits: "Adventurous, optimistic, philosophical" }
];

function getZodiac(month, day) {
    const date = new Date(1970, month - 1, day);
    for (const sign of zodiacData) {
        const startDate = new Date(1970, sign.start[0] - 1, sign.start[1]);
        const endDate = new Date(1970, sign.end[0] - 1, sign.end[1]);
        if (date >= startDate && date <= endDate) {
            return sign.name;
        }
    }
    return "Unknown";
}

function getZodiacEmoji(zodiacName) {
    const sign = zodiacData.find(s => s.name === zodiacName);
    return sign ? sign.emoji : "";
}

function getZodiacTraits(zodiacName) {
    const sign = zodiacData.find(s => s.name === zodiacName);
    return sign ? `🌟 Traits: ${sign.traits}` : "";
}