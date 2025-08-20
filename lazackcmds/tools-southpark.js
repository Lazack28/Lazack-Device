

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  
  // If the user didn't provide a country name
  if (!text) 
    return m.reply(m.chat, `${emoji} Please enter the name of a country.`, m);

  try {
    // API to get country info
    let api = `https://delirius-apiofc.vercel.app/tools/flaginfo?query=${text}`;

    let response = await fetch(api);
    let json = await response.json();
    let datas = json.data;

    // Build the reply text with country info
    let infoText = `🍭 *Information About:* ${text}\n\n` +
                   `🍬 *Official Name:* ${datas.officialName}\n` +
                   `🍰 *Organization:* ${datas.memberOf}\n` +
                   `🔖 *Capital:* ${datas.capitalCity}\n` +
                   `🗺️ *Continent:* ${datas.continent}\n` +
                   `👥 *Population:* ${datas.population}\n` +
                   `💬 *Calling Code:* ${datas.callingCode}\n` +
                   `💸 *Currency:* ${datas.currency}\n` +
                   `📜 *Description:* ${datas.description}`;

    let img = datas.image;

    // Send the country flag image with caption
    conn.sendMessage(m.chat, { image: { url: img }, caption: infoText }, { quoted: fkontak });

  } catch (e) {
    m.reply(`${msm} An error occurred: ${e.message}`);
    m.react('✖️');
  }
};

handler.command = ['countryinfo', 'flag'];

export default handler;
