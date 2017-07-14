import React from 'react'
import { Formik } from 'formik'
import Yup from 'yup'
import styled from 'styled-components'
import mediumTypes from './mediumTypes'

const withFormik = Formik({
  validationSchema: Yup.object().shape({
    title: Yup.string().required(),
    medium: Yup.string().required()
  }),

  mapPropsToValues: props => ({
    title: props.artwork.title,
    medium: props.artwork.medium
  }),

  mapValuesToPayload: values => ({
    artwork: {
      title: values.title,
      medium: values.medium
    }
  }),

  handleSubmit: (payload, { props, setError, setSubmitting }) => {
    props.onSubmit(payload)
  }
})

const MyForm = ({
  values,
  touched,
  errors,
  error,
  handleChange,
  handleSubmit,
  handleBlur,
  isSubmitting
}) =>
  <form onSubmit={handleSubmit}>
    {error &&
      error.message &&
      <div style={{ color: 'red' }}>
        Top Level Error: {error.message}
      </div>}

    <fieldset>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        name="title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.title &&
        touched.title &&
        <Error>
          {errors.title}
        </Error>}
    </fieldset>

    <fieldset>
      <label htmlFor="medium">Medium</label>
      <select
        name="medium"
        id="medium"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.medium}
      >
        <option value="" />
        {mediumTypes.map(t =>
          <option key={t}>
            {t}
          </option>
        )}
      </select>
      {errors.medium &&
        touched.medium &&
        <Error>
          {errors.medium}
        </Error>}
    </fieldset>

    <input type="submit" disabled={isSubmitting} />
  </form>

export default withFormik(MyForm)

const Error = styled.div`
  color: red;
  font-size: small;
`
