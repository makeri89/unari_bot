require('dotenv').config()
const { Telegraf, Telegram } = require('telegraf')
const express = require('express')
const axios = require('axios')

const bot = new Telegraf(process.env.BOT_TOKEN)

const app = express()

const BASE_URL = 'https://messi.hyyravintolat.fi/publicapi/restaurant/'
const METSATALO_URL = BASE_URL + '1'
const OLIVIA_URL = BASE_URL + '2'
const CAFE_PORTAALI_URL = BASE_URL + '5'
const PESCO_VEGE_URL = BASE_URL + '7'
const KAIVOPIHA_URL = BASE_URL + '9'
const CHEMICUM_URL = BASE_URL + '10'
const EXACTUM_URL = BASE_URL + '11'
const PHYSICUM_URL = BASE_URL + '12'
const MEILAHTI_URL = BASE_URL + '13'
const SOCKOM_URL = BASE_URL + '15'
const BIOKESKUS_URL = BASE_URL + '16'
const KORONA_URL = BASE_URL + '17'
const VIIKUNA_URL = BASE_URL + '18'


const matchDate = (day) => {
  const date = new Date()
  const tDate = date.getDate()
  const tMonth = date.getMonth() + 1
  const splitDay = day.date.split(' ')[1].split('.')
  return tDate == Number(splitDay[0]) && tMonth == Number(splitDay[1])
}

const buildMessage = (restaurant, foodNames, date, openingTime, closingTime) => {
  let message = `*${restaurant} ${date}\\.*\n\n`
  message += `Avoinna ${openingTime}\\-${closingTime}\\.\n\n`
  foodNames.map(foodName => message = message + foodName.replace('.','\\.').replace(/-/g,'\\-') + '\n')
  return message
}

const handleData = (data, restaurant) => {
  const todaysMenu = data.data.filter(matchDate)
  foodNames = todaysMenu[0].data.map(item => item.name)
  const date = todaysMenu[0].date.split(' ')[1].split('.')
  const parsedDate = date[0] + '\\.' + date[1]
  const openingTime = data.information.business.regular[0].open
  const closingTime = data.information.business.regular[0].close
  const message = buildMessage(restaurant, foodNames, parsedDate, openingTime, closingTime)
  return message
}

const usage = 'I can tell you todays menu for some of the Unicafe ' +
              'restaurants in Helsinki\\.\n\n' +
              '*Available Unicafes are:*\n\n' +
              '\/metsatalo \\- Metsätalo\n' +
              '\/olivia \\- Olivia\n' + 
              '\/cafe\\_portaali \\- Cafe Portaali\n' +
              '\/pescovege \\- Pesco & Vege Topelias\n' +
              '\/kaivopiha \\- Kaivopiha\n' +
              '\/chemicum \\- Chemicum\n' + 
              '\/exactum \\- Exactum\n' +
              '\/physicum \\- Physicum\n' + 
              '\/meilahti \\- Meilahti\n' +
              '\/sockom \\- Soc&Kom\n' +
              '\/biokeskus \\- Biokeskus\n' +
              '\/korona \\- Korona\n' +
              '\/viikuna \\- Viikuna' +
              '\n\n More info [here\\.](https://unicafe.fi)'


bot.start((ctx) => ctx.replyWithMarkdownV2('*Welcome*\nI am unari\\_bot\\.\n\n\/help to list my commands\\.'))

bot.help((ctx) => ctx.replyWithMarkdownV2(usage))

bot.command('metsatalo', (ctx) => {
  axios
    .get(METSATALO_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Metsätalo')
      ctx.replyWithMarkdownV2(message)
    })
})
bot.command('olivia', (ctx) => {
  axios
    .get(OLIVIA_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Olivia')
      ctx.replyWithMarkdownV2(message)
    })
})
bot.command('cafe_portaali', (ctx) => {
  axios
    .get(CAFE_PORTAALI_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Cafe Portaali')
      ctx.reply(message)
    })
})
bot.command('pescovege', (ctx) => {
  axios
    .get(PESCO_VEGE_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Pesco & Vege Topelias')
      ctx.replyWithMarkdownV2(message)
    })
})
bot.command('kaivopiha', (ctx) => {
  axios
    .get(KAIVOPIHA_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Kaivopiha')
      ctx.replyWithMarkdownV2(message)
    })
})
bot.command('chemicum', (ctx) => {
  axios
    .get(CHEMICUM_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Chemicum')
      ctx.replyWithMarkdownV2(message)
    })
})
bot.command('exactum', (ctx) => {
  axios
    .get(EXACTUM_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Exactum')
      ctx.reply(message)
    })
})
bot.command('physicum', (ctx) => {
  axios
    .get(PHYSICUM_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Physicum')
      ctx.replyWithMarkdownV2(message)
    })
})
bot.command('meilahti', (ctx) => {
  axios
    .get(MEILAHTI_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Meilahti')
      ctx.replyWithMarkdownV2(message)
    })
})
bot.command('sockom', (ctx) => {
  axios
    .get(SOCKOM_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Soc&Kom')
      ctx.replyWithMarkdownV2(message)
    })
})
bot.command('biokeskus', (ctx) => {
  axios
    .get(BIOKESKUS_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Biokeskus')
      ctx.replyWithMarkdownV2(message)
    })
})
bot.command('korona', (ctx) => {
  axios
    .get(KORONA_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Korona')
      ctx.replyWithMarkdownV2(message)
    })
})
bot.command('viikuna', (ctx) => {
  axios
    .get(VIIKUNA_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Viikuna')
      ctx.replyWithMarkdownV2(message)
    })
})

bot.launch()

const automation_bot = new Telegram(process.env.BOT_TOKEN)

app.get('/', (_req, res) => {
  res.send('Hello, world!')
})

app.get('/api/chemicum', (_req, res) => {
  axios
    .get(CHEMICUM_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Chemicum')
      automation_bot.sendMessage(process.env.CONVERSATION_ID, message)
    })
    .then(() => res.send(foodNames))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Working')
})