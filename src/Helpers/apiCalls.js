export const getDarSkyForecast = async params => {
  try {
    const darkSkyResponse = await fetch(
      process.env.REACT_APP_DARK_SKY_API + 'forecast/' + params
    )
    return await darkSkyResponse.json()
  } catch (err) {
    console.log(err)
  }
}
