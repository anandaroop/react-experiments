import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import './global.css'
import './volt.css'

import UncontrolledForm from '../components/UncontrolledForm'

storiesOf('UncontrolledForm', module).add('', () =>
  <div>
    <p>An uncontrolled, dumb little form component</p>

    <UncontrolledForm
      onSubmit={e => {
        e.preventDefault()
        window._output.innerText = 'Form was submitted.'
      }}
    />

    <p ref={el => (window._output = el)} />
  </div>
)
