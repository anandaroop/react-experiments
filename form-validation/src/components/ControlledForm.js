import React, { Component } from 'react'

class ControlledForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: null,
      medium: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
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
            onChange={e => this.setState({ title: e.target.value })}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="medium">Medium</label>
          <input
            id="medium"
            type="text"
            name="medium"
            value={this.state.medium}
            onChange={e => this.setState({ medium: e.target.value })}
          />
        </fieldset>

        <input type="submit" />
      </form>
    )
  }
}

export default ControlledForm
