import React from 'react';
import styled from 'styled-components'
// import CSSTransitionGroup from 'react-transition-group'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Modal extends React.Component {
  constructor () {
    super()
    this.dismiss = this.dismiss.bind(this)
    this.handleKeyup = this.handleKeyup.bind(this)
  }

  componentWillReceiveProps ({isOpen}) {
    if (isOpen) {
      window.addEventListener('keyup', this.handleKeyup)
    } else {
      window.removeEventListener('keyup', this.handleKeyup)
    }
  }

  dismiss () {
    this.props.onDismiss()
  }

  handleKeyup (e) {
    if (e.keyCode === 27) {
      this.dismiss()
    }
  }

  render () {
    const { isOpen } = this.props
    return (
        <ModalTransition>
          <ReactCSSTransitionGroup
            transitionName="modal"
            transitionEnterTimeout={125}
            transitionLeaveTimeout={125}>

            { isOpen &&
              <ModalContent>
                <h1>Modal</h1>
                  <a href="#" onClick={this.dismiss}>cancel</a>
                <div>
                  {this.props.children}
                </div>
              </ModalContent>
            }

          </ReactCSSTransitionGroup>
        </ModalTransition>
    )
  }
}

const ModalContent = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 1em;
  background: hsla(0, 0%, 100%, 0.9);
  box-shadow: 0 0 20px hsla(0, 0%, 50%, 0.5);
  border: solid 1px #ccc;
`

const ModalTransition = styled.div`
  .modal-enter {
    opacity: 0;
    transform: scale(0.95);
    transition: all 125ms ease-out;
  }

  .modal-enter-active {
    opacity: 1;
    transform: scale(1);
  }

  .modal-leave {
    opacity: 1;
    transform: scale(1);
    transition: all 125ms ease-in;
  }

  .modal-leave-active {
    opacity: 0;
    transform: scale(0.95);
  }
`

export default Modal
