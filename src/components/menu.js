const { Menu } = require('@grammyjs/menu')
const { fetchData, handleData } = require('../utils/data')
const url = require('../utils/url')

const tomorrowMenu = new Menu('restaurants')
  .text('Exactum', async (ctx) => {
    const data = await fetchData(url.EXACTUM_URL)
    const message = handleData(data, 'Exactum', 1)
    ctx.reply(message)
  })
  .text('Physicum', async (ctx) => {
    const data = await fetchData(url.PHYSICUM_URL)
    const message = handleData(data, 'Physicum', 1)
    ctx.reply(message)
  })
  .text('Chemicum', async (ctx) => {
    const data = await fetchData(url.CHEMICUM_URL)
    const message = handleData(data, 'Chemicum', 1)
    ctx.reply(message)
  })

module.exports = {
  tomorrowMenu
}