import React, { Component } from 'react'
//
// import DayMountains from './Mountains/DayMountains'
// import NightMountains from './Mountains/NightMountains'
import Banner from './Banner'
import WeekView from './WeekView'
import WeatherIcon from './WeatherIcon'
import Mountains from './Mountains'

class MobileView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: undefined,
      name: undefined,
      temp: undefined,
      icon: undefined
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.setName()
    this.setTempData()
  }

  setName() {
    let name = this.props.forecast.timezone
      .split('/')
      .map(string => string.replace(/([_])/g, ' '))
    // name will be prefixed with the country. We will want to remove that
    name.shift()
    this.setState({ name: name.join() })
  }

  setTempData() {
    const temp = this.props.forecast.currently.temperature.toFixed(0)
    const icon = this.props.forecast.currently.icon
    this.setState({ temp, icon })
  }

  render() {
    return (
      <div>
        <Mountains isDay={this.props.isDay} />
        <WeatherIcon icon={this.state.icon} />
        <Banner name={this.state.name} temp={this.state.temp} />
        <WeekView weeklyForecast={this.props.forecast.daily.data} />
      </div>
    )
  }
}

export default MobileView
