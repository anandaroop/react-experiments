import React, { Component } from 'react';
// import CSSTransitionGroup from 'react-transition-group'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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

class Modal extends React.Component {
  constructor () {
    super()
    this.handleDismiss = this.handleDismiss.bind(this)
  }

  componentWillEnter () {
    console.log('entering')
  }

  componentWillLeave () {
    console.log('leaving')
  }

  handleDismiss () {
    this.props.onDismiss()
  }

  render () {
    return (
      <div className="modal">
        <h1>Modal</h1>
        <a href="#" onClick={this.handleDismiss}>cancel</a>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      isModal: false
    }
    this.toggle = this.toggle.bind(this)
    this.maybeRenderModal = this.maybeRenderModal.bind(this)
  }

  toggle () {
    this.setState({
      isModal: !this.state.isModal
    })
  } 

  maybeRenderModal () {
    const { isModal } = this.state
    return (
      <ReactCSSTransitionGroup
        transitionName="modal"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>

        { isModal && 
          <Modal onDismiss={(e) => this.toggle()}> 
            <p>
              heyyyyyy
            </p>
          </Modal>
        }

      </ReactCSSTransitionGroup>
    )
  }

  render() {
    return (
      <div>
        <Button href="#" onClick={this.toggle}>modal</Button>      
        {this.maybeRenderModal()}
        <Grid>
          {artworks.map(w => <StyledArtwork key={w.id} {...w} />)}
        </Grid>
      </div>
    );
  }
}

export default App;
