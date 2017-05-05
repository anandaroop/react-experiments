import React from 'react'
import styled from 'styled-components'
import Artwork from './Artwork'

const Grid = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const Button = styled.a`
  display: inline-block;
  background: transparent;
  border: solid 2px #bbb;
  color: #999;
  padding: 0.5em;
  margin: 0.5em;
  &:hover {
    background: purple;
    border-color: purple;
    color: white;
  }
`

const Overlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: hsla(0, 0%, 50%, 0.25);
  cursor: not-allowed;
`

const SlidingPanel = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.visible ? '0' : '-50%'};
  bottom: 0;
  width: 50%;
  border: solid 1px #ddd;
  box-shadow: 0 0 20px 10px hsla(0,0%,50%,0.1);
  background: hsla(0,0%,100%,0.90);
  transition: right ${props => props.duration};
`

const ZoomingModal = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  bottom: 20px;
  right: 20px;
  overflow: scroll;
  visibility: ${props => props.visible ? 'visible' : 'hidden' };
  opacity: ${props => props.visible ? '1' : '0' };
  transform: ${props => props.visible ? 'scale(1)' : 'scale(.97)' };
  border: solid 1px #999;
  box-shadow: 0 0 20px 10px hsla(0,0%,50%,0.1);
  background: hsla(0,0%,100%,1);
  transition: all ${props => props.duration};
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artworks: props.artworks,
      selectedArtworkIds: [],
      specifyingUpdate: false
    }

    this.onToggle = this.onToggle.bind(this)
    this.onEditArtworks = this.onEditArtworks.bind(this)
    this.onDismissEditArtworks = this.onDismissEditArtworks.bind(this)
  }

  onToggle(clickedId) {
    const { selectedArtworkIds } = this.state
    if (selectedArtworkIds.includes(clickedId)) {
      this.setState({
        selectedArtworkIds: selectedArtworkIds.filter(id => id !== clickedId)
      })
    } else {
      this.setState({
        selectedArtworkIds: [...selectedArtworkIds, clickedId]
      })
    }
  }

  onEditArtworks () {
    this.setState({
      specifyingUpdate: true
    })
  }

  onDismissEditArtworks () {
    this.setState({
      specifyingUpdate: false
    })
  }

  render() {
    const {artworks} = this.state
    return (
      <div>
        <div>
            <Button href='#' onClick={this.onEditArtworks}>Edit artworks</Button>
        </div>
        <Grid>
        { artworks.filter(w => w.title !== null).map(w => <Artwork key={w.id} {...w} onToggle={this.onToggle} selected={this.state.selectedArtworkIds.includes(w._id)} />) }
        </Grid>
        { this.state.specifyingUpdate && <Overlay /> }
        <ZoomingModal visible={this.state.specifyingUpdate} w="80%" duration="0.25s" style={{ color: '#999', padding: '1em'}}>
          <p style={{float: 'right'}}>
            <Button href="#" onClick={this.onDismissEditArtworks}>X</Button>
          </p>
          <p style={{color: 'purple'}}>
            Currently editing {this.state.selectedArtworkIds.length} artworks
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </ZoomingModal>
      </div>
    );
  }
}

export default App;
