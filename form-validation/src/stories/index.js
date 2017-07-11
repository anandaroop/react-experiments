import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import Hello from '../components/Hello'
import UncontrolledForm from '../components/UncontrolledForm'

storiesOf('Hello', module).add('default', () => <Hello />)

storiesOf('UncontrolledForm', module).add('default', () =>
  <UncontrolledForm
    onSubmit={e => {
      alert('submitted!')
      return false
    }}
  />
)
