import { Message, Command, BaseCommand } from '../../Structures'
import { IArgs } from '../../Types'

@Command('lyrics', {
    description: 'Sends the lyrics of a given song',
    usage: 'lyrics [song]',
    cooldown: 10,
    exp: 20,
    category: 'media'
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) return void (await M.reply('Provide the name of the song to search the lyrics'))
        const term = context.trim()
        const data = await this.client.utils.fetch<Lyrics[]>(`https://weeb-api.vercel.app/genius?query=${term}`)
        if (!data.length) return void (await M.reply(`Couldn't find any lyrics | *"${term}"*`))
        const buffer = await this.client.utils.getBuffer(data[0].image)
        let text = `🌿 *Title:* ${data[0].title} *(${data[0].fullTitle})*\n🍥 *Artist:* ${data[0].artist}`
        const lyrics = await this.client.utils.fetch<string>(`https://weeb-api.vercel.app/lyrics?url=${data[0].url}`)
        text += `\n\n${lyrics}`
        return void (await M.reply(buffer, 'image', undefined, undefined, text, undefined, {
            title: data[0].title,
            body: data[0].fullTitle,
            thumbnail: buffer,
            sourceUrl: data[0].url,
            mediaType: 1,
            mediaUrl: data[0].url
        }))
    }
}

interface Lyrics {
    title: string
    fullTitle: string
    artist: string
    image: string
    url: string
}
