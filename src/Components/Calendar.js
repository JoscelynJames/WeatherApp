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
      loading: true
    }
  }

  async componentDidMount() {
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
          this.setState({ loading: true })
      }
    }
  }

  geolocationDenied() {
    this.setState({ accessGranted: false, loading: false })
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accessGranted: true,
        loading: false
      })
    })
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
            <MobileView accessGranted={this.state.accessGranted} />
          ) : (
            <DesktopView accessGranted={this.state.accessGranted} />
          )
        }
      </Media>
    )
  }
}

export default Calendar
