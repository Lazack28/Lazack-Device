import { Simp } from '@shineiichijo/canvas-chan'
import { MessageType, proto } from '@whiskeysockets/baileys'
import { Command, BaseCommand, Message } from '../../Structures'

@Command('simp', {
    description: 'Makes a person simp',
    cooldown: 15,
    usage: 'simp [tag/quote user || quote/caption image]',
    category: 'fun',
    exp: 10
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
        return void (await M.reply(await new Simp(buffer).build(), 'image'))
    }
}
