import { Wallpaper } from '../../lib'
import { IArgs } from '../../Types'
import { BaseCommand, Command, Message } from '../../Structures'

@Command('anime-wallpaper', {
    description: 'Sends wallpaper of the given query',
    category: 'anime',
    aliases: ['aw'],
    usage: 'wallpaper [query]',
    cooldown: 25,
    exp: 25
})
export default class command extends BaseCommand {
    override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) return void M.reply('Provide the search term')
        const terms = context.trim().split('|')
        let wall = await new Wallpaper(terms[0].trim()).fetchImages()
        if (wall.length < 1)
            return void M.reply(`Couldn\'t find any wallpaper of the given query | *"${terms[0].trim()}"*`)
        return void (await M.reply(await this.client.utils.getBuffer(wall[0]), 'image'))
    }
}
