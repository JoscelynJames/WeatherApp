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
