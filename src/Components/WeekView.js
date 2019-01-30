import React from 'react'
import { getDateFromEpoch, getDayOfWeek } from '../Helpers/dateTime'

const WeekView = ({ weeklyForecast }) => {
  return (
    <div className="week-view-container">
      <table>
        {weeklyForecast.map((day, i) => {
          const date = getDateFromEpoch(day.time)
          return (
            <tbody key={day.time}>
              <tr onClick={e => handleClick(e)}>
                <th className={i + ' day-of-week'}>{getDayOfWeek(date)}</th>
                <th>{day.temperatureMax.toFixed(0)}°</th>
              </tr>
              <tr className={i + ' hide-day-info'}>
                <th>this is day info lalalala</th>
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  )
}

const handleClick = e => {
  const elements = document.getElementsByClassName(e.target.classList[0])

  if (elements[1].classList.contains('hide-day-info')) {
    elements[1].classList.remove('hide-day-info')
    elements[1].classList.add('show-day-info')
  } else {
    elements[1].classList.remove('show-day-info')
    elements[1].classList.add('hide-day-info')
  }
}

export default WeekView
