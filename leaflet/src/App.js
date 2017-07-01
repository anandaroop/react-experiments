import React, { Component } from 'react'
import LeafletMap from './LeafletMap'

class App extends Component {
  render() {
    return (
      <div>
        <LeafletMap
          id="hello"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }}
        />
      </div>
    )
  }
}

export default App
