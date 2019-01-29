import React, { Component } from 'react'
// Components
import Media from 'react-media'
import MobileView from './MobileView'
import DesktopView from './DesktopView'
import Loading from './Loading'

class Calendar extends Component {
  constructor() {
    super()

    this.state = {
      latitude: 0,
      longitude: 0,
      accessGranted: false,
      loading: true,
      forecast: {},
      error: false,
      dayTime: true
    }
  }

  async componentDidMount() {
    const currentTime = new Date()
    if (currentTime.getHours() > 18) {
      this.setState({ ...this.state, dayTime: false })
      document.body.classList.add('night')
    } else {
      document.body.classList.add('day')
    }
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
    } catch (error) {
      console.log(error)
      this.setState({ error })
    }
  }

  render() {
    return this.state.loading ? (
      <div>
        <Loading />
      </div>
    ) : (
      <Media query="(max-width: 599px)">
        {matches =>
          matches ? (
            <MobileView
              accessGranted={this.state.accessGranted}
              forecast={this.state.forecast}
              dayTime={this.state.dayTime}
            />
          ) : (
            <DesktopView accessGranted={this.state.accessGranted} />
          )
        }
      </Media>
    )
  }
}

// export interface StateInterface {
//   latitude: Number,
//   longitude: Number,
//   accessGranted: Boolean,
//   loading: Boolean,
//   forecast: Object,
//   error: Boolean
// }

export default Calendar
