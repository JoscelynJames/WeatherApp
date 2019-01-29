import React, { Component } from 'react'
import Snowflake from '../images/Snowflake.svg'
import Snowing from '../images/Snowing.svg'
import Cloud from '../images/Cloud.svg'
import PartlyCloudy from '../images/Cloudy.svg'
import Moon from '../images/Moon.svg'
import Rain from '../images/rain.svg'
import Sun from '../images/Sun.svg'

class WeatherIcon extends Component {
  constructor(props) {
    super(props)
  }

  getIcon(icon) {
    switch (icon) {
      case 'snow':
        return Snowing
      case 'rain':
        return Rain
      case 'partly-cloudy-day':
        return PartlyCloudy
      case 'clear-day':
        return Cloud
      default:
        return Sun
    }
  }

  render() {
    return (
      <div className="weather-icon">
        <img src={this.getIcon(this.props.icon)} alt={this.props.icon} />
      </div>
    )
  }
}

export default WeatherIcon
