import { join } from 'path'
import { BaseCommand, Command, Message } from '../../Structures'

@Command('meme', {
    description: 'Generates a random meme',
    aliases: ['memegen'],
    usage: 'meme',
    cooldown: 5,
    exp: 5,
    category: 'fun'
})
export default class extends BaseCommand {
    private imageUrls: string[] = [
        'https://telegra.ph/file/6ba80ca658c9b1ab1c0b7.jpg',
        'https://telegra.ph/file/bcaf6875a6b870a95ca1d.jpg',
        'https://telegra.ph/file/00aaf2cfff21ce7123e52.jpg',
        'https://telegra.ph/file/d40eb58f94417b2feb2a7.jpg',
        'https://telegra.ph/file/b5f6463b2b9714c0ace1e.jpg',
        'https://telegra.ph/file/1d4f82ce1bc4b4eaf3df8.jpg',
        'https://telegra.ph/file/37bb6a1455838ff3c76b4.jpg',
        'https://telegra.ph/file/69ad9c1f2a1387e961a72.jpg',
        'https://telegra.ph/file/49a8b517d031a1ed4bc0b.jpg',
        'https://telegra.ph/file/1632616d3da724a9dc37a.jpg',
        'https://telegra.ph/file/32b038bc29a3c478566df.jpg',
        'https://telegra.ph/file/63310d82d2945b043574a.jpg',
        'https://telegra.ph/file/106aec55f6524f815f313.jpg ',
     
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
        const text = `*😂*`
        return void (await reply(image, 'image', undefined, undefined, text, undefined, {
            title: this.client.utils.capitalize(name),
            thumbnail: image,
            mediaType: 1,
            sourceUrl: homepage
        }))
    }
} 
