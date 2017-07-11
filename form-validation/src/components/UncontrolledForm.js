import React from 'react'

const UncontrolledForm = ({ onSubmit }) =>
  <form onSubmit={onSubmit}>
    <fieldset>
      <label htmlFor="title">Title</label>
      <input id="title" type="text" name="title" />
    </fieldset>
  
    <fieldset>
      <label htmlFor="medium">Medium</label>
      <input id="medium" type="text" name="medium" />
    </fieldset>

    <input type="submit" />
  </form>

export default UncontrolledForm
