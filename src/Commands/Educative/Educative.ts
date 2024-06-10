import { BaseCommand, Command, Message } from '../../Structures'
import { proto } from '@whiskeysockets/baileys'

@Command('upload', {
    description: 'convert media to direct links limit 5MB for media.',
    category: 'educative',
    usage: 'upload [provide image/video/gif the message you want to upload]',
    aliases: ['tourl'],
    exp: 20,
    cooldown: 3
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        if (!M.hasSupportedMediaMessage && !M.quoted?.hasSupportedMediaMessage)
            return void M.reply('Provide an image/gif/video by captioning it as a message or by quoting it')
        let buffer!: Buffer
        if (M.hasSupportedMediaMessage) buffer = await M.downloadMediaMessage(M.message.message as proto.IMessage)
        else if (M.quoted && M.quoted.hasSupportedMediaMessage) buffer = await M.downloadMediaMessage(M.quoted.message)
        try {
            const result = await this.client.utils.bufferToUrl(buffer)
            return void (await M.reply(`*Media Uploaded To Telegraph* \n\n*Link:* ${result}`))
        } catch (error) {
            return void (await M.reply('An error occurred. Try again later'))
        }
    }
}
