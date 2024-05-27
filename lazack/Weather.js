const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction");
const axios = require('axios');

zokou({ nomCom: "weather", reaction: "☁️", categorie: "Weather" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide the necessary information.");
    }

    // Translate the input using the 'traduire' function
    const translatedText = traduire(arg.join(' '), 'fr', 'en');

    // Call an API to get the weather forecast based on the translated location
    const response = await axios.get('https://example.com/api', { params: { location: translatedText } });

    // Process the response and send a reply with the weather forecast
    const weatherForecast = response.data.forecast;
    repondre(The weather forecast for ${arg.join(' ')} is: ${weatherForecast});
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    repondre("Oops, an error occurred while fetching the weather forecast.");
  }
});
