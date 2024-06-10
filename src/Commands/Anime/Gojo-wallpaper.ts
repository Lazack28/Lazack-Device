import { join } from 'path'
import { BaseCommand, Command, Message } from '../../Structures'

@Command('gojo-wallpaper', {
    description: 'gojo wallpapers',
    aliases: ['gojo'],
    usage: 'wallpaper',
    cooldown: 5,
    exp: 5,
    category: 'anime'
})
export default class extends BaseCommand {
    private imageUrls: string[] = [
        'https://telegra.ph/file/ded6f91429323a6cbfaf4.jpg',
        'https://telegra.ph/file/e0bf4cccdff0c1dbefd81.jpg',
        'https://telegra.ph/file/2840c85a960d2ebb3a5ab.jpg',
        'https://telegra.ph/file/5ee685ca46b720fa26eec.jpg',
        'https://telegra.ph/file/a696f9bcc2b17519c8b2d.jpg',
        'https://telegra.ph/file/2bb7315467372fd7aff3f.jpg',
        'https://telegra.ph/file/b6f46be6f1df74fc8546b.jpg',
        'https://telegra.ph/file/86d7e28a481cd31b305ec.jpg',
        'https://telegra.ph/file/c1f7cf77082c6a4f9d0e3.jpg',
        'https://telegra.ph/file/f760a3f1ad7a1aadd1b6d.jpg',
        'https://telegra.ph/file/0f8e4a02b308b020aefa8.jpg',
        'https://telegra.ph/file/e5146247936a58d7f8076.jpg',
        'https://telegra.ph/file/7e131e04341e80e7307aa.jpg',
        'https://telegra.ph/file/a7aca6b2c414f928a054c.jpg',
        'https://telegra.ph/file/a60d9213ff963949923a1.jpg',
        'https://telegra.ph/file/6c9bc1ac7ed5788f16b6b.jpg',
        'https://telegra.ph/file/834ed5c4a3e685ceea751.jpg',
        'https://telegra.ph/file/a7a7868ad8cab295a318d.jpg',
        'https://telegra.ph/file/a498dcb0f2805205b6893.jpg',
        'https://telegra.ph/file/0a9f098d6a3dace79826d.jpg',
        'https://telegra.ph/file/652c247aa3ca0d7262463.jpg',
        'https://telegra.ph/file/8398b20004b6a29fac395.jpg',
        'https://telegra.ph/file/797bfdbfb20667afea6c8.jpg',
        'https://telegra.ph/file/394ce84a369708aac89f2.jpg',
        'https://telegra.ph/file/f891d8522fc141810d7f5.jpg',
        'https://telegra.ph/file/3c62c186f95158edf66f9.jpg',
     
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
        const text = `*GOJO'S WALLPAPERS💙*`
        return void (await reply(image, 'image', undefined, undefined, text, undefined, {
            title: this.client.utils.capitalize(name),
            thumbnail: image,
            mediaType: 1,
            sourceUrl: homepage
        }))
    }
} 
