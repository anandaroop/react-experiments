import React, { Component } from 'react';
import styled from 'styled-components'
import artworks from './artworks.json'

const Artwork = ({className, title}) => (
  <div className={className}>
    <h1>{title}</h1>
  </div>
)

const StyledArtwork = styled(Artwork)`
  flex: 0 1 200px;
  height: 200px;
  margin: 1em;
  border: solid 1px gray;
  h1 {
    font-size: 1.2em;
  }
`

const Grid = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const Button = styled.a`
  display: inline-block;
  padding: 1em;
  border: solid 1px gray;
  margin: 1em;
`

const Modal = () => <h1>MODAL!</h1>

class App extends Component {
  constructor () {
    super()
    this.state = {
      isModal: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      isModal: !this.state.isModal
    })
  } 

  render() {
    return (
      <div>
        <Button href="#" onClick={this.toggle}>modal</Button>      
        { this.state.isModal && <Modal />}
        <Grid>
          {artworks.map(w => <StyledArtwork key={w.id} {...w} />)}
        </Grid>
      </div>
    );
  }
}

export default App;
