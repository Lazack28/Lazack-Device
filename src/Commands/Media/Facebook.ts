import { BaseCommand, Command, Message } from '../../Structures';
import axios from 'axios';

@Command('Facebook', {
    description: 'Get a video or a picture from Facebook',
    category: 'media',
    usage: 'fb',
    aliases: ['fb'],
    exp: 20,
    cooldown: 1
})
export default class extends BaseCommand {
    public override execute = async ({ reply, urls }: Message): Promise<void> => {
        if (!urls || !urls.length) {
            return void (await reply('❌ Please provide a Facebook URL'));
        }

        const [url] = urls;
        if (!url.includes('facebook.com')) {
            return void (await reply('❌ Wrong URL! Only Facebook URLs are supported'));
        }

        try {
            const { data } = await axios.get<{ urls: { url: string; type: string }[] }>(
                `https://api.example.com/facebook?url=${url}`
            ); // Update the API endpoint to the one that fetches Facebook video data
            if (data.urls && data.urls.length > 0) {
                for (const { url, type } of data.urls) {
                    const buffer = await this.client.utils.getBuffer(url);
                    if (type === 'video' || type === 'image') {
                        await reply(buffer, type as 'video' | 'image');
                    } else {
                        // Handle other types appropriately (if necessary)
                        console.log(`Unhandled type: ${type}`);
                    }
                }
            } else {
                await reply('❌ No video/image data found for the provided URL.');
            }
        } catch (error: any) { // Explicitly defining error type as 'any' for now
            if (error.response && error.response.status === 404) {
                await reply('❌ Video/image not found. Please make sure the provided Facebook URL is correct.');
            } else {
                await reply(`❌ Error while getting video/image data: ${(error as Error).message}`);
            }
        }
    };
        }
