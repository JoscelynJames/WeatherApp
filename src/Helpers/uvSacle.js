export const getUvScale = index => {
  switch (index) {
    case 1:
    case 2:
      return 'green'
    case 3:
    case 4:
    case 5:
      return 'yellow'
    case 6:
    case 7:
      return 'orange'
    case 8:
    case 9:
    case 10:
      return 'red'
    default:
      return 'purple'
  }
}
