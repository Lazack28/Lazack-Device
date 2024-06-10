import { BaseCommand, Command, Message } from '../../Structures'

@Command('lolii', {
    description: 'Sends a random nsfw loli image',
    category: 'fun',
    usage: 'lolii',
    exp: 20,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const prefix = this.client.config.prefix
        const buttons = [{ buttonId: `${prefix}loli`, buttonText: { displayText: 'NEXT ➡️' }, type: 1 }]
        const buttonMessage = {
            image: { url: 'https://weeb-api.up.railway.app/loli' },
            caption: '*Here, you go!*',
            footer: `${this.client.config.name}`,
            buttons: buttons,
            headerType: 1
        }
        return void (await this.client.sendMessage(M.from, buttonMessage))
    }
} 
