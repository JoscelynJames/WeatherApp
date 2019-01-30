import React from 'react'
import { getDateFromEpoch, getDayOfWeek } from '../Helpers/dateTime'

const WeekView = ({ weeklyForecast }) => {
  return (
    <div className="week-view-container">
      <table>
        <tbody>
          {weeklyForecast.map(day => {
            const date = getDateFromEpoch(day.time)
            return (
              <tr key={day.time}>
                <th className="day-of-week">{getDayOfWeek(date)}</th>
                <th>{day.temperatureMax.toFixed(0)}°</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default WeekView
