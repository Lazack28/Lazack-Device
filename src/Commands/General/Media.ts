import { join } from 'path'
import { BaseCommand, Command, Message } from '../../Structures'

@Command('media', {
    description: 'List of media commands',
    aliases: ['media'],
    usage: 'media_commads',
    cooldown: 5,
    exp: 5,
    category: 'general'
})
export default class extends BaseCommand {
    private imageUrls: string[] = [
        'https://telegra.ph/file/8dbc173acdd105913b743.jpg',
        'https://telegra.ph/file/97874591b31af2b44dcbe.jpg',
        'https://telegra.ph/file/806fdbdc9ee8e6b01f9f9.jpg',
     
    ]
    // you can add more pictures if you want bro or girl
    public override execute = async ({ reply }: Message): Promise<void> => {
        const users = await this.client.DB.user.count()
        let getGroups = await this.client.groupFetchAllParticipating()
        let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1])
        let res = groups.map((v) => v.id)
        console.log(res.length)
        const { description, name, homepage } = require(join(__dirname, '..', '..', '..', 'package.json')) as {
            description: string
            homepage: string
            name: string
        }
        const randomImageUrl = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)]
        const image = await this.client.utils.getBuffer(randomImageUrl)
        const uptime = this.client.utils.formatSeconds(process.uptime())
        const text = `         *━━━❰ Media ❱━━━*
  ➪day-song 𒊹︎︎︎ Instagram 𒊹︎︎︎ lyrics 𒊹︎︎︎ panties 𒊹︎︎︎ play 𒊹︎︎︎ playdoc 𒊹︎︎︎ spotify 𒊹︎︎︎ tiktok 𒊹︎︎︎ yta 𒊹︎︎︎ yts 𒊹︎︎︎ ytv  𒊹︎︎︎ google 𒊹︎︎︎ cat 𒊹︎︎︎ pinterest 𒊹︎︎︎ retrieve 𒊹︎︎︎ sticker

 *⌜😻𝐶𝑜𝑚𝑚𝑎𝑛𝑑𝑠 4 𝑀𝑒𝑑𝑖𝑎⌝*`
        return void (await reply(image, 'image', undefined, undefined, text, undefined, {
            title: this.client.utils.capitalize(name),
            thumbnail: image,
            mediaType: 1,
            sourceUrl: homepage
        }))
    }
}  
