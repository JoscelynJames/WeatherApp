import React from 'react'
// import Snowflake from '../images/Snowflake.svg'
import Snowing from '../images/Snowing.svg'
import Cloud from '../images/Cloud.svg'
import PartlyCloudySun from '../images/Cloudy.svg'
import PartlyCloudyMoon from '../images/CloudyMoon.svg'
import Moon from '../images/Moon.svg'
import Rain from '../images/rain.svg'
import Sun from '../images/Sun.svg'

const WeatherIcon = ({ icon, type }) => {
  return (
    <div className={type}>
      <img src={getIcon(icon)} alt={icon} />
    </div>
  )
}

const getIcon = icon => {
  switch (icon) {
    case 'snow':
      return Snowing
    case 'rain':
      return Rain
    case 'partly-cloudy-day':
      return PartlyCloudySun
    case 'partly-cloudy-night':
      return PartlyCloudyMoon
    case 'clear-day':
      return Sun
    case 'clear-night':
      return Moon
    case 'fog':
      return Cloud
    default:
      return Sun
  }
}

export default WeatherIcon
