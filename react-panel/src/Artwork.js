import React from 'react'
import styled from 'styled-components'

class Artwork extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.onToggle(this.props._id)
  }
  render() {
    const { className, display, image_url } = this.props
    return (
      <div className={className} onClick={this.handleClick}>
        <h2>{display}</h2>
        <img alt={display} src={image_url} />  
      </div>
    )
  }
}

const StyledArtwork = styled(Artwork)`
  outline: ${props => props.selected ? 'solid 2px purple' : 'solid 1px #eee'};
  flex: 0 1 20%;
  text-align: center;
  padding: 0.5em;
  margin: 1em;
  h2 {
    color: #666;
    font-size: 1em;
    font-weight: 300;
    margin-bottom: 0.5em;
  }
`

export default StyledArtwork
