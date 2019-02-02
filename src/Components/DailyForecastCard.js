import React, { Component } from 'react'
import {
  getDayOfWeek,
  getExactTime,
  getDateFromEpoch
} from '../Helpers/dateTime'
import { getDarSkyForecast } from '../Helpers/apiCalls'
import HourlyForecast from './HourlyForecast'

class DailyForecastCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hourlyForecast: {}
    }
  }

  async componentDidMount() {
    console.log(this.props.day)
    const forecast = await getDarSkyForecast(
      `${this.props.latLong},${this.props.day.time}`
    )
    console.log('hourly', forecast.hourly)
    this.setState({ hourlyForecast: forecast.hourly })
  }

  render() {
    const day = this.props.day
    const time = getDateFromEpoch(day.time)
    return (
      <div className="daily-card-container">
        <header>
          <h1>{getDayOfWeek(time)}</h1>
          <aside>
            <h5>Sunrise: {getExactTime(day.sunriseTime)}am</h5>
            <h5>Sunset: {getExactTime(day.sunsetTime)}pm</h5>
          </aside>
        </header>
        {this.state.hourlyForecast.data ? (
          <HourlyForecast
            forecast={this.state.hourlyForecast}
            sunrise={this.props.day.sunriseTime}
            sunset={this.props.day.sunsetTime}
          />
        ) : null}
      </div>
    )
  }
}

export default DailyForecastCard
