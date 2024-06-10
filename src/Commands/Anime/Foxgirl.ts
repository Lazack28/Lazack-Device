import { BaseCommand, Command, Message } from '../../Structures'

@Command('foxgirl', {
    description: 'Sends a random fox_girl image',
    category: 'anime',
    usage: 'foxgirl',
    exp: 20,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async ({ reply }: Message): Promise<void> => {
        const { url } = await this.client.utils.fetch<{ url: string }>('https://nekos.life/api/v2/img/fox_girl')
        return void (await reply(await this.client.utils.getBuffer(url), 'image'))
    }
}
