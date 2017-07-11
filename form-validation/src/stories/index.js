import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import UncontrolledForm from '../components/UncontrolledForm'

storiesOf('UncontrolledForm', module).add(null, () =>
  <div>
    <p>An uncontrolled, unstyled, dumb little form component</p>
    <UncontrolledForm
      onSubmit={e => {
        alert('submitted!')
        return false
      }}
    />
  </div>
)
