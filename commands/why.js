const axios = require('axios')

module.exports = {
   name: 'why',
   category: 'fun',
   desc: 'Sends a why question!!',
   async exec(citel, Void,args,icmd) {
  const { data } = await axios.get('https:/nekos.life//api/v2/why')
  citel.reply('```'+data.why+'```')
    
   }
}
