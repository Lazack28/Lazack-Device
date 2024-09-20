



import textpro from "../lib/textpro.js"

import axios from "axios"

let handler = async (m, { conn, args, command }) => {

    let txt = args.join` `

    	  if (!txt) return conn.reply(m.chat, 'please enter text!!!', m)

    	  if (txt.length > 15) return conn.reply (m.chat, 'maximum 15',m)

    conn.reply(m.chat, '*_Please Wait..._*',m)

    let oreoShizo

             if (/candy/.test(command)) oreoShizo = 'https://textpro.me/create-christmas-candy-cane-text-effect-1056.html'

             if (/christmas/.test(command)) oreoShizo = 'https://textpro.me/christmas-tree-text-effect-online-free-1057.html'

             if (/3dchristmas/.test(command)) oreoShizo = 'https://textpro.me/3d-christmas-text-effect-by-name-1055.html'

             if (/sparklechristmas/.test(command)) oreoShizo = 'https://textpro.me/sparkles-merry-christmas-text-effect-1054.html'

             if (/deepsea/.test(command)) oreoShizo = 'https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html'

             if (/scifi/.test(command)) oreoShizo = 'https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html'

             if (/rainbow/.test(command)) oreoShizo = 'https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html'

             if (/waterpipe/.test(command)) oreoShizo = 'https://textpro.me/create-3d-water-pipe-text-effects-online-1048.html'

             if (/spooky/.test(command)) oreoShizo = 'https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html'

             if (/pencil/.test(command)) oreoShizo = 'https://textpro.me/create-a-sketch-text-effect-online-1044.html'

             if (/circuit/.test(command)) oreoShizo = 'https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html'

             if (/discovery/.test(command)) oreoShizo = 'https://textpro.me/create-space-text-effects-online-free-1042.html'

             if (/metalic/.test(command)) oreoShizo = 'https://textpro.me/creat-glossy-metalic-text-effect-free-online-1040.html'

             if (/fiction/.test(command)) oreoShizo = 'https://textpro.me/create-science-fiction-text-effect-online-free-1038.html'

             if (/demon/.test(command)) oreoShizo = 'https://textpro.me/create-green-horror-style-text-effect-online-1036.html'

             if (/transformer/.test(command)) oreoShizo = 'https://textpro.me/create-a-transformer-text-effect-online-1035.html'

             if (/berry/.test(command)) oreoShizo = 'https://textpro.me/create-berry-text-effect-online-free-1033.html'

             if (/thunder/.test(command)) oreoShizo = 'https://textpro.me/online-thunder-text-effect-generator-1031.html'

             if (/magma/.test(command)) oreoShizo = 'https://textpro.me/create-a-magma-hot-text-effect-online-1030.html'

             if (/3dstone2/.test(command)) oreoShizo = 'https://textpro.me/create-a-3d-stone-text-effect-online-for-free-1073.html'

             if (/neonlight/.test(command)) oreoShizo = 'https://textpro.me/create-3d-neon-light-text-effect-online-1028.html'

             if (/glitch/.test(command)) oreoShizo = 'https://textpro.me/create-impressive-glitch-text-effects-online-1027.html'

             if (/harrypotter/.test(command)) oreoShizo = 'https://textpro.me/create-harry-potter-text-effect-online-1025.html'

             if (/brokenglass/.test(command)) oreoShizo = 'https://textpro.me/broken-glass-text-effect-free-online-1023.html'

             if (/papercut/.test(command)) oreoShizo = 'https://textpro.me/create-art-paper-cut-text-effect-online-1022.html'

             if (/watercolor/.test(command)) oreoShizo = 'https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html'

             if (/multicolor/.test(command)) oreoShizo = 'https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html'

             if (/neondevil/.test(command)) oreoShizo = 'https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html'

             if (/underwater/.test(command)) oreoShizo = 'https://textpro.me/3d-underwater-text-effect-generator-online-1013.html'

             if (/graffitibike/.test(command)) oreoShizo = 'https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html'

             if (/snow/.test(command)) oreoShizo = 'https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html'

             if (/cloud/.test(command)) oreoShizo = 'https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html'

             if (/honey/.test(command)) oreoShizo = 'https://textpro.me/honey-text-effect-868.html'

             if (/ice/.test(command)) oreoShizo = 'https://textpro.me/ice-cold-text-effect-862.html'

             if (/fruitjuice/.test(command)) oreoShizo = 'https://textpro.me/fruit-juice-text-effect-861.html'

             if (/biscuit/.test(command)) oreoShizo = 'https://textpro.me/biscuit-text-effect-858.html'

             if (/wood/.test(command)) oreoShizo = 'https://textpro.me/wood-text-effect-856.html'

             if (/chocolate/.test(command)) oreoShizo = 'https://textpro.me/chocolate-cake-text-effect-890.html'

             if (/strawberry/.test(command)) oreoShizo = 'https://textpro.me/strawberry-text-effect-online-889.html'

             if (/matrix/.test(command)) oreoShizo = 'https://textpro.me/matrix-style-text-effect-online-884.html'

          

             if (/dropwater/.test(command)) oreoShizo = 'https://textpro.me/dropwater-text-effect-872.html'

             if (/toxic/.test(command)) oreoShizo = 'https://textpro.me/toxic-text-effect-online-901.html'

             if (/lava/.test(command)) oreoShizo = 'https://textpro.me/lava-text-effect-online-914.html'

             if (/rockart/.test(command)) oreoShizo = 'https://textpro.me/rock-text-effect-online-915.html'

             if (/bloodglas/.test(command)) oreoShizo = 'https://textpro.me/blood-text-on-the-frosted-glass-941.html'

             if (/halloween/.test(command)) oreoShizo = 'https://textpro.me/halloween-fire-text-effect-940.html'

             if (/darkgold/.test(command)) oreoShizo = 'https://textpro.me/metal-dark-gold-text-effect-online-939.html'

             if (/joker/.test(command)) oreoShizo = 'https://textpro.me/create-logo-joker-online-934.html'

             if (/wicker/.test(command)) oreoShizo = 'https://textpro.me/wicker-text-effect-online-932.html'

             if (/firework/.test(command)) oreoShizo = 'https://textpro.me/firework-sparkle-text-effect-930.html'

             if (/skeleton/.test(command)) oreoShizo = 'https://textpro.me/skeleton-text-effect-online-929.html'

             if (/blackpinkart/.test(command)) oreoShizo = 'https://textpro.me/create-blackpink-logo-style-online-1001.html'

             if (/sand/.test(command)) oreoShizo = 'https://textpro.me/write-in-sand-summer-beach-free-online-991.html'

             if (/glue/.test(command)) oreoShizo = 'https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html'

           

                if (/leaves/.test(command)) oreoShizo = 'https://textpro.me/natural-leaves-text-effect-931.html'       



 textpro(oreoShizo, [`${txt}`])

.then(async (data) => {

let au = `${data}`

console.log(data)

let buf = await getBuffer(data);

conn.sendFile(m.chat, buf, 'Shizo-OREO-Bot', maker, m,)

    })

}

handler.help = ['candy <text>', 'christmas <text>', '3dchristmas <text>', 'sparklechristmas <text>', 'deepsea <text>', 'scifi <text>', 'rainbow2 <text>', 'waterpipe <text>', 'spooky <text>', 'pencil <text>', 'circuit <text>', 'discovery <text>', 'metalic <text>', 'fiction <text>', 'demon <text>', 'transformer <text>', 'berry <text>', 'thunder <text>', '. <text>', '3dstone2 <text>', 'neonlight <text>', 'glitch <text>', 'harrypotter <text>', 'brokenglass <text>', 'papercut <text>', 'watercolor <text>', 'multicolor <text>', 'neondevil <text>', 'underwater <text>', 'graffitibike <text>', 'snow <text>', 'cloud <text>', 'honey <text>', 'ice <text>', 'fruitjuice <text>', 'biscuit <text>', 'wood <text>', 'chocolate <text>', 'strawberry <text>', 'matrix <text>', 'dropwater <text>', 'toxic <text>', 'lava <text>', 'rockart <text>', 'bloodglas <text>', 'halloween <text>', 'darkgold <text>', 'joker <text>', 'wicker <text>', 'firework <text>', 'skeleton <text>', 'blackpinkart <text>', 'sand <text>', 'glue <text>', 'leaves <text>', 'demon <text>']

handler.tags = ['textpro']

handler.command = /^candy|christmas|3dchristmas|sparklechristmas|deepsea|scifi|rainbow2|waterpipe|spooky|pencil|circuit|discovery|metalic|fiction|demon|transformer|berry|thunder|3dstone2|neonlight|glitch|harrypotter|brokenglass|papercut|watercolor|multicolor|neondevil|underwater|graffitibike|snow|cloud|honey|ice|fruitjuice|biscuit|wood|chocolate|strawberry|matrix|dropwater|toxic|lava|rockart|bloodglas|halloween|darkgold|joker|wicker|firework|skeleton|blackpinkart|sand|glue|leaves|demon$/i



export default handler 







const getBuffer = async (url, options) => {

	try {

		options ? options : {}

		const res = await axios({

			method: "get",

			url,

			headers: {

				'DNT': 1,

                    'User-Agent': 'GoogleBot',

				'Upgrade-Insecure-Request': 1

			},

			...options,

			responseType: 'arraybuffer'

		})

		return res.data

	} catch (e) {

		console.log(`Error : ${e}`)

	}

}



          
