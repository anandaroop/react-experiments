import React from 'react'
import styled from 'styled-components'

const ModalOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: hsla(0, 0%, 50%, 0.5);
  visibility: hidden;

  // overlay is open
  &.modal-open {
    visibility: visible;
  }
`

const ModalWindow = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background: white;
  boxShadow: 0 0 10px #ccc;

  // overlay and modal are closed
  opacity: 0.1;
  transform: scale(0.95)
  transition: opacity 0.25s, transform 0.125s;

  // overlay and modal are open
  .modal-open > & {
    opacity: 1;
    transform: scale(1)
  }
`

class StaysMountedModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyup = this.handleKeyup.bind(this)
  }

  componentWillUpdate ({isOpen: willOpen}) {
    const { isOpen: wasOpen } = this.props

    if (willOpen) {
      window.addEventListener('keyup', this.handleKeyup)
    }

    if (wasOpen) {
      window.removeEventListener('keyup', this.handleKeyup)
    }
  }

  handleKeyup (e) {
    if (e.keyCode === 27) {
      this.props.onDismiss()
    }
  }

  render () {
    const { isOpen, children } = this.props
    const classes = []
    if (isOpen) classes.push('modal-open')
    return (
      <ModalOverlay className={classes.join(' ')}>
        <ModalWindow>
          {children}
        </ModalWindow> 
      </ModalOverlay>
    )
  }
}

export default StaysMountedModal
