import React from 'react'

const WeekView = ({ weeklyForecast }) => {
  return (
    <div className="week-view-container">
      <table>
        <tbody>
          {weeklyForecast.map(day => {
            utcDate.setUTCSeconds(day.time)
            return (
              <tr key={day.time}>
                <th className="day-of-week">{getDayOfWeek(utcDate)}</th>
                <th>{day.temperatureMax.toFixed(0)}°</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// 0 is the key which sets the date to the epoch
// All timestamps from DarkSky are in epoch timestamps
const utcDate = new Date(0)

const getDayOfWeek = utcDate => {
  switch (utcDate.getDay()) {
    case 1:
      return 'Monday'
    case 2:
      return 'Tuesday'
    case 3:
      return 'Wednesday'
    case 4:
      return 'Thursday'
    case 5:
      return 'Friday'
    case 6:
      return 'Saturday'
    default:
      return 'Sunday'
  }
}

export default WeekView
