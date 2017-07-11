import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import UncontrolledForm from '../components/UncontrolledForm'

storiesOf('UncontrolledForm', module).add('default', () =>
  <UncontrolledForm
    onSubmit={e => {
      alert('submitted!')
      return false
    }}
  />
)
