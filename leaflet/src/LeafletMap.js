import React from 'react'
import L from 'leaflet'
import 'leaflet-providers'

class LeafletMap extends React.Component {
  constructor(props) {
    super(props)
    const { lat, lng, zoom } = this.props
    this.state = {
      lat,
      lng,
      zoom
    }
    this.updateStateFromMap = this.updateStateFromMap.bind(this)
  }

  componentDidMount() {
    // instantiate
    const { lat, lng, zoom } = this.state
    this.map = L.map(this.props.id).setView([lat, lng], zoom)
    L.tileLayer.provider('CartoDB.Positron').addTo(this.map)

    // events
    this.map.on('moveend', this.updateStateFromMap)
  }

  updateStateFromMap() {
    this.setState({
      lat: this.map.getCenter().lat,
      lng: this.map.getCenter().lng,
      zoom: this.map.getZoom()
    })
  }

  render() {
    const { id, style } = this.props
    return <div id={id} style={style} ref={el => (this.el = el)} />
  }
}

export default LeafletMap
