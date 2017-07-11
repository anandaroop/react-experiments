import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import './global.css'
import './volt.css'

import UncontrolledForm from '../components/UncontrolledForm'

storiesOf('UncontrolledForm', module).add('', () =>
  <div>
    <p>An uncontrolled, dumb little form component</p>

    <UncontrolledForm
      onSubmit={values => {
        window._output.innerHTML = JSON.stringify(values)
      }}
    />

    <p ref={el => (window._output = el)}>
      <span style={{ color: '#ccc' }}>Submit form to see values here</span>
    </p>
  </div>
)
