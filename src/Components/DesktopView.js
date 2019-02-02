import React from 'react'
import DailyForecastCard from './DailyForecastCard'

const Calendar = ({ weeklyForecast, latLong }) => {
  return (
    <div className="desktop-container">
      {weeklyForecast.map((day, i) => (
        <DailyForecastCard key={i} day={day} latLong={latLong} />
      ))}
    </div>
  )
}

export default Calendar
