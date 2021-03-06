import React from 'react'
import WeatherIcon from './WeatherIcon'
import { getHourOfDayFromEpoch } from '../Helpers/dateTime'

const HourlyForecast = ({ forecast, sunrise, sunset }) => {
  return (
    <div className="hourly-container">
      {forecast.data.map(hour => {
        return (
          <div key={hour.time} className="hourly-report">
            <div>
              <WeatherIcon icon={hour.icon} type="hourly-icon" />
              <p className="temp">{hour.temperature.toFixed(0)}°</p>
            </div>
            {isSunriseTime(hour.time, sunrise) ? (
              <p className="sunrise">sunrise</p>
            ) : null}
            {isSunsetTime(hour.time, sunset) ? (
              <p className="sunset">sunset</p>
            ) : null}
            <p className="hour">{getHourOfDayFromEpoch(hour.time)}</p>
          </div>
        )
      })}
    </div>
  )
}

const isSunriseTime = (currentTimeStamp, sunriseTimeStamp) => {
  return (
    getHourOfDayFromEpoch(currentTimeStamp) ===
    getHourOfDayFromEpoch(sunriseTimeStamp)
  )
}
const isSunsetTime = (currentTimeStamp, sunsetTimeStamp) => {
  return (
    getHourOfDayFromEpoch(currentTimeStamp) ===
    getHourOfDayFromEpoch(sunsetTimeStamp)
  )
}

export default HourlyForecast
