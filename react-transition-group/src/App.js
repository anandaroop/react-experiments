import React, { Component } from 'react';
import styled from 'styled-components'
import artworks from './artworks.json'
import Modal from './Modal'

const Artwork = ({ className, title }) => (
  <div className={className}>
    <h1>{title}</h1>
  </div>
)

const StyledArtwork = styled(Artwork)`
  flex: 0 1 200px;
  height: 200px;
  margin: 1em;
  border: solid 1px gray;
  color: white;
  padding: 0;
  h1 {
    margin: 0;
    font-size: 1.2em;
    font-weight: 100;
  }
  background: url(${props => props.images[0].image_urls.square});
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

        <Modal
          isOpen={this.state.isModal}
          onDismiss={(e) => this.toggle()}> 
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Modal>

        <Grid>
          {artworks.map(w => <StyledArtwork key={w.id} {...w} />)}
        </Grid>
      </div>
    );
  }
}

export default App;
