import React, { Component } from 'react'
// Components
import Media from 'react-media'
import MobileView from './MobileView'
import DesktopView from './DesktopView'
import Loading from './Loading'
import SearchByZip from './SearchByZip'

import { getDateFromEpoch } from '../Helpers/dateTime'
import { getDarSkyForecast } from '../Helpers/apiCalls'
import zipcodes from 'zipcodes'

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

    if (this.props.location.search) {
      const zipcode = this.props.location.search.split('=')[1]
      const { latitude, longitude } = zipcodes.lookup(zipcode)

      this.setState({
        accessGranted: true,
        loading: true,
        latitude,
        longitude
      })
      this.fetchLocationInfo()
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
    const forecast = await getDarSkyForecast(
      `${this.state.latitude},${this.state.longitude}`
    )

    this.setState({
      ...this.state,
      forecast,
      loading: false
    })

    this.setTimeOfDay()
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
    ) : this.state.accessGranted ? (
      <Media query="(max-width: 780px)">
        {matches =>
          matches ? (
            <MobileView
              forecast={this.state.forecast}
              latLong={this.state.latitude + ',' + this.state.longitude}
            />
          ) : (
            <DesktopView
              weeklyForecast={this.state.forecast.daily.data}
              latLong={this.state.latitude + ',' + this.state.longitude}
            />
          )
        }
      </Media>
    ) : (
      <SearchByZip />
    )
  }
}

export default Calendar
