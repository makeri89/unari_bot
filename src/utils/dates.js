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

module.exports = {
  matchTodaysDate,
  matchTomorrowsDate,
  dateMatcher
}