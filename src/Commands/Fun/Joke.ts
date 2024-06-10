import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from 'axios'

@Command('joke', {
    description: 'Sends a random joke.',
    category: 'fun',
    usage: 'joke',
    cooldown: 5,
    exp: 40,
    dm: true
})
  export default class JokeCommand extends BaseCommand {
    public override execute = async (message: Message, args: IArgs): Promise<void> => {
        try {
            const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
            const { category, setup, delivery } = response.data;
            const jokeText = `🎉 *Category:* ${category}\n💬 *Joke:* ${setup}\n🎁 *Delivery:* ${delivery}`;           
            message.reply(jokeText);
        } catch (error) {
            message.reply('⚠️ An error occurred while fetching the joke.');
        }
    }
}
          
