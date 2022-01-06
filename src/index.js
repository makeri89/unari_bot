require('dotenv').config()
const bot = require('./bot')
const app = require('./app')

bot.start()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Working')
})