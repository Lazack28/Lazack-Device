import TrackDetails from 'spotifydl-x/dist/lib/details/Track'
import { Spotify } from '../../lib'
import { Command, BaseCommand, Message } from '../../Structures'

@Command('spotify', {
    description: 'Downloads and sends the track of thr given spotify track URL',
    aliases: ['sp'],
    usage: 'spotify [track_url]',
    cooldown: 10,
    category: 'media',
    exp: 25
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        M.urls = M.urls.filter((url) => url.includes('open.spotify.com'))
        if (!M.urls.length) return void M.reply('Provide a spotify track URL to download, Baka!')
        const spotify = new Spotify(M.urls[0])
        const info = await spotify.getInfo()
        if ((info as { error: string }).error) return void M.reply('Provide a valid spotify track URL, Baka!')
        const { name, artists, album_name, release_date, cover_url } = info as TrackDetails
        const text = `🎧 *Title:* ${name || ''}\n🎤 *Artists:* ${(artists || []).join(
            ','
        )}\n💽 *Album:* ${album_name}\n📆 *Release Date:* ${release_date || ''}`
        await M.reply(await this.client.utils.getBuffer(cover_url), 'image', undefined, undefined, text)
        const buffer = await spotify.download()
        return void (await M.reply(buffer, 'audio'))
    }
}
