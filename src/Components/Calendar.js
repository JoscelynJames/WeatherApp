import React, { Component } from 'react'
// Components
import Media from 'react-media'
import MobileView from './MobileView'
import DesktopView from './DesktopView'
import Loading from './Loading'

import { getHourOfDayFromEpoch } from '../Helpers/dateTime'

class Calendar extends Component {
  constructor() {
    super()

    this.state = {
      latitude: 0,
      longitude: 0,
      accessGranted: false,
      loading: true,
      forecast: {},
      isDay: true
    }
  }

  async componentDidMount() {
    // const currentTime = new Date()
    // if (currentTime.getHours() > 18) {
    //   this.setState({ ...this.state, isDay: false })
    //   document.body.classList.add('night')
    // } else {
    //   document.body.classList.add('day')
    // }
    // check if geolocation is available.
    if (navigator.permissions) {
      const permissions = await navigator.permissions.query({
        name: 'geolocation'
      })
      switch (permissions.state) {
        case 'denied':
          this.geolocationDenied()
          break
        case 'granted':
          this.getLocation()
          break
        default:
          this.setState({ ...this.state, loading: true })
      }
    }
  }

  geolocationDenied() {
    this.setState({ ...this.state, accessGranted: false, loading: false })
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        ...this.state,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accessGranted: true
      })
      this.fetchLocationInfo()
    })
  }

  async fetchLocationInfo() {
    try {
      const darkSkyResponse = await fetch(
        process.env.REACT_APP_DARK_SKY_API +
          'forecast/' +
          this.state.latitude +
          ',' +
          this.state.longitude
      )
      const forecast = await darkSkyResponse.json()

      this.setState({
        ...this.state,
        forecast,
        loading: false
      })

      this.setTimeOfDay()
    } catch (error) {
      console.error(error)
    }
  }

  setTimeOfDay() {
    // prettier-ignore
    const hourSunsets = getHourOfDayFromEpoch(this.state.forecast.daily.data[0].sunsetTime).replace(/\D/g, '')
    // prettier-ignore
    const hourSunrises = getHourOfDayFromEpoch(this.state.forecast.daily.data[0].sunriseTime).replace(/\D/g, '')
    // prettier-ignore
    const currentHour = getHourOfDayFromEpoch(new Date(), false).replace(/\D/g, '')

    if (currentHour >= hourSunsets || currentHour <= hourSunrises) {
      this.setState({ ...this.state, isDay: false })
      document.body.classList.add('night')
    } else {
      document.body.classList.add('day')
    }
  }

  render() {
    return this.state.loading ? (
      <div className="loading-container">
        <Loading message="Loading... Check your location settings if this screen persist." />
      </div>
    ) : (
      <Media query="(max-width: 599px)">
        {matches =>
          matches ? (
            <MobileView
              accessGranted={this.state.accessGranted}
              forecast={this.state.forecast}
              latLong={this.state.latitude + ',' + this.state.longitude}
              isDay={this.state.isDay}
            />
          ) : (
            <DesktopView accessGranted={this.state.accessGranted} />
          )
        }
      </Media>
    )
  }
}

export default Calendar
