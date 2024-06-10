import { YT } from '../../lib'
import { Message, Command, BaseCommand } from '../../Structures'

@Command('yta', {
    description: 'Downloads and sends the video as an audio of the provided YouTube video link',
    cooldown: 10,
    category: 'media',
    exp: 25,
    usage: 'yta [link]',
    aliases: ['ytaudio']
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const urls = M.urls.filter((url) => url.includes('youtube.com') || url.includes('youtu.be'))
        if (!urls.length) return void M.reply('Provide a YouTube video URL to download, Baka!')
        const url = urls[0]
        const { validate, download } = new YT(url, 'audio')
        if (!validate()) return void M.reply('Provide a valid YouTube video URL, Baka!')
        const audio = await download()
        return void (await M.reply(audio, 'audio'))
    }
}
