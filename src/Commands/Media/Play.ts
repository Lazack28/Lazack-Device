import { YT } from '../../lib'
import { Command, BaseCommand, Message } from '../../Structures'
import { IArgs, YT_Search } from '../../Types'

@Command('play', {
    description: 'Plays a song of the given term from YouTube',
    cooldown: 15,
    exp: 35,
    category: 'media',
    usage: 'play [term]'
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) return void M.reply('Provide a term to play, Baka!')
        const term = context.trim()
        const randomPhrase = [
            '*Dance to the rhythm of joy! 💃*',
            '*Prepare for an audio delight! 🎶*',
            '*Your playlist just got cooler! ❄️*',
            '*Feel the beats and let loose! 💫*',
            '*Musical enchantment incoming! 🌈*',
            '*Feel the beats and let loose! 💫*',
            '*The beats await your presence! 🎵*',
            '*Embrace the sonic adventure! 🚀*',
            '*Turn up the volume and let it resonate! 🔊*',
        ]
        const randomIndex = Math.floor(Math.random() * randomPhrase.length)
        M.reply(randomPhrase[randomIndex])

        const videos = await this.client.utils.fetch<YT_Search[]>(`https://weeb-api.vercel.app/ytsearch?query=${term}`)
        if (!videos || !videos.length) return void M.reply(`No matching songs found | *"${term}"*`)
        const buffer = await new YT(videos[0].url, 'audio').download()
        return void (await M.reply(buffer, 'audio', undefined, 'audio/mpeg', undefined, undefined, {
            title: videos[0].title,
            thumbnail: await this.client.utils.getBuffer(videos[0].thumbnail),
            mediaType: 2,
            body: videos[0].description,
            mediaUrl: videos[0].url
        }))
    }
}
