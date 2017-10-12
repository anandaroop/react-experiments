import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import _ from 'lodash'
import './global.css'
import './volt.css'

import UncontrolledForm from '../components/UncontrolledForm'
import ControlledForm from '../components/ControlledForm'
import ValidatingForm from '../components/ValidatingForm'
import ConditionalForm from '../components/ConditionalForm'
import HierarchicalForm from '../components/HierarchicalForm'

// helpers to display the results of form submission
const showFeedback = message =>
  (window._FormSubmissionFeedback.innerHTML = message)

const FormSubmissionFeedback = () => (
  <p ref={el => (window._FormSubmissionFeedback = el)}>
    <span style={{ color: '#ccc' }}>Submit form to see values here</span>
  </p>
)

// the PAC gene map

const geneMap = {
  Mediums: [
    { name: 'Wood', id: 'wood' },
    { name: 'Metal', id: 'metal' },
    { name: 'Glass', id: 'glass' }
  ],
  Styles: [
    { name: 'Kawaii', id: 'kawaii' },
    { name: 'Abstract', id: 'abstract' },
    { name: 'Swirly', id: 'swirly' }
  ]
}

// the stories

storiesOf('HierarchicalForm', module)
  .addDecorator(story => (
    <div>
      <p>A form that isn't just a flat list of keys</p>

      {story()}

      <FormSubmissionFeedback />
    </div>
  ))
  .add('with valid values', () => (
    <HierarchicalForm
      onSubmit={payload => {
        console.log('onSubmit payload', payload)
        showFeedback(JSON.stringify(payload))
      }}
      artwork={{
        id: '123',
        title: 'Such painting',
        medium: 'Painting',
        manufacturer: 'Acme Corp',
        publisher: '',
        unique: true
      }}
      geneMap={geneMap}
      genes={{
        Kawaii: 100
      }}
    />
  ))

storiesOf('ConditionalForm', module)
  .addDecorator(story => (
    <div>
      <p>A form that shapeshifts depending on its various inputs' state</p>

      {story()}

      <FormSubmissionFeedback />
    </div>
  ))
  .add('with valid values', () => (
    <ConditionalForm
      onSubmit={payload => {
        console.log(payload)
        showFeedback(JSON.stringify(payload))
      }}
      artwork={{
        id: '123',
        title: 'Such sculpture',
        medium: 'Sculpture',
        manufacturer: 'Acme Corp',
        publisher: '',
        unique: true
      }}
    />
  ))
  .add('with blank values', () => (
    <ConditionalForm
      onSubmit={payload => {
        console.log(payload)
        showFeedback(JSON.stringify(payload))
      }}
      artwork={{
        id: '123',
        title: '',
        medium: '',
        manufacturer: '',
        publisher: '',
        unique: false
      }}
    />
  ))
  .add('with strippable values', () => (
    <div>
      <p>
        Choose e.g. <b>Architecture</b> before submitting to see disallowed
        values stripped from the form submission
      </p>

      <ConditionalForm
        onSubmit={payload => {
          console.log(payload)
          showFeedback(JSON.stringify(payload))
        }}
        artwork={{
          id: '123',
          title: 'Such sculpture',
          medium: 'Sculpture',
          manufacturer: 'Not valid with every medium',
          publisher: 'Not valid with every medium',
          unique: true
        }}
      />
    </div>
  ))
storiesOf('ValidatingForm', module)
  .addDecorator(story => (
    <div>
      <p>A form validated with Formik</p>
      <p>
        In this silly example, a <b>title</b> is required and a <b>medium</b>{' '}
        must have between 5-10 characters
      </p>

      {story()}

      <FormSubmissionFeedback />
    </div>
  ))
  .add('with valid values', () => (
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
  ))
  .add('with invalid values', () => (
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
  ))

storiesOf('ControlledForm', module).add('Default', () => (
  <div>
    <p>A controlled form</p>

    <ControlledForm
      onSubmit={values => {
        showFeedback(JSON.stringify(values))
      }}
    />

    <FormSubmissionFeedback />
  </div>
))

storiesOf('UncontrolledForm', module).add('Default', () => (
  <div>
    <p>An uncontrolled, dumb little form component</p>

    <UncontrolledForm
      onSubmit={values => {
        showFeedback(JSON.stringify(values))
      }}
    />

    <FormSubmissionFeedback />
  </div>
))
