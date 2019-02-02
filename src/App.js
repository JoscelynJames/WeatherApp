import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Calendar from './Components/Calendar'
import './App.scss'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Calendar} />
      </Router>
    )
  }
}

export default App
