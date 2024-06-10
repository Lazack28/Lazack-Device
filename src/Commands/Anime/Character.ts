import { Character } from '@shineiichijo/marika'
import { Command, BaseCommand, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('character', {
    description: 'Searches a character of the given query in MyAnimeList',
    usage: 'character [query]',
    category: 'anime',
    aliases: ['chara'],
    exp: 20,
    cooldown: 15
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) return void M.reply('Provide a query for the search, Baka!')
        const query = context.trim()
        await new Character()
            .searchCharacter(query)
            .then(async ({ data }) => {
                const chara = data[0]
                let source!: string
                await new Character()
                    .getCharacterAnime(chara.mal_id)
                    .then((res) => (source = res.data[0].anime.title))
                    .catch(async () => {
                        await new Character()
                            .getCharacterManga(chara.mal_id.toString())
                            .then((res) => (source = res.data[0].manga.title))
                            .catch(() => (source = ''))
                    })
                let text = `💙 *Name:* ${chara.name}\n💚 *Nicknames:* ${chara.nicknames.join(
                    ', '
                )}\n💛 *Source:* ${source}`
                if (chara.about !== null) text += `\n\n❤ *Description:* ${chara.about}`
                const image = await this.client.utils.getBuffer(chara.images.jpg.image_url)
                return void (await M.reply(image, 'image', undefined, undefined, text, undefined, {
                    title: chara.name,
                    mediaType: 1,
                    thumbnail: image,
                    sourceUrl: chara.url
                }))
            })
            .catch(() => {
                return void M.reply(`No character found | *"${query}"*`)
            })
    }
}
