import React, { Component } from 'react'
import {
  getDayOfWeek,
  getExactTime,
  getDateFromEpoch,
  getHourOfDayFromEpoch
} from '../Helpers/dateTime'
import { getMoonPhase } from '../Helpers/moonPhase'
import { getDarSkyForecast } from '../Helpers/apiCalls'
import { getUvScale } from '../Helpers/uvSacle'
import HourlyForecast from './HourlyForecast'
import WeatherIcon from './WeatherIcon'

class DailyForecastCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hourlyForecast: {}
    }
  }

  async componentDidMount() {
    const forecast = await getDarSkyForecast(
      `${this.props.latLong},${this.props.day.time}`
    )
    this.setState({ hourlyForecast: forecast.hourly })
  }

  render() {
    const day = this.props.day
    const time = getDateFromEpoch(day.time)
    return (
      <div className="daily-card-container">
        <header>
          <h1>{getDayOfWeek(time)}</h1>
          <WeatherIcon icon={day.icon} type="desktop-card-icon" />
        </header>
        <section>
          <h4>Sunrise: {getExactTime(day.sunriseTime)}am</h4>
          <h4>Sunset: {getExactTime(day.sunsetTime)}pm</h4>
        </section>
        <main>{day.summary}</main>
        {this.state.hourlyForecast.data ? (
          <HourlyForecast
            forecast={this.state.hourlyForecast}
            sunrise={this.props.day.sunriseTime}
            sunset={this.props.day.sunsetTime}
          />
        ) : null}
        <section className="info-section">
          <article>
            <h3>Temp:</h3>
            <aside>
              <h4>High: {day.temperatureHigh.toFixed(0)}°</h4>
              <h4>Low: {day.temperatureLow.toFixed(0)}° </h4>
              <h4>Humidity: {(day.humidity * 100).toFixed(0)}% </h4>
            </aside>
          </article>
          <article>
            <h3>Precipitation:</h3>
            <aside>
              <h4>Probability: {(day.precipProbability * 100).toFixed(2)}% </h4>
              <h4>
                Time: {getHourOfDayFromEpoch(day.precipIntensityMaxTime)}{' '}
              </h4>
              <h4>Type: {day.precipType} </h4>
            </aside>
          </article>
          <article>
            <h3>
              Wind
              <br />
              (km per/hour):
            </h3>
            <aside>
              <h4>Avg. Speed: {day.windSpeed}</h4>
              <h4>Max Gust: {day.windGust} </h4>
              <h4>Peak time: {getHourOfDayFromEpoch(day.windGustTime)} </h4>
            </aside>
          </article>
          <article>
            <h3>Summary:</h3>
            <aside>
              <h4>Moon: {getMoonPhase(day.moonPhase * 100)}</h4>
              <h4 class="row">
                UV Index: {day.uvIndex}
                <div className={getUvScale(day.uvIndex) + ' uv-scale'}></div>
              </h4>
              <h4>UV Peak Time: {getHourOfDayFromEpoch(day.uvIndexTime)} </h4>
              <h4>Ozone: {day.ozone} </h4>
              <h4>Cloud Coverage: {day.cloudCover}pm</h4>
            </aside>
          </article>
        </section>
      </div>
    )
  }
}

export default DailyForecastCard
