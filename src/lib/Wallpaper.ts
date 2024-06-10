import { Utils } from '.'

export class Wallpaper {
    private site = 'https://wallpaper-api-cyan.vercel.app/wallpaper?q='

    constructor(private query: string, private amount: number = 10) {}

    public fetchImages = async (): Promise<string[]> =>
        await this.utils
            .fetch<{ images: number; results: { site: string; url: string }[] }>(
                `${this.site}${this.query}&amount=${this.amount}`
            )
            .then((res) => res.results.map((image) => image.url))
            .catch(() => [])

    private utils = new Utils()
}
