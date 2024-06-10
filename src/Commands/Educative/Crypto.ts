/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from 'axios'

@Command('crypto', {
    aliases: ['cr', 'coins'],
    description: 'Get Crypto Prices\n',
    category: 'educative',
    usage: `crypto (Coin/Currency) (Currency/Coin) (count of 1st param)`,
    cooldown: 5,
    exp: 100,
    dm: true
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        let term = context.trim().split(' ')
        // upper case
        term = term.map((t) => t.toUpperCase())

        let text = ''
        await axios
            .get(`https://public.coindcx.com/market_data/current_prices`)
            .then(async (res) => {
                if (!res) return void M.reply('🟥 ERROR 🟥\nThis might be due to API service being down')

                const data = res.data
                const count = term.length > 2 ? (isNaN(parseInt(term[2])) ? 1 : parseInt(term[2])) : 1
                if (term[0] === '') {
                    text = `*Crypto Prices*\n\n`
                    // loop over the array of key and value, and add them to the text
                    for (const [key, value] of Object.entries(data)) {
                        text += `*${key}*: ${value}\n`
                    }
                } else if (term.length == 1) {
                    // concat 'INR' to the term
                    term[0] = term[0] + 'INR'
                    // check if the value of the term is present in the data, if it's present then return the value
                    if (data[term[0]]) {
                        text = `*${term[0]}*: ${data[term[0]]}`
                    } else {
                        text = `*${term[0]}*: Not Found\nUsage example\n${this.client.config.prefix}cr BTC INR\n${this.client.config.prefix}cr USDT BTC\n${this.client.config.prefix}cr INR BTC\n${this.client.config.prefix}cr without parameters returns data on all coins`
                    }
                } else if (term.length == 2 || isNaN(count)) {
                    // concat term[1] to the term[0]
                    term[0] = term[0] + term[1]
                    // check if the value of the term is present in the data, if it's present then return the value
                    if (data[term[0]]) {
                        text = `*${term[0]}*: ${data[term[0]]}`
                    } else {
                        text = `*${term[0]}*: Not Found\nUsage example\n${this.client.config.prefix}cr BTC INR\n${this.client.config.prefix}cr USDT BTC\n${this.client.config.prefix}cr INR BTC\n${this.client.config.prefix}cr without parameters returns data on all coins`
                    }
                }
                // Get the value of the term[0] and multiply it by the term[2]
                // if (term.length == 3)
                else {
                    // concat term[1] to the term[0]
                    term[0] = term[0] + term[1]
                    // check if the value of the term is present in the data, if it's present then return the value
                    if (data[term[0]]) {
                        text = `*${term[0]}*: ${data[term[0]] * count}`
                    } else {
                        text = `*${term[0]}*: Not Found\nUsage example\n${this.client.config.prefix}cr BTC INR\n${this.client.config.prefix}cr USDT BTC\n${this.client.config.prefix}cr INR BTC\n${this.client.config.prefix}cr without parameters returns data on all coins`
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                return void M.reply('🟥 ERROR 🟥\nThis might be due to API service being down')
            })

        return void M.reply(text)
    }
}
