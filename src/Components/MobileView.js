import React, { Component } from 'react'
//
import DayMountains from './Mountains/DayMountains'
import Banner from './Banner'

class MobileView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: undefined,
      name: undefined,
      name: undefined
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.setName()
    this.setTemp()
  }

  setName() {
    let name = this.props.forecast.timezone
      .split('/')
      .map(string => string.replace(/([_])/g, ' '))
    // name will be prefixed with the country. We will want to remove that
    name.shift()
    this.setState({ name: name.join() })
  }

  setTemp() {
    const temp = this.props.forecast.currently.temperature.toFixed(0)
    this.setState({ temp })
  }

  render() {
    return (
      <div>
        <DayMountains />
        <Banner name={this.state.name} temp={this.state.temp} />
      </div>
    )
  }
}

export default MobileView
