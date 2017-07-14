import React from 'react'
import { Formik } from 'formik'
import Yup from 'yup'
import styled from 'styled-components'
import mediumTypes, { allowsManufacturer, allowsPublisher, allowsUnique } from './mediumTypes'

const withFormik = Formik({
  validationSchema: Yup.object().shape({
    title: Yup.string().required(),
    medium: Yup.string().required(),
    manufacturer: Yup.string(),
    publisher: Yup.string(),
    unique: Yup.boolean()
  }),

  mapPropsToValues: props => ({
    title: props.artwork.title,
    medium: props.artwork.medium,
    manufacturer: props.artwork.manufacturer,
    publisher: props.artwork.publisher,
    unique: props.artwork.unique
  }),

  mapValuesToPayload: values => ({
    artwork: {
      title: values.title,
      medium: values.medium,
      manufacturer: allowsManufacturer(values.medium) ? values.manufacturer : null,
      publisher: allowsPublisher(values.medium) ? values.publisher : null,
      unique: allowsUnique(values.medium) ? values.unique : null
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

    {allowsManufacturer(values.medium) &&
      <fieldset>
        <label htmlFor="manufacturer">Manufacturer</label>
        <input
          id="manufacturer"
          type="text"
          name="manufacturer"
          value={values.manufacturer}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.manufacturer &&
          touched.manufacturer &&
          <Error>
            {errors.manufacturer}
          </Error>}
      </fieldset>}

    {allowsPublisher(values.medium) &&
      <fieldset>
        <label htmlFor="publisher">Publisher</label>
        <input
          id="publisher"
          type="text"
          name="publisher"
          value={values.publisher}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.publisher &&
          touched.publisher &&
          <Error>
            {errors.publisher}
          </Error>}
      </fieldset>}

    {allowsUnique(values.medium) &&
      <fieldset>
        <label htmlFor="unique">Unique</label>
        <input
          id="unique"
          type="checkbox"
          name="unique"
          checked={values.unique}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.unique &&
          touched.unique &&
          <Error>
            {errors.unique}
          </Error>}
      </fieldset>}

    <input type="submit" disabled={isSubmitting} />
  </form>

export default withFormik(MyForm)

const Error = styled.div`
  color: red;
  font-size: small;
`
