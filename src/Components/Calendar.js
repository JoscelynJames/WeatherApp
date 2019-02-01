import React, { Component } from 'react'
// Components
import Media from 'react-media'
import MobileView from './MobileView'
import DesktopView from './DesktopView'
import Loading from './Loading'

import { getDateFromEpoch } from '../Helpers/dateTime'

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
    this.setState({ ...this.state, accessGranted: false, loading: true })
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
    const hourSunsets = getDateFromEpoch(this.state.forecast.daily.data[0].sunsetTime).getHours()
    // prettier-ignore
    const hourSunrises = getDateFromEpoch(this.state.forecast.daily.data[0].sunriseTime).getHours()
    // prettier-ignore
    const currentHour = new Date().getHours()

    if (currentHour >= hourSunrises) {
      this.setState({ ...this.state, isDay: true })
      document.body.classList.add('day')
    }

    if (currentHour > hourSunsets || currentHour < hourSunrises) {
      this.setState({ ...this.state, isDay: false })
      document.body.classList.add('night')
    }
  }

  render() {
    return this.state.loading ? (
      <div className="loading-container">
        <Loading message="Loading... Check your location settings if this screen persist." />
      </div>
    ) : (
      <Media query="(max-width: 780px)">
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
