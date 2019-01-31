import React, { Component } from 'react'
import HourlyForecast from './HourlyForecast'
import Loading from './Loading'
import { getDateFromEpoch, getDayOfWeek } from '../Helpers/dateTime'
class WeekView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hourlyForecast: {},
      sunset: 0,
      sunrise: 0
    }
  }

  getHourlyForecast = async (epochTimeStamp, latLong) => {
    const darkSkyResponse = await fetch(
      process.env.REACT_APP_DARK_SKY_API +
        'forecast/' +
        latLong +
        ',' +
        epochTimeStamp
    )
    const forecast = await darkSkyResponse.json()
    console.log(forecast)
    this.setState({
      hourlyForecast: forecast.hourly,
      sunset: forecast.daily.data[0].sunsetTime,
      sunrise: forecast.daily.data[0].sunriseTime
    })
  }

  handleClick = (e, epochTimeStamp) => {
    this.setState({ hourlyForecast: {} })
    this.getHourlyForecast(epochTimeStamp, this.props.latLong)
    // check for any nodes that are already expanded
    // we will want to collapse them before opening another
    const expandedDayInfo = document.getElementsByClassName('show-day-info')
    if (expandedDayInfo.length) {
      expandedDayInfo[0].classList.add('hide-day-info')
      expandedDayInfo[0].classList.remove('show-day-info')
    }

    const elements = document.getElementsByClassName(e.target.classList[0])
    if (elements[1].classList.contains('hide-day-info')) {
      elements[1].classList.remove('hide-day-info')
      elements[1].classList.add('show-day-info')
    } else {
      elements[1].classList.remove('show-day-info')
      elements[1].classList.add('hide-day-info')
    }
  }

  render() {
    return (
      <div className="week-view-container">
        <table>
          {this.props.weeklyForecast.map((day, i) => {
            const date = getDateFromEpoch(day.time)
            return (
              <tbody key={day.time}>
                <tr onClick={e => this.handleClick(e, day.time)}>
                  <th className={i + ' day-of-week'}>{getDayOfWeek(date)}</th>
                  <th>{day.temperatureMax.toFixed(0)}°</th>
                </tr>
                <tr className={i + ' hide-day-info'}>
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
          })}
        </table>
      </div>
    )
  }
}

export default WeekView
