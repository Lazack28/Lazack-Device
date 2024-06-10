import { BaseCommand, Command, Message } from '../../Structures'

@Command('loli', {
    description: 'Sends a random nsfw loli image',
    category: 'anime',
    usage: 'loli',
    exp: 20,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const buffer = await this.client.utils.getBuffer('https://loliapi.com/bg')
        return void (await M.reply(buffer, 'image'))
    }
}
