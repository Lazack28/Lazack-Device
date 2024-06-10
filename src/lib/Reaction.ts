import { Utils } from '.'

enum baseUrls {
    'waifu.pics' = 'https://api.waifu.pics/sfw/',
    'nekos.life' = 'https://nekos.life/api/v2/img/',
    'nekos.best' = 'https://nekos.best/api/v2/'
}

export enum Reactions {
    bully = baseUrls['waifu.pics'],
    cuddle = baseUrls['nekos.life'],
    cry = baseUrls['waifu.pics'],
    hug = baseUrls['nekos.life'],
    kiss = baseUrls['waifu.pics'],
    lick = baseUrls['waifu.pics'],
    pat = baseUrls['nekos.life'],
    smug = baseUrls['nekos.life'],
    yeet = baseUrls['waifu.pics'],
    blush = baseUrls['waifu.pics'],
    bonk = baseUrls['waifu.pics'],
    smile = baseUrls['waifu.pics'],
    wave = baseUrls['waifu.pics'],
    highfive = baseUrls['waifu.pics'],
    bite = baseUrls['waifu.pics'],
    handhold = baseUrls['waifu.pics'],
    nom = baseUrls['waifu.pics'],
    glomp = baseUrls['waifu.pics'],
    kill = baseUrls['waifu.pics'],
    kick = baseUrls['waifu.pics'],
    slap = baseUrls['nekos.life'],
    happy = baseUrls['waifu.pics'],
    wink = baseUrls['waifu.pics'],
    poke = baseUrls['waifu.pics'],
    dance = baseUrls['waifu.pics'],
    cringe = baseUrls['waifu.pics'],
    tickle = baseUrls['nekos.life'],
    baka = baseUrls['nekos.best'],
    bored = baseUrls['nekos.best'],
    laugh = baseUrls['nekos.best'],
    punch = baseUrls['nekos.best'],
    pout = baseUrls['nekos.best'],
    stare = baseUrls['nekos.best'],
    thumbsup = baseUrls['nekos.best']
}

export type reaction = keyof typeof Reactions

export class Reaction {
    public getReaction = async (reaction: reaction, single: boolean = true) => {
        const { url } = await this.fetch(`${Reactions[reaction]}${reaction}`)
        const words = this.getSuitableWords(reaction, single)
        return {
            url,
            words
        }
    }

    private getSuitableWords = (reaction: reaction, single: boolean = true): string => {
        switch (reaction) {
            case 'bite':
                return 'Bit'
            case 'blush':
                return 'Blushed at'
            case 'bonk':
                return 'Bonked'
            case 'bully':
                return 'Bullied'
            case 'cringe':
                return 'Cringed at'
            case 'cry':
                return single ? 'Cried by' : 'Cried in front of'
            case 'cuddle':
                return 'Cuddled'
            case 'dance':
                return 'Danced with'
            case 'glomp':
                return 'Glomped at'
            case 'handhold':
                return 'Held the hands of'
            case 'happy':
                return single ? 'is Happied by' : 'is Happied with'
            case 'highfive':
                return 'High-fived'
            case 'hug':
                return 'Hugged'
            case 'kick':
                return 'Kicked'
            case 'kill':
                return 'Killed'
            case 'kiss':
                return 'Kissed'
            case 'lick':
                return 'Licked'
            case 'nom':
                return 'Nomed'
            case 'pat':
                return 'Patted'
            case 'poke':
                return 'Poked'
            case 'slap':
                return 'Slapped'
            case 'smile':
                return 'Smiled at'
            case 'smug':
                return 'Smugged'
            case 'tickle':
                return 'Tickled'
            case 'wave':
                return 'Waved at'
            case 'wink':
                return 'Winked at'
            case 'yeet':
                return 'Yeeted at'
            case 'baka':
                return 'Yelled BAKA at'
            case 'bored':
                return 'is Bored of'
            case 'laugh':
                return 'Laughed at'
            case 'punch':
                return 'Punched'
            case 'pout':
                return 'Pouted'
            case 'stare':
                return 'Stared at'
            case 'thumbsup':
                return 'Thumbs-upped at'
        }
    }

    private fetch = async (url: string): Promise<{ url: string }> => {
        const data = await this.utils.fetch<{ url: string } | { results: { anime_name: string; url: string }[] }>(url)
        const res = data as { results: { anime_name: string; url: string }[] }
        if (res.results) return res.results[0]
        return data as { url: string }
    }

    private utils = new Utils()
}
