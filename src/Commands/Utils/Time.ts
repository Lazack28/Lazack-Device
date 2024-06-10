import { BaseCommand, Command, Message } from '../../Structures';
import { IArgs } from '../../Types';
import moment from 'moment-timezone';

@Command('gettime', {
    description: 'Get current date and time for specified countries',
    category: 'utils',
    usage: 'gettime <country1> <country2> ...',
    cooldown: 5,
    aliases: ['tm'],
    exp: 10,
    dm: true
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        const timezones = context.split(' ');

        if (!timezones.length) {
            M.reply('Please provide at least one time zone.');
            return;
        }

        const result = timezones.map((timezone: string) => {
            const dateTime = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
            return `${timezone}: ${dateTime}`;
        });

        // Adding Tanzania explicitly
        const tanzaniaTime = moment().tz('Africa/Dar_es_Salaam').format('YYYY-MM-DD HH:mm:ss');
        result.push(`Tanzania: ${tanzaniaTime}`);

        M.reply(`Current date and time for specified time zones:\n${result.join('\n')}`);
    };
}
