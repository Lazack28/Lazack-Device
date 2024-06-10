import { BaseCommand, Command, Message } from '../../Structures'

@Command('rpaper', {
    description: 'Sends random anime wallpaper',
    category: 'utils',
    cooldown: 30,
    exp: 20,
    usage: 'rpaper'
})
export default class command extends BaseCommand {
    override execute = async ({ reply }: Message): Promise<void> => {
        const { url } = await this.client.utils.fetch<{ url: string }>(
            'https://meme-api.herokuapp.com/gimme/animewallpaper'
        )
        return void (await reply(await this.client.utils.getBuffer(url), 'image'))
    }
}
