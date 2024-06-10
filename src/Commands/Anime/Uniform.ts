import { BaseCommand, Command, Message } from '../../Structures'

@Command('uniform', {
    description: 'Sends a random uniform image',
    category: 'anime',
    usage: 'uniform',
    exp: 20,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async ({ reply }: Message): Promise<void> => {
        const { url } = await this.client.utils.fetch<{ url: string }>('https://api.waifu.im/search/?included_tags=uniform')
        return void (await reply(await this.client.utils.getBuffer(url), 'image'))
    }
}
