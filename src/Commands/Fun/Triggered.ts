import { Triggered } from '@shineiichijo/canvas-chan'
import { MessageType, proto } from '@whiskeysockets/baileys'
import { Command, Message, BaseCommand } from '../../Structures'

@Command('triggered', {
    description: 'Makes a triggered gif of the tagged/quoted user or the provided/quoted image',
    cooldown: 10,
    usage: 'triggered [tag/quote user or caption/quote image]',
    category: 'fun',
    exp: 25,
    aliases: ['trigger']
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        let buffer!: Buffer
        if (M.hasSupportedMediaMessage && (Object.keys(M.message) as MessageType[]).includes('imageMessage'))
            buffer = await M.downloadMediaMessage(M.message.message as proto.IMessage)
        else if (M.mentioned.length) {
            let pfpUrl: string | undefined
            try {
                pfpUrl = await this.client.profilePictureUrl(M.mentioned[0], 'image')
            } catch (error) {
                return void M.reply("Can't access to the tagged user's profile picture")
            }
            buffer = pfpUrl ? await this.client.utils.getBuffer(pfpUrl) : (this.client.assets.get('404') as Buffer)
        } else if (M.quoted) {
            if (!M.quoted.hasSupportedMediaMessage) {
                let pfpUrl: string | undefined
                try {
                    pfpUrl = await this.client.profilePictureUrl(M.quoted.sender.jid, 'image')
                } catch (error) {
                    return void M.reply("Can't access to the quoted user's profile picture")
                }
                buffer = pfpUrl ? await this.client.utils.getBuffer(pfpUrl) : (this.client.assets.get('404') as Buffer)
            } else buffer = await M.downloadMediaMessage(M.quoted.message)
        } else {
            let pfpUrl: string | undefined
            try {
                pfpUrl = await this.client.profilePictureUrl(M.sender.jid, 'image')
            } catch (error) {
                return void M.reply("Can't access to the your profile picture")
            }
            buffer = pfpUrl ? await this.client.utils.getBuffer(pfpUrl) : (this.client.assets.get('404') as Buffer)
        }
        return void (await M.reply(
            await this.client.utils.gifToMp4(await new Triggered(buffer).build()),
            'video',
            true
        ))
    }
}
