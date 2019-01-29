import React from 'react'
import dayMountains from '../images/Mountains.svg'
import nightMountains from '../images/NightMountains.svg'

const Mountains = ({ isDay }) => {
  console.log(isDay)
  return isDay ? (
    <img className="mountains" src={dayMountains} alt="" />
  ) : (
    <img className="mountains" src={nightMountains} alt="" />
  )
}

export default Mountains
