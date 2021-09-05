require('dotenv').config()
const { Telegram } = require('telegraf')
const express = require('express')
const axios = require('axios')

const bot = new Telegram(process.env.BOT_TOKEN)

const app = express()

const CHEMICUM_URL = 'https://messi.hyyravintolat.fi/publicapi/restaurant/10'

const matchDate = (day) => {
  const date = new Date()
  const tDate = date.getDate()
  const tMonth = date.getMonth() + 1
  const splitDay = day.date.split(' ')[1].split('.')
  return tDate == Number(splitDay[0]) && tMonth == Number(splitDay[1])
}

app.get('/', (_req, res) => {
  res.send('Hello, world!')
})

app.get('/hello', (_req, res) => {
  axios
    .get(CHEMICUM_URL)
    .then(({ data }) => {
      const todaysMenu = data.data.filter(matchDate)
      const foodNames = todaysMenu[0].data.map(item => item.name)
      const date = todaysMenu[0].date.split(' ')[1]
      let message = 'Chemicum ' + date + '.:\n'
      foodNames.map(foodName => message = message + foodName + '\n')
      bot.sendMessage('1137434810', message)
    })
  res.send('hello')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Working')
})