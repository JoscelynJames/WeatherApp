import React from 'react'

const Banner = ({ name, temp }) => {
  return (
    <div className="banner">
      <h1>{name}</h1>
      <h1>{temp}°</h1>
    </div>
  )
}

export default Banner
