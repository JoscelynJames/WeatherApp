import React, { Component } from 'react'
import Media from 'react-media'

class Calendar extends Component {
  render() {
    return (
      <Media query="(max-width: 599px)">
        {matches => (matches ? <p>Mobile</p> : <p>Full</p>)}
      </Media>
    )
  }
}

export default Calendar
