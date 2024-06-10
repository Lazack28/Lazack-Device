import { Manga } from '@shineiichijo/marika'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('manga', {
    description: 'Searches a manga of the given query in MyAnimeList',
    category: 'anime',
    exp: 10,
    usage: 'manga [query]',
    cooldown: 20
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) return void M.reply('Provide a query for the search, Baka!')
        const query = context.trim()
        await new Manga()
            .searchManga(query)
            .then(async ({ data }) => {
                const result = data[0]
                let text = `🎀 *Title:* ${result.title}\n🎋 *Format:* ${
                    result.type
                }\n📈 *Status:* ${this.client.utils.capitalize(
                    result.status.toLowerCase().replace(/\_/g, ' ')
                )}\n🍥 *Total chapters:* ${result.chapters}\n🎈 *Total volumes:* ${
                    result.volumes
                }\n🧧 *Genres:* ${result.genres.map((genre) => genre.name).join(', ')}\n💫 *Published on:* ${
                    result.published.from
                }\n🎗 *Ended on:* ${result.published.to}\n🎐 *Popularity:* ${result.popularity}\n🎏 *Favorites:* ${
                    result.favorites
                }\n🏅 *Rank:* ${result.rank}\n\n`
                if (result.background !== null) text += `🎆 *Background:* ${result.background}*\n\n`
                text += `❄ *Description:* ${result.synopsis}`
                const image = await this.client.utils.getBuffer(result.images.jpg.large_image_url)
                return void (await M.reply(image, 'image', undefined, undefined, text, undefined, {
                    title: result.title,
                    mediaType: 1,
                    thumbnail: image,
                    sourceUrl: result.url
                }))
            })
            .catch(() => {
                return void M.reply(`No manga found | *"${query}"*`)
            })
    }
}
