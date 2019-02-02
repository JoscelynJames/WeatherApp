export const getDateFromEpoch = epoch => {
  // https://stackoverflow.com/a/8016205/8645245
  const date = new Date(0)
  const epochDate = date.setUTCSeconds(epoch)
  return new Date(epochDate)
}

export const getDayOfWeek = utcDate => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  return days[utcDate.getDay()]
}

export const getHourOfDayFromEpoch = epoch => {
  const date = getDateFromEpoch(epoch)

  const hours = [
    '12am',
    '1am',
    '2am',
    '3am',
    '4am',
    '5am',
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm',
    '8pm',
    '9pm',
    '10pm',
    '11pm',
    '12pm'
  ]

  return hours[date.getHours()]
}

export const getExactTime = epoch => {
  const date = getDateFromEpoch(epoch)
  const hour = getHourOfDayFromEpoch(date).replace(/\D/g, '')
  const minutes = date.getMinutes()
  return `${hour}:${minutes}`
}
