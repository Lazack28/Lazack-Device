import { BaseCommand, Command, Message } from '../../Structures';
import { IArgs } from '../../Types';
import axios from 'axios';

@Command('advice', {
    description: 'Get a random piece of advice.',
    category: 'fun',
    aliases: ['ad'],
    usage: 'advice',
    cooldown: 5,
    exp: 5,
    dm: true
})
export default class AdviceCommand extends BaseCommand {
    public override execute = async (message: Message, args: IArgs): Promise<void> => {
        try {
            const response = await axios.get('https://api.adviceslip.com/advice');
            const advice = response.data.slip.advice;

            const formattedAdvice = `🌟 *Advice for you:* ${advice}`;
            message.reply(formattedAdvice);
        } catch (error) {
            message.reply('❌ An error occurred.');
        }
    };
}
