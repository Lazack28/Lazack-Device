import { BaseCommand, Command, Message } from '../../Structures';
import { IArgs } from '../../Types';
import axios from 'axios';

const dareList = [
    "Sing a song loudly for 30 seconds.",
    "Balance a spoon on your nose for one minute without it falling off.",
    "i dare you to send your nudes in the group",
    "i dare you to tell dk hitman a joke",
    "Go outside and dance like nobody's watching for one minute.",
    "i dare you to tell your step Daddy that you crushing on him",
    "Call a friend and speak in a British accent for the next conversation.",
    "i dare you to tell me how did you lost your virginity",
    "Do a handstand against a wall for as long as you can hold it.",
    "i dare you to tell your mom that you pregnant",
    "Put on a blindfold and try to identify three different objects just by touching them.",
    "Tell a funny joke to someone in the server.",
    "Text your crush and tell them a fun fact about yourself that you've never shared before.",
    "Create a short rap about a random object in the room and perform it for everyone.",
    "Send a text to someone you haven't spoken to in a while and tell them a funny joke.",
];

const getRandomDare = (): string => {
    const randomIndex = Math.floor(Math.random() * dareList.length);
    return dareList[randomIndex];
};

@Command('dare', {
    description: 'Will send you dare.',
    aliases: ['dr'],
    category: 'fun',
    usage: `dare`,
    cooldown: 5,
    exp: 30,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        const dare = getRandomDare();
        await M.reply(dare);
    };
}
