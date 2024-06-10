import spotify from 'spotifydl-x'
import TrackDetails from 'spotifydl-x/dist/lib/details/Track'
import { Utils } from '.'

export class Spotify extends spotify {
    constructor(public url: string) {
        super({
            clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
            clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009'
        })
    }

    public getInfo = async (): Promise<TrackDetails | { error: string }> =>
        await this.getTrack(this.url).catch(() => {
            return { error: 'Failed' }
        })

    public download = async (): Promise<Buffer> =>
        await this.utils.mp3ToOpus((await this.downloadTrack(this.url)) as Buffer)

    private readonly utils = new Utils()
}
