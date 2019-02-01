import React from 'react'
import DayRow from './DayRow'

const WeekView = ({ weeklyForecast, latLong }) => {
  return (
    <div className="week-view-container">
      <table>
        {weeklyForecast.map((day, i) => {
          return (
            <DayRow
              index={i}
              key={day.time}
              time={day.time}
              temp={day.temperatureMax.toFixed(0)}
              latLong={latLong}
            />
          )
        })}
      </table>
    </div>
  )
}

export default WeekView
