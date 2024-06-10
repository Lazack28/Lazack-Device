import axios from 'axios';
import { BaseCommand, Command, Message } from '../../Structures';
import { IArgs } from '../../Types';

function pickRandom(list: any[]) {
  return list[Math.floor(list.length * Math.random())];
}

@Command('truth', {
  description: 'sends a random truth.',
  category: 'fun',
  aliases: ['tr'],
  usage: `truth`,
  cooldown: 5,
  exp: 5,
  dm: false
})
export default class extends BaseCommand {
  public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const shizokeys = 'shizo';
    try {
      await axios
        .get(`https://shizoapi.onrender.com/api/texts/truth?apikey=${shizokeys}`)
        .then((response) => {
          console.log(response); 
          const guru = `${response.data.result}`;
          M.reply(guru); 
        })
        .catch((err) => {
          M.reply(`✖ An error occurred: ${err}`)
        });
    } catch (err) {
      M.reply(`✖ An error occurred: ${err}`)
    }
  }
}
