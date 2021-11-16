const { Bot } = require('grammy')
const { hydrateReply, parseMode } = require('parse-mode')

const { fetchData, handleData } = require('./utils/data')
const { tomorrowMenu } = require('./components/menu')
const { usage } = require('./utils/usage')
const url = require('./utils/url')

const bot = new Bot(process.env.BOT_TOKEN)
bot.use(hydrateReply)
bot.api.config.use(parseMode('MarkdownV2'))

bot.use(tomorrowMenu)

bot.command('start', (ctx) => ctx.reply('*Welcome*\nI am unari\\_bot\\.\n\n\/help to list my commands\\.'))

bot.command('help', (ctx) => ctx.reply(usage))

bot.command('metsatalo', async (ctx) => {
  const data = await fetchData(url.METSATALO_URL)
  const message = handleData(data, 'Metsätalo')
  ctx.reply(message)
})

bot.command('olivia', async (ctx) => {
  const data = await fetchData(OLIVIA_URL)
  const message = handleData(data, 'Olivia')
  ctx.reply(message)
})

bot.command('cafe_portaali', async (ctx) => {
  const data = await fetchData(url.CAFE_PORTAALI_URL)
  const message = handleData(data, 'Cafe Portaali')
  ctx.reply(message)
})

bot.command('pescovege', async (ctx) => {
  const data = await fetchData(url.PESCO_VEGE_URL)
  const message = handleData(data, 'Pesco & Vege Topelias')
  ctx.reply(message)
})

bot.command('kaivopiha', async (ctx) => {
  const data = await fetchData(url.KAIVOPIHA_URL)
  const message = handleData(data, 'Kaivopiha')
  ctx.reply(message)
})

bot.command('chemicum', async (ctx) => {
  const data = await fetchData(url.CHEMICUM_URL)
  const message = handleData(data, 'Chemicum')
  ctx.reply(message)
})

bot.command('exactum', async (ctx) => {
  const data = await fetchData(url.EXACTUM_URL)
  const message = handleData(data, 'Exactum')
  ctx.reply(message)
})

bot.command('physicum', async (ctx) => {
  const data = await fetchData(url.PHYSICUM_URL)
  const message = handleData(data, 'Physicum')
  ctx.reply(message)
})

bot.command('meilahti', async (ctx) => {
  const data = await fetchData(url.MEILAHTI_URL)
  const message = handleData(data, 'Meilahti')
  ctx.reply(message)
})

bot.command('sockom', async (ctx) => {
  const data = await fetchData(url.SOCKOM_URL)
  const message = handleData(data, 'Soc&Kom')
  ctx.reply(message)
})

bot.command('biokeskus', async (ctx) => {
  const data = await fetchData(url.BIOKESKUS_URL)
  const message = handleData(data, 'Biokeskus')
  ctx.reply(message)
})

bot.command('korona', async (ctx) => {
  const data = await fetchData(url.KORONA_URL)
  const message = handleData(data, 'Korona')
  ctx.reply(message)
})

bot.command('viikuna', async (ctx) => {
  const data = await fetchData(url.VIIKUNA_URL)
  const message = handleData(data, 'Viikuna')
  ctx.reply(message)
})

bot.command('tomorrow', (ctx) => {
  ctx.reply('See the menu for tomorrow in:', { reply_markup: tomorrowMenu })
})

bot.catch((error) => {
  const ctx = error.ctx
  console.error(error)
  bot.api.sendMessage(
    process.env.CONVERSATION_ID,
    'An error occurred'
  )
})

module.exports = bot