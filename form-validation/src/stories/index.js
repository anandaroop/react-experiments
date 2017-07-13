import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import './global.css'
import './volt.css'

import UncontrolledForm from '../components/UncontrolledForm'
import ControlledForm from '../components/ControlledForm'
import ValidatingForm from '../components/ValidatingForm'

// helpers to display the results of form submission
const showFeedback = message => (window._FormSubmissionFeedback.innerHTML = message)
const FormSubmissionFeedback = () =>
  <p ref={el => (window._FormSubmissionFeedback = el)}>
    <span style={{ color: '#ccc' }}>Submit form to see values here</span>
  </p>

// the stories
storiesOf('ValidatingForm', module)
  .addDecorator(story =>
    <div>
      <p>A form validated with Formik</p>
      <p>
        In this silly example, a <b>title</b> is required and a <b>medium</b> must have between 5-10
        characters
      </p>

      {story()}

      <FormSubmissionFeedback />
    </div>
  )
  .add('with valid values', () =>
    <ValidatingForm
      onSubmit={payload => {
        showFeedback(JSON.stringify(payload))
      }}
      artwork={{
        id: '123',
        title: 'Such painting',
        medium: 'Very brush'
      }}
    />
  )
  .add('with invalid values', () =>
    <ValidatingForm
      onSubmit={payload => {
        showFeedback(JSON.stringify(payload))
      }}
      artwork={{
        id: '123',
        title: '',
        medium: 'Very watercolor'
      }}
    />
  )

storiesOf('ControlledForm', module).add('default', () =>
  <div>
    <p>A controlled form</p>

    <ControlledForm
      onSubmit={values => {
        showFeedback(JSON.stringify(values))
      }}
    />

    <FormSubmissionFeedback />
  </div>
)

storiesOf('UncontrolledForm', module).add('default', () =>
  <div>
    <p>An uncontrolled, dumb little form component</p>

    <UncontrolledForm
      onSubmit={values => {
        showFeedback(JSON.stringify(values))
      }}
    />

    <FormSubmissionFeedback />
  </div>
)
