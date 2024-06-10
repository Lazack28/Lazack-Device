import { Anime } from '@shineiichijo/marika'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('anime', {
    description: 'Searches an anime of the given query in MyAnimeList',
    aliases: ['ani'],
    category: 'anime',
    usage: 'anime [query]',
    exp: 20,
    cooldown: 20
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) return void M.reply('Provide a query for the search, Baka!')
        const query = context.trim()
        await new Anime()
            .searchAnime(query)
            .then(async ({ data }) => {
                const result = data[0]
                let text = `🎀 *Title:* ${result.title}\n🎋 *Format:* ${
                    result.type
                }\n📈 *Status:* ${this.client.utils.capitalize(
                    result.status.toLowerCase().replace(/\_/g, ' ')
                )}\n🍥 *Total episodes:* ${result.episodes}\n🎈 *Duration:* ${
                    result.duration
                }\n🧧 *Genres:* ${result.genres
                    .map((genre) => genre.name)
                    .join(', ')}\n✨ *Based on:* ${this.client.utils.capitalize(
                    result.source.toLowerCase()
                )}\n📍 *Studios:* ${result.studios
                    .map((studio) => studio.name)
                    .join(', ')}\n🎴 *Producers:* ${result.producers
                    .map((producer) => producer.name)
                    .join(', ')}\n💫 *Premiered on:* ${result.aired.from}\n🎗 *Ended on:* ${
                    result.aired.to
                }\n🎐 *Popularity:* ${result.popularity}\n🎏 *Favorites:* ${result.favorites}\n🎇 *Rating:* ${
                    result.rating
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
                return void M.reply(`Couldn't find any anime | *"${query}"*`)
            })
    }
}
