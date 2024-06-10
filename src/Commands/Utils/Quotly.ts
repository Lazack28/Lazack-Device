import { Command, BaseCommand, Message } from '../../Structures'
import { Sticker, createSticker, StickerTypes } from 'wa-sticker-formatter'
import { IArgs } from '../../Types'
import axios from 'axios'

@Command('quotly', {
    description: 'Telegram quotly bot it makes quote stickes.',
    category: 'utils',
    usage: 'quotly [provide text/quote message containing text]',
    aliases: ['q'],
    exp: 20,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context && (!M.quoted || M.quoted.content === ''))
            return void M.reply('Provide the text you want as quotly sticker, Baka!')
        const content = context ? context.trim() : (M.quoted?.content as string)
        const users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        while (users.length < 1) users.push(M.sender.jid)
        const user = users[0]
        const username = user === M.sender.jid ? M.sender.username : this.client.contact.getContact(user).username
        let pfp
        try {
            pfp =
                (await this.client.profilePictureUrl(user, 'image')) ||
                'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
        } catch (error) {
            pfp = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
        }
        try {
            const json = {
                type: 'quote',
                format: 'png',
                backgroundColor: '#FFFFFF',
                width: 512,
                height: 768,
                scale: 2,
                messages: [
                    {
                        entities: [],
                        avatar: true,
                        from: {
                            id: 1,
                            name: username,
                            photo: {
                                url: pfp
                            }
                        },
                        text: content,
                        replyMessage: {}
                    }
                ]
            }
            const response = await axios.post('https://bot.lyo.su/quote/generate', json, {
                headers: { 'Content-Type': 'application/json' }
            })
            const base64 = response.data.result.image
            const buffer = Buffer.from(base64, 'base64')
            const sticker = new Sticker(buffer, {
                pack: `Quotly Bot`,
                author: `${M.sender.username}`,
                type: StickerTypes.FULL,
                categories: ['😄', '🎉'],
                quality: 100,
                background: 'transparent'
            })
            return void (await M.reply(await sticker.build(), 'sticker'))
        } catch (err) {
            console.log(err)
            return void (await M.reply('An error occurred. Try again later'))
        }
    }
}
