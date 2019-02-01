import React, { Component } from 'react'
import HourlyForecast from './HourlyForecast'
import Loading from './Loading'
import { getDateFromEpoch, getDayOfWeek } from '../Helpers/dateTime'

class DayRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hourlyForecast: {},
      sunset: 0,
      sunrise: 0
    }
  }

  getHourlyForecast = async (epochTimeStamp, latLong) => {
    if (!this.state.hourlyForecast.data) {
      const darkSkyResponse = await fetch(
        process.env.REACT_APP_DARK_SKY_API +
          'forecast/' +
          latLong +
          ',' +
          epochTimeStamp
      )
      const forecast = await darkSkyResponse.json()

      this.setState({
        hourlyForecast: forecast.hourly,
        sunset: forecast.daily.data[0].sunsetTime,
        sunrise: forecast.daily.data[0].sunriseTime
      })
    }
  }

  handleClick = (e, epochTimeStamp) => {
    this.getHourlyForecast(epochTimeStamp, this.props.latLong)

    const elements = document.getElementsByClassName(e.target.classList[0])
    if (elements[1].classList.contains('close')) {
      elements[1].classList.remove('close')
      elements[1].classList.add('open')
    } else {
      elements[1].classList.remove('open')
      elements[1].classList.add('close')
    }
  }

  render() {
    const date = getDateFromEpoch(this.props.time)
    return (
      <tbody>
        <tr onClick={e => this.handleClick(e, this.props.time)}>
          <th className={this.props.index + ' day-of-week pointer'}>
            {getDayOfWeek(date)}
          </th>
          <th>{this.props.temp}°</th>
        </tr>
        <tr className={this.props.index + ' close'}>
          <th>
            {this.state.hourlyForecast.data ? (
              <HourlyForecast
                forecast={this.state.hourlyForecast}
                sunset={this.state.sunset}
                sunrise={this.state.sunrise}
              />
            ) : (
              <Loading message="Loading your hourly forecast..." />
            )}
          </th>
        </tr>
      </tbody>
    )
  }
}

export default DayRow
