require('dotenv').config()
const express = require('express')
const axios = require('axios')
const { Bot } = require('grammy')
const { hydrateReply, parseMode } = require('parse-mode')
const { Menu } = require('@grammyjs/menu')

const bot = new Bot(process.env.BOT_TOKEN)
bot.use(hydrateReply)
bot.api.config.use(parseMode('MarkdownV2'))

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

const matchTodaysDate = (day) => {
  const date = new Date()
  return dateMatcher(day, date)
}

const matchTomorrowsDate = (day) => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return dateMatcher(day, date)
}

const dateMatcher = (day, wantedDate) => {
  const tDate = wantedDate.getDate()
  const tMonth = wantedDate.getMonth() + 1
  const splitDay = day.date.split(' ')[1].split('.')
  return tDate == Number(splitDay[0]) && tMonth == Number(splitDay[1])
}

const buildMessage = (restaurant, foodNames, date, openingTime, closingTime) => {
  let message = `*${restaurant} ${date}\\.*\n\n`
  message += `Avoinna ${openingTime}\\-${closingTime}\\.\n\n`
  foodNames.map(foodName => message = message + formatMessage(foodName) + '\n')
  return message
}

const handleData = (data, restaurant, daysToAdd=0) => {
  let menu
  if (daysToAdd === 1) {
    menu = data.data.filter(matchTomorrowsDate)
  } else {
    menu = data.data.filter(matchTodaysDate)
  }
  
  foodNames = menu[0].data.map(item => item.name)
  foodNames = foodNames.filter(item => !item.startsWith('Olemme avoinna'))
  const date = menu[0].date.split(' ')[1].split('.')
  const parsedDate = date[0] + '\\.' + date[1]
  const openingTime = data.information.business.regular[0].open
  const closingTime = data.information.business.regular[0].close
  const message = buildMessage(restaurant, foodNames, parsedDate, openingTime, closingTime)
  return message
}

const formatMessage = (message) => {
  return message
    .replace(/_/g, "\\_")
    .replace(/\*/g, "\\*")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/~/g, "\\~")
    .replace(/`/g, "\\`")
    .replace(/>/g, "\\>")
    .replace(/#/g, "\\#")
    .replace(/\+/g, "\\+")
    .replace(/-/g, "\\-")
    .replace(/=/g, "\\=")
    .replace(/\|/g, "\\|")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/\./g, "\\.")
    .replace(/!/g, "\\!");
};

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

const fetchData = async (url) => {
  const { data } = await axios.get(url)
  return data
}


bot.command('start', (ctx) => ctx.reply('*Welcome*\nI am unari\\_bot\\.\n\n\/help to list my commands\\.'))

bot.command('help', (ctx) => ctx.reply(usage))

bot.command('metsatalo', async (ctx) => {
  const data = await fetchData(METSATALO_URL)
  const message = handleData(data, 'Metsätalo')
  ctx.reply(message)
})

bot.command('olivia', async (ctx) => {
  const data = await fetchData(OLIVIA_URL)
  const message = handleData(data, 'Olivia')
  ctx.reply(message)
})

bot.command('cafe_portaali', async (ctx) => {
  const data = await fetchData(CAFE_PORTAALI_URL)
  const message = handleData(data, 'Cafe Portaali')
  ctx.reply(message)
})

bot.command('pescovege', async (ctx) => {
  const data = await fetchData(PESCO_VEGE_URL)
  const message = handleData(data, 'Pesco & Vege Topelias')
  ctx.reply(message)
})

bot.command('kaivopiha', async (ctx) => {
  const data = await fetchData(KAIVOPIHA_URL)
  const message = handleData(data, 'Kaivopiha')
  ctx.reply(message)
})

bot.command('chemicum', async (ctx) => {
  const data = await fetchData(CHEMICUM_URL)
  const message = handleData(data, 'Chemicum')
  ctx.reply(message)
})

bot.command('exactum', async (ctx) => {
  const data = await fetchData(EXACTUM_URL)
  const message = handleData(data, 'Exactum')
  ctx.reply(message)
})

bot.command('physicum', async (ctx) => {
  const data = await fetchData(PHYSICUM_URL)
  const message = handleData(data, 'Physicum')
  ctx.reply(message)
})

bot.command('meilahti', async (ctx) => {
  const data = await fetchData(MEILAHTI_URL)
  const message = handleData(data, 'Meilahti')
  ctx.reply(message)
})

bot.command('sockom', async (ctx) => {
  const data = await fetchData(SOCKOM_URL)
  const message = handleData(data, 'Soc&Kom')
  ctx.reply(message)
})

bot.command('biokeskus', async (ctx) => {
  const data = await fetchData(BIOKESKUS_URL)
  const message = handleData(data, 'Biokeskus')
  ctx.reply(message)
})

bot.command('korona', async (ctx) => {
  const data = await fetchData(KORONA_URL)
  const message = handleData(data, 'Korona')
  ctx.reply(message)
})

bot.command('viikuna', async (ctx) => {
  const data = await fetchData(VIIKUNA_URL)
  const message = handleData(data, 'Viikuna')
  ctx.reply(message)
})

const tomorrowMenu = new Menu('restaurants')
  .text('Exactum', async (ctx) => {
    const data = await fetchData(EXACTUM_URL)
    const message = handleData(data, 'Exactum', 1)
    ctx.reply(message)
  })
  .text('Physicum', async (ctx) => {
    const data = await fetchData(PHYSICUM_URL)
    const message = handleData(data, 'Physicum', 1)
    ctx.reply(message)
  })
  .text('Chemicum', async (ctx) => {
    const data = await fetchData(CHEMICUM_URL)
    const message = handleData(data, 'Chemicum', 1)
    ctx.reply(message)
  })
  

bot.use(tomorrowMenu)

bot.command('tomorrow', (ctx) => {
  ctx.reply('This is a menu', { reply_markup: tomorrowMenu })
})

bot.start()

app.get('/', (_req, res) => {
  res.send('Hello, world!')
})

app.get('/api/chemicum', (_req, res) => {
  axios
    .get(CHEMICUM_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Chemicum')
      bot.telegram.sendMessage(process.env.CONVERSATION_ID, message, { parse_mode: 'MarkdownV2' })
    })
    .then(() => res.send(foodNames))
})

app.get('/api/exactum', (_req, res) => {
  axios
    .get(EXACTUM_URL)
    .then(({ data }) => {
      const message = handleData(data, 'Exactum')
      bot.telegram.sendMessage(process.env.CONVERSATION_ID, message, { parse_mode: 'MarkdownV2' })
    })
    .then(() => res.send(foodNames))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Working')
})