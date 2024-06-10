import { BaseCommand, Command, Message } from '../../Structures'

@Command('img', {
    description: 'Converts sticker to image',
    exp: 35,
    category: 'utils',
    aliases: ['toimg'],
    usage: 'img [quote_sticker]',
    cooldown: 25
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        if (!M.quoted || (M.quoted && M.quoted.type !== 'stickerMessage'))
            return void M.reply('*Quote the sticker that you want to convert, Baka!*')
        const buffer = await M.downloadMediaMessage(M.quoted.message)
        const animated = M.quoted?.message?.stickerMessage?.isAnimated as boolean
        try {
            const result = animated
                ? await this.client.utils.webpToMp4(buffer)
                : await this.client.utils.webpToPng(buffer)
            return void (await M.reply(result, animated ? 'video' : 'image', animated))
        } catch (error) {
            return void (await M.reply('Conversion failed as animated stickers are not supported'))
        }
    }
}
