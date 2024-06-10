import { join } from 'path'
import { BaseCommand, Command, Message } from '../../Structures'

@Command('jflex', {
    description: 'JFLEX LOGOS',
    aliases: ['JFLEX'],
    usage: 'logo',
    cooldown: 5,
    exp: 5,
    category: 'fun'
})
export default class extends BaseCommand {
    private imageUrls: string[] = [
        'https://telegra.ph/file/66867e173056f4afa15ee.jpg',
        'https://telegra.ph/file/f6f1e0e2c98c301d89dc6.jpg',
        'https://telegra.ph/file/040e7ea452bdcf9e134a7.jpg',
        'https://telegra.ph/file/2a50039b5994c759938e0.jpg',
        'https://telegra.ph/file/7b9edb6a147077e189bf6.jpg',
        'https://telegra.ph/file/27b71561702eb9565fcee.jpg',
     
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
        const text = `*𝐉𝐅𝐋𝐄𝐗 𝐎𝐆 LOGOS😈*`
        return void (await reply(image, 'image', undefined, undefined, text, undefined, {
            title: this.client.utils.capitalize(name),
            thumbnail: image,
            mediaType: 1,
            sourceUrl: homepage
        }))
    }
} 
