import { BaseCommand, Command, Message } from '../../Structures';
import axios from 'axios';

@Command('Instagram', {
    description: 'get a video or a picture from Instagram',
    category: 'media',
    usage: 'ig',
    aliases: ['ig'],
    exp: 20,
    cooldown: 1
})
export default class extends BaseCommand {
    public override execute = async ({ reply, urls }: Message): Promise<void> => {
        if (!urls || !urls.length) {
            return void (await reply('❌ Please provide an Instagram URL'))
        }

        const [url] = urls;
        if (
            !(
                url.includes('instagram.com/p/') ||
                url.includes('instagram.com/reel/') ||
                url.includes('instagram.com/tv/')
            )
        ) {
            return void (await reply(`❌ Wrong URL! Only Instagram posted videos, TV, and reels can be downloaded`))
        }

        try {
            const { data } = await axios.get<{ urls: { url: string; type: string }[] }>(
                `https://weeb-api.vercel.app/insta?url=${url}`
            )
            if (data.urls && data.urls.length > 0) {
                for (const { url, type } of data.urls) {
                    const buffer = await this.client.utils.getBuffer(url)
                    if (type === 'video' || type === 'image') {
                        await reply(buffer, type as 'video' | 'image')
                    } else {
                        // Handle other types appropriately (if necessary)
                        console.log(`Unhandled type: ${type}`)
                    }
                }
            } else {
                await reply(`❌ No video/image data found for the provided URL.`)
            }
        } catch (error: any) { // Explicitly defining error type as 'any' for now
            await reply(`❌ Error while getting video/image data: ${(error as Error).message}`)
        }
    };
    }
