import { Ship, IShipOptions } from '@shineiichijo/canvas-chan'
import { Message, Command, BaseCommand } from '../../Structures'

@Command('ship', {
    description: 'Ship People! ♥',
    cooldown: 15,
    exp: 50,
    category: 'fun',
    usage: 'ship [tag users]'
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const shipArray: IShipOptions[] = []
        let users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        while (users.length < 2) users.push(M.sender.jid)
        if (users.includes(M.sender.jid)) users = users.reverse()
        for (const user of users) {
            const name = this.client.contact.getContact(user).username
            let image!: string
            try {
                image =
                    (await this.client.profilePictureUrl(user, 'image')) ||
                    'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
            } catch (error) {
                image = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
            }
            shipArray.push({ name, image })
        }
        const percentage = Math.floor(Math.random() * 101)
        let text = ''
        if (percentage >= 0 && percentage < 10) text = 'Awful'
        else if (percentage >= 10 && percentage < 25) text = 'Very Bad'
        else if (percentage >= 25 && percentage < 40) text = 'Poor'
        else if (percentage >= 40 && percentage < 55) text = 'Average'
        else if (percentage >= 55 && percentage < 75) text = 'Good'
        else if (percentage >= 75 && percentage < 90) text = 'Great'
        else if (percentage >= 90) text = 'Amazing'
        const image = new Ship(shipArray, percentage, text)
        let caption = `\t❣️ *Matchmaking...* ❣️ \n`
        caption += `\t\t---------------------------------\n`
        caption += `@${users[0].split('@')[0]}  x  @${users[1].split('@')[0]}\n`
        caption += `\t\t---------------------------------\n`
        caption += `\t\t\t\t\t${percentage < 40 ? '💔' : percentage < 75 ? '❤' : '💗'} *ShipCent: ${percentage}%*\n`
        caption += text
        return void (await M.reply(await image.build(), 'image', undefined, undefined, caption, [users[0], users[1]]))
    }
}
