import { join } from 'path'
import { BaseCommand, Command, Message } from '../../Structures'

@Command('Kakashi-wallpaper', {
    description: 'kakashi wallpapers',
    aliases: ['kakashi'],
    usage: 'wallpaper',
    cooldown: 5,
    exp: 5,
    category: 'anime'
})
export default class extends BaseCommand {
    private imageUrls: string[] = [
        'https://telegra.ph/file/14d7deba6017bf6aa048b.jpg',
        'https://telegra.ph/file/815df6c8e55b9e6bf7d62.jpg',
        'https://telegra.ph/file/29a4a2e808e39084dbdfc.jpg',
        'https://telegra.ph/file/63b2b01eb083664345f42.jpg',
        'https://telegra.ph/file/0d4aac1f990afa9537b9e.jpg',
        'https://telegra.ph/file/3df477e800cb37c51bb3f.jpg',
        'https://telegra.ph/file/84c23858a201895a5eda0.jpg',
        'https://telegra.ph/file/9f016414578f58e2ab35c.jpg',
        'https://telegra.ph/file/f0571e83f61ef6e4ab2ab.jpg',
        'https://telegra.ph/file/7931f973ad7f0e461b7c8.jpg',
        'https://telegra.ph/file/14624dfe73ae0e3dfab0f.jpg',
        'https://telegra.ph/file/c4275480d201a5c00958c.jpg',
        'https://telegra.ph/file/f10c877dee2b1a601833d.jpg',
        'https://telegra.ph/file/c9359e1c850b9dbe5e6c3.jpg',
        'https://telegra.ph/file/817a23d8f373857bc8da8.jpg',
        'https://telegra.ph/file/0751bf83ff7a26a12df5c.jpg',
     
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
        const text = `*KAKASHI'S WALLPAPERS💙*`
        return void (await reply(image, 'image', undefined, undefined, text, undefined, {
            title: this.client.utils.capitalize(name),
            thumbnail: image,
            mediaType: 1,
            sourceUrl: homepage
        }))
    }
}  
