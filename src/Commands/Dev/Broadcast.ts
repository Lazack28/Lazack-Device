import { IArgs } from '../../Types'
import { Command, BaseCommand, Message } from '../../Structures'
import { AnyMessageContent, proto, delay } from '@whiskeysockets/baileys'

@Command('broadcast', {
    description: '',
    aliases: ['bc'],
    category: 'dev',
    usage: ''
})
export default class command extends BaseCommand {
    override execute = async (M: Message, { context }: IArgs, arr: string[] = []): Promise<void> => {
        try {
            let type: 'text' | 'image' | 'video' = 'text'
            let buffer!: Buffer
            if (M.hasSupportedMediaMessage) {
                if (M.type === 'imageMessage') type = 'image'
                if (M.type === 'videoMessage') type = 'video'
                buffer = await M.downloadMediaMessage(M.message.message as proto.IMessage)
            } else if (!M.hasSupportedMediaMessage && M.quoted && M.quoted.hasSupportedMediaMessage) {
                if (M.quoted.type === 'imageMessage') type = 'image'
                if (M.quoted.type === 'videoMessage') type = 'video'
                buffer = await M.downloadMediaMessage(M.quoted.message as proto.IMessage)
            }
            let caption: string
            if ((!context && !M.quoted?.content) || (!context && M.quoted?.content === ''))
                return void M.reply('🟥 *Provide the text to be broadcasted*')
            if (context) caption = context.trim()
            else caption = M.quoted?.content.trim() as string
            if (!arr.length) arr = await this.client.getAllGroups()
            const text = `*⌈ Mircus-md 𝙱𝚁𝙾𝙰𝙳𝙲𝙰𝚂𝚃 ⌋*\n\n *❤‍🔥 𝐅𝐫𝐨𝐦:* *${M.sender.username}*\n\n${caption}`
            for (const group of arr) {
                await delay(5000)
                await this.client.sendMessage(group, {
                    [type]: type === 'text' ? text : buffer,
                    caption: type === 'text' ? undefined : text,
                    gifPlayback: type === 'video' ? true : undefined,
                    jpegThumbnail: type === 'image' ? buffer.toString('base64') : undefined
                } as unknown as AnyMessageContent)
            }
            return void M.reply('𝐃𝐨𝐧𝐞!')
        } catch {
            return await this.execute(M, { context, flags: [], args: [] }, arr)
        }
    }
}
