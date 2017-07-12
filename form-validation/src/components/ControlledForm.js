import React, { Component } from 'react'

const setStateFor = (component, key) => e => component.setState({ [key]: e.target.value })

class ControlledForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      medium: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const payload = {
      artwork: this.state
    }
    this.props.onSubmit(payload)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={this.state.title}
            onChange={setStateFor(this, 'title')}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="medium">Medium</label>
          <input
            id="medium"
            type="text"
            name="medium"
            value={this.state.medium}
            onChange={setStateFor(this, 'medium')}
          />
        </fieldset>

        <input type="submit" />
      </form>
    )
  }
}

export default ControlledForm
