

import fetch from 'node-fetch';

let handler = async (m, { text, command, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, 'GitHub repository.\n\n`Example:`\n' + `> *${usedPrefix + command}* Lazack-Device`, m, rcanal);
  
  await m.react('🕓');

  try {
    const res = await fetch(global.API('https://api.github.com', '/search/repositories', {
      q: text
    }));
    
    const json = await res.json();
    if (res.status !== 200) throw json;

    if (json.items.length > 0) {
      let txt = '`乂  G I T H U B - S T A T S`\n\n';
      
      json.items.forEach((repo, i) => {
        txt += `    ✩  *Nro* : ${i + 1}\n`;
        txt += `    ✩  *Name of repository* : ${repo.full_name}\n`;
        txt += `    ✩  *URL* : ${repo.html_url}\n`;
        txt += `    ✩  *Created on* : ${formatDate(repo.created_at)}\n`;
        txt += `    ✩  *Updated on* : ${formatDate(repo.updated_at)}\n`;
        txt += `    ✩  *Watchers* : ${repo.watchers}\n`;
        txt += `    ✩  *Forks* : ${repo.forks}\n`;
        txt += `    ✩  *Stars* : ${repo.stargazers_count}\n`;
        txt += `    ✩  *Issues* : ${repo.open_issues}\n`;
        txt += `    ✩  *Description* : ${repo.description || 'Sin descripción'}\n`;
        txt += `    ✩  *Clone* : \`\`\`$ git clone ${repo.clone_url}\`\`\`\n\n`;
      });
      
      await m.reply(txt);
      await m.react('✅');
    } else {
      await m.react('✖️');
      await m.reply('No se encontraron repositorios para esta búsqueda.', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await m.reply('Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
}

handler.tags = ['internet'];
handler.help = ['githubsearch *<búsqueda>*'];
handler.command = /^g(ithub|h)s(earch)?$/i;
handler.register = true;

export default handler;

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
    }
