// Coded by KenisawaDev 
// ======================

import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, text, args, command, usedPrefix }) => {
    if (!text) throw m.reply(`${emoji} Please enter the TikTok image link to download.`)

    let mainUrl = `https://dlpanda.com/id?url=${text}&token=G7eRpMaa`;
    let backupUrl = `https://dlpanda.com/id?url=${text}&token51=G32254GLM09MN89Maa`;
    let creator = 'KenisawaDev';

    try {
        let response = await axios.get(mainUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
                'Accept-Encoding': 'gzip, deflate, br',
                'Alt-Used': 'dlpanda.com',
                'Connection': 'keep-alive',
                'Cookie': 'cf_clearance=vdZS2yhltq5vorBBw7wPwGOxaRBiCANmFWRdAqKLlmI-1693612801-0-1-ab4b189c.e21c5b7c.f700a2ea-0.2.1693612801; _ga_DQ96ZJ6QXK=GS1.1.1693612800.2.1.1693612814.0.0.0; _ga=GA1.1.1626490340.1693347388; current_locale=id; __gads=ID=390b63a593862513-22debbc32ce300d7:T=1693347389:RT=1693612802:S=ALNI_Mbez6jYLnaF45LqwcUZR564jwrLgw; __gpi=UID=00000c3691b8b508:T=1693347389:RT=1693612802:S=ALNI_Ma03oA0UzqNgAsE2_fXRpT1NKg_Kw; fpestid=2g_N1gPYC68duNfJozpD093K-4zaMANBzHKNlh7x3Hg5XsGiN8TdNDAu6-MclRzqfUtePw; XSRF-TOKEN=eyJpIjoicUZtV0RJangwQXo2ZFZwZndxd1ZZck85OFMwWE9Edzg0ZnFUZXBGRzNVczNHeVpXbjFKdWhZQUFOZTBTZWRMUUN4Um1COVNDY3JRN1ZkWm5DUklseUlWTUNNc0huNkR1TjlZY2dpZUlPNExOcy9TbkNCeXNVTE50ZFgvSTkzelgiLCJpdiI6Ikd0ekE2VEdETkowRTh4OVYyU2ljeGc9PSIsInZhbHVlIjoicUZtV0RJangwQXo2ZFZwZndxd1ZZck85OFMwWE9Edzg0ZnFUZXBGRzNVczNHeVpXbjFKdWhZQUFOZTBTZWRMUUN4Um1COVNDY3JRN1ZkWm5DUklseUlWTUNNc0huNkR1TjlZY2dpZUlPNExOcy9TbkNCeXNVTE50ZFgvSTkzelgiLCJtYWMiOiIzMGU2ZmNlYWJmM2RjMzUzNGVhOWIwOTc9NGIwNmY0YWQ0MzdjY2RjYTE5ZTg0ZDg4ODI9NDI5NDAzZDZkZWNkNTlmIiwidGFnIjoiIn0%3D; dlpanda_session=eyJpIjoicUZtV0RJangwQXo2ZFZwZndxd1ZZck85OFMwWE9Edzg0ZnFUZXBGRzNVczNHeVpXbjFKdWhZQUFOZTBTZWRMUUN4Um1COVNDY3JRN1ZkWm5DUklseUlWTUNNc0huNkR1TjlZY2dpZUlPNExOcy9TbkNCeXNVTE50ZFgvSTkzelgiLCJtYWMiOiIzMGU2ZmNlYWJmM2DlgdMqMrdURupgpTcwPvOW6MWVaAvUnv4k_qtF_WI4XeKUFghBnCPT6-2I61p-IkBle-3xIg0ao-Fuz921rFwdOHdWKxAgnwgVewYjN-BPpJynw%3D%3D; FCNEC=%5B%5B%22AKsRol_1IXoIpvbEdbM5KJpi4sTFJvXiQ9eigpWLQvrmWuR0tVHN2aAiv7R-tN3T6POOnqE6glMWVaAvUnv4k_qtF_WI4XeKUFghBnCPT6-2I61p-IkBle-3xIg0ao-Fuz921rFwdOHdWKxAgnwgVewYjN-BPpJynw%3D%3D%22%5D%2Cnull%2C%5B%5D%5D',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1'
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        let asd = []
        let imgSrc = []

        $('div.col-md-12 > img').each((index, element) => {
            imgSrc.push($(element).attr('src'));
        });

        asd.push({ creator, imgSrc })
        let fix = imgSrc.map((e, i) => {
            return { img: e, creator: creator[i] }
        })

        if (asd[0].imgSrc.length === 0) {
            response = await axios.get(backupUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                    'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Alt-Used': 'dlpanda.com',
                    'Connection': 'keep-alive',
                    'Cookie': 'cf_clearance=vdZS2yhltq5vorBBw7wPwGOxaRBiCANmFWRdAqKLlmI-1693612801-0-1-ab4b189c.e21c5b7c.f700a2ea-0.2.1693612801; _ga_DQ96ZJ6QXK=GS1.1.1693612800.2.1.1693612814.0.0.0; _ga=GA1.1.1626490340.1693347388; current_locale=id; __gads=ID=390b63a593862513-22debbc32ce300d7:T=1693347389:RT=1693612802:S=ALNI_Mbez6jYLnaF45LqwcUZR564jwrLgw; __gpi=UID=00000c3691b8b508:T=1693347389:RT=1693612802:S=ALNI_Ma03oA0UzqNgAsE2_fXRpT1NKg_Kw; fpestid=2g_N1gPYC68duNfJozpD093K-4zaMANBzHKNlh7x3Hg5XsGiN8TdNDAu6-MclRzqfUtePw; XSRF-TOKEN=eyJpIjoicUZtV0RJangwQXo2ZFZwZndxd1ZZck85OFMwWE9Edzg0ZnFUZXBGRzNVczNHeVpXbjFKdWhZQUFOZTBTZWRMUUN4Um1COVNDY3JRN1ZkWm5DUklseUlWTUNNc0huNkR1TjlZY2dpZUlPNExOcy9TbkNCeXNVTE50ZFgvSTkzelgiLCJpdiI6Ikd0ekE2VEdETkowRTh4OVYyU2ljeGc9PSIsInZhbHVlIjoicUZtV0RJangwQXo2ZFZwZndxd1ZZck85OFMwWE9Edzg0ZnFUZXBGRzNVczNHeVpXbjFKdWhZQUFOZTBTZWRMUUN4Um1COVNDY3JRN1ZkWm5DUklseUlWTUNNc0huNkR1TjlZY2dpZUlPNExOcy9TbkNCeXNVTE50ZFgvSTkzelgiLCJtYWMiOiIzMGU2ZmNlYWJmM2RjMzUzNGVhOWIwOTc9NGIwNmY0YWQ0MzdjY2RjYTE5ZTg0ZDg4ODI9NDI5NDAzZDZkZWNkNTlmIiwidGFnIjoiIn0%3D; dlpanda_session=eyJpIjoicUZtV0RJangwQXo2ZFZwZndxd1ZZck85OFMwWE9Edzg0ZnFUZXBGRzNVczNHeVpXbjFKdWhZQUFOZTBTZWRMUUN4Um1COVNDY3JRN1ZkWm5DUklseUlWTUNNc0huNkR1TjlZY2dpZUlPNExOcy9TbkNCeXNVTE50ZFgvSTkzelgiLCJtYWMiOiIzMGU2ZmNlYWJmM2DlgdMqMrdURupgpTcwPvOW6MWVaAvUnv4k_qtF_WI4XeKUFghBnCPT6-2I61p-IkBle-3xIg0ao-Fuz921rFwdOHdWKxAgnwgVewYjN-BPpJynw%3D%3D; FCNEC=%5B%5B%22AKsRol_1IXoIpvbEdbM5KJpi4sTFJvXiQ9eigpWLQvrmWuR0tVHN2aAiv7R-tN3T6POOnqE6glMWVaAvUnv4k_qtF_WI4XeKUFghBnCPT6-2I61p-IkBle-3xIg0ao-Fuz921rFwdOHdWKxAgnwgVewYjN-BPpJynw%3D%3D%22%5D%2Cnull%2C%5B%5D%5D',
                    'Upgrade-Insecure-Requests': '1',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-User': '?1'
                }
            });

            const html2 = response.data;
            const $2 = cheerio.load(html2);

            let imgSrc2 = []

            $2('div.col-md-12 > img').each((index, element) => {
                imgSrc2.push($2(element).attr('src'));
            });

            asd.push({ creator, imgSrc: imgSrc2 });
        }

        if (asd[0].imgSrc.length === 0) {
            throw `${emoji2} No results found...`;
        }
        await m.react('🕓');
        for (let i of asd[0].imgSrc) {
            try {
                await conn.sendFile(m.chat, i, '', null, m, null, fake);
            await m.react('✅');
            } catch (e) {
                console.error(e);
                await m.react('✖️');
            }
        }
    } catch (error) {
      await m.react('✖️');
        console.error(error); 
    }
}

handler.help = ['tiktokimg <url>']
handler.tags = ['downloads']
handler.command = ['tiktokimg', 'ttimg']
handler.group = true
handler.register = true
handler.coin = 2

export default handler