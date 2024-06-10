import { BaseCommand, Command, Message } from '../../Structures';

const randomGreetings = [
    'Hello Human!',
    'Greetings!',
    'i want the smoke My crush 🥺❤️',
    'Hey there!',
    'Hi, how can I assist you today?'
];

@Command('alive', {
    description: 'Says alive',
    category: 'dev',
    usage: 'alive',
    aliases: ['alive'],
    exp: 25,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async ({ sender, reply }: Message): Promise<void> => {
        const randomIndex = Math.floor(Math.random() * randomGreetings.length)
        const randomGreeting = randomGreetings[randomIndex];
        await reply(`${randomGreeting} *${sender.username}*`)
    }
}
