const express = require('express')
const { fetchData, handleData } = require('./utils/data')
const url = require('./utils/url')
const bot = require('./bot')

const app = express()

app.get('/', (_req, res) => {
  res.send('Hello, world!')
})

app.get('/api/chemicum', async (_req, res) => {
  const data = await fetchData(url.CHEMICUM_URL)
  const message = handleData(data, 'Chemicum')
  bot.api.sendMessage(
    process.env.CONVERSATION_ID,
    message,
    { parse_mode: 'MarkdownV2' }
  )
  res.send('Data was sent to you on Telegram')
})

app.get('/api/exactum', async (_req, res) => {
  const data = await fetchData(url.EXACTUM_URL)
  const message = handleData(data, 'Exactum')
  bot.api.sendMessage(
    process.env.CONVERSATION_ID,
    message,
    { parse_mode: 'MarkdownV2' }
  )
  res.send('Data was sent to you on Telegram')
})

module.exports = app