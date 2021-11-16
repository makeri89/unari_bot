const formatMessage = (message) => {
  return message
    .replace(/_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/~/g, '\\~')
    .replace(/`/g, '\\`')
    .replace(/>/g, '\\>')
    .replace(/#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/-/g, '\\-')
    .replace(/=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\./g, '\\.')
    .replace(/!/g, '\\!')
}

const buildMessage = (restaurant, foodNames, date, openingTime, closingTime) => {
  let message = `*${restaurant} ${date}\\.*\n\n`
  message += `Avoinna ${openingTime}\\-${closingTime}\\.\n\n`
  foodNames.map(foodName => message = message + formatMessage(foodName) + '\n')
  return message
}

module.exports = {
  formatMessage,
  buildMessage
}