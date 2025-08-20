import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `${emoji} Please enter the Pokémon name you want to search.`, m);
  
  await m.react(rwait);
  conn.reply(m.chat, `${emoji2} Searching for *<${text}>*, please wait...`, m);
  
  const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    
    if (!response.ok) {
      await m.react(error);
      return conn.reply(m.chat, '⚠️ An error occurred while searching for the Pokémon.', m);
    }

    const pokedexInfo = `
${emoji} *Pokédex - ${json.name} Info*\n
☁️ *Name:* ${json.name}
🔖 *ID:* ${json.id}
💬 *Type:* ${json.type}
💪 *Abilities:* ${json.abilities}
🎴 *Height:* ${json.height}
⚖️ *Weight:* ${json.weight}\n
📖 *Description:*
${json.description}\n
🔍 Find more details about this Pokémon in the Pokédex!
🔗 https://www.pokemon.com/us/pokedex/${json.name.toLowerCase()}
    `;
    
    conn.reply(m.chat, pokedexInfo, m);
    await m.react(done);
  } catch (err) {
    await m.react(error);
    conn.reply(m.chat, '⚠️ Failed to fetch Pokémon data. Check the name or try again later.', m);
  }
};

handler.help = ['pokedex *<pokemon>*'];
handler.tags = ['fun'];
handler.group = true;
handler.register = true;
handler.command = ['pokedex', 'pokemon'];

export default handler;