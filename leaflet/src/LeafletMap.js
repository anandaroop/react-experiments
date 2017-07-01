import React from 'react'
import L from 'leaflet'
import 'leaflet-providers'

const playground = [40.688425, -73.966375]

class LeafletMap extends React.Component {
  componentDidMount() {
    this.map = L.map(this.props.id).setView(playground, 15)
    L.tileLayer.provider('CartoDB.Positron').addTo(this.map)
  }

  render() {
    const { id, style } = this.props
    return <div id={id} style={style} ref={el => (this.el = el)} />
  }
}

export default LeafletMap
