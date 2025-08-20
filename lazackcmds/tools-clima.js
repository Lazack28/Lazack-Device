import axios from "axios";

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    // If no city/country is given
    let resp = `${emoji} Enter the name of your Country or City.`;
    let txt = '';
    let count = 0;

    // Typing effect (sends one character at a time)
    for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }

    // Send the message
    await conn.sendMessage(
      m.chat, 
      { text: txt.trim(), mentions: conn.parseMention(txt) }, 
      { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 }
    );
    return;
  }

  try {
    // Call OpenWeather API
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
    const res = response.data;

    // Extract weather info
    const name = res.name;
    const Country = res.sys.country;
    const Weather = res.weather[0].description;
    const Temperature = res.main.temp + "°C";
    const Minimum_Temperature = res.main.temp_min + "°C";
    const Maximum_Temperature = res.main.temp_max + "°C";
    const Humidity = res.main.humidity + "%";
    const Wind = res.wind.speed + "km/h";

    // Format weather report in English
    const wea = `「 📍 」LOCATION: ${name}
「 🗺️ 」COUNTRY: ${Country}
「 🌤️ 」WEATHER: ${Weather}
「 🌡️ 」TEMPERATURE: ${Temperature}
「 💠 」MIN TEMPERATURE: ${Minimum_Temperature}
「 📛 」MAX TEMPERATURE: ${Maximum_Temperature}
「 💦 」HUMIDITY: ${Humidity}
「 🌬️ 」WIND: ${Wind}`.trim();

    // Typing effect again
    let txt = '';
    let count = 0;
    for (const c of wea) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }

    await conn.sendMessage(
      m.chat, 
      { text: txt.trim(), mentions: conn.parseMention(txt) }, 
      { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 }
    );
  } catch (e) {
    // If city/country is not found
    let resp = `${msm} Error!\n No results found, try entering an existing country or city.`;
    let txt = '';
    let count = 0;
    for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }
    await conn.sendMessage(
      m.chat, 
      { text: txt.trim(), mentions: conn.parseMention(txt) }, 
      { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 }
    );
  }
};

// Help & command settings (now in English)
handler.help = ['weather *<city/country>*'];
handler.tags = ['tools'];
handler.command = ['weather', 'climate', 'forecast']

export default handler;
