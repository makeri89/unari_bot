const axios = require('axios')
const { buildMessage } = require('./format')
const { matchTodaysDate, matchTomorrowsDate } =require('./dates')

const fetchData = async (url) => {
  const { data } = await axios.get(url)
  return data
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

module.exports = {
  fetchData,
  handleData
}