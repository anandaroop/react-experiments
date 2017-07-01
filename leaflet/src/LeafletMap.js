import React from 'react'
import _ from 'lodash'
import L from 'leaflet'
import 'leaflet-providers'

class LeafletMap extends React.Component {
  constructor(props) {
    super(props)
    const { lat, lng, zoom } = this.props
    this.state = {
      lat,
      lng,
      zoom,
      shows: []
    }
    this.updateStateFromMap = this.updateStateFromMap.bind(this)
    this.fetchShows = this.fetchShows.bind(this)
  }

  fetchShows() {
    const bounds = this._map.getBounds()
    const corners = [
      bounds.getNorthWest().wrap(),
      bounds.getNorthEast().wrap(),
      bounds.getSouthEast().wrap(),
      bounds.getSouthWest().wrap(),
      bounds.getNorthWest().wrap()
    ]
    const boundingBoxString = _.flatten(corners.map(p => [p.lat, p.lng])).join(',')
    const uri = `https://api.artsy.net/api/v1/shows?status=current&geo_within=${boundingBoxString}&size=50`
    window
      .fetch(uri, {
        credentials: 'include'
      })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ shows: data })
        console.log('fetched', data.length, 'shows from', uri)
      })
  }

  componentDidMount() {
    // instantiate
    const { lat, lng, zoom } = this.state
    this._map = L.map(this.props.id).setView([lat, lng], zoom)
    this._markers = L.layerGroup().addTo(this._map)
    L.tileLayer.provider('CartoDB.Positron').addTo(this._map)

    // events
    this._map.on('moveend', this.updateStateFromMap)
    this._map.on('moveend', _.debounce(this.fetchShows, 500))
  }

  componentDidUpdate(_prevProps, prevState) {
    if (!_.isEqual(this.state.shows, prevState.shows)) {
      this._markers.clearLayers()
      this.state.shows.forEach(s => {
        L.circleMarker(s.coordinates).addTo(this._markers)
      })
    }
  }

  updateStateFromMap() {
    this.setState({
      lat: this._map.getCenter().lat,
      lng: this._map.getCenter().lng,
      zoom: this._map.getZoom()
    })
  }

  render() {
    const { id, style } = this.props
    return <div id={id} style={style} ref={el => (this.el = el)} />
  }
}

export default LeafletMap
