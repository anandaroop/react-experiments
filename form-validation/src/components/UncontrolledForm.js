import React from 'react'

class UncontrolledForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const formValues = {
      title: this._title.value,
      medium: this._medium.value
    }
    this.props.onSubmit(formValues)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="title">Title</label>
          <input id="title" ref={el => (this._title = el)} type="text" name="title" />
        </fieldset>

        <fieldset>
          <label htmlFor="medium">Medium</label>
          <input id="medium" ref={el => (this._medium = el)} type="text" name="medium" />
        </fieldset>

        <input type="submit" />
      </form>
    )
  }
}

export default UncontrolledForm
