export const getMoonPhase = percent => {
  if (percent === 0) {
    return 'New Moon'
  } else if (percent < 25) {
    return 'Waxing Crescent'
  } else if (percent === 25) {
    return 'First Quarter'
  } else if (percent > 25) {
    return 'Waxing Gibbous'
  } else if (percent === 50) {
    return 'Full'
  } else if (percent > 50) {
    return 'Wanning Gibbous'
  } else if (percent === 74) {
    return 'Last Quarter'
  } else if (percent > 74) {
    return 'Wanning Crescent'
  } else {
    return 'Moon'
  }
}
