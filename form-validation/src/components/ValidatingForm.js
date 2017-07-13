import React from 'react'
import { Formik } from 'formik'
import Yup from 'yup'

const withFormik = Formik({
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    twitter: Yup.string(),
    facebook: Yup.string()
  }),

  mapPropsToValues: props => ({
    email: props.user.email,
    twitter: props.user.social.twitter,
    facebook: props.user.social.facebook
  }),

  mapValuesToPayload: values => ({
    user: {
      email: values.email,
      social: {
        twitter: values.twitter,
        facebook: values.facebook
      }
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
  handleReset,
  isSubmitting
}) =>
  <form onSubmit={handleSubmit}>
    <fieldset>
      <input
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email &&
        touched.email &&
        <div>
          {errors.email}
        </div>}
    </fieldset>
    <fieldset>
      <input
        type="text"
        name="facebook"
        value={values.facebook}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.facebook &&
        touched.facebook &&
        <div>
          {errors.facebook}
        </div>}
    </fieldset>
    <fieldset>
      <input
        type="text"
        name="twitter"
        value={values.twitter}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.twitter &&
        touched.twitter &&
        <div>
          {errors.twitter}
        </div>}
    </fieldset>
    {error &&
      error.message &&
      <div style={{ color: 'red' }}>
        Top Level Error: {error.message}
      </div>}
    <button onClick={handleReset}>Reset</button>
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </form>

export default withFormik(MyForm)
