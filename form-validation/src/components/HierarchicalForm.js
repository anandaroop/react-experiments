import React from 'react'
import { withFormik } from 'formik'
import Yup from 'yup'
import styled from 'styled-components'
import _ from 'lodash'
import mediumTypes, {
  allowsManufacturer,
  allowsPublisher,
  allowsUnique,
  allowsCategories
} from './mediumTypes'

const createBlankGenome = geneMap => {
  const allGeneNames = _.flatten(_.values(geneMap)).map(g => g.name)
  const zeroes = _.fill(Array(allGeneNames.length), 0)
  return _.zipObject(allGeneNames, zeroes)
}

const createInitialGenome = (geneMap, genes) => {
  const blanks = createBlankGenome(geneMap)
  return { ...blanks, ...genes }
}

const mapValuesToPayload = (values, blankGenome) => {
  return {
    artwork: {
      title: values.title,
      medium: values.medium,
      manufacturer: allowsManufacturer(values.medium)
        ? values.manufacturer
        : null,
      publisher: allowsPublisher(values.medium) ? values.publisher : null,
      unique: allowsUnique(values.medium) ? values.unique : null
    },
    partner_genes: allowsCategories(values.medium) ? values.genes : blankGenome
  }
}

const enhance = withFormik({
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
    unique: props.artwork.unique,
    genes: createInitialGenome(props.geneMap, props.genes)
  }),

  handleSubmit: (values, { props, ...bag }) => {
    const blankGenome = createBlankGenome(props.geneMap)
    props.onSubmit(mapValuesToPayload(values, blankGenome))
  }
})

const MyForm = ({
  geneMap,
  values,
  touched,
  errors,
  error,
  handleChange,
  handleSubmit,
  handleBlur,
  setFieldValue,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    {error &&
      error.message && (
        <div style={{ color: 'red' }}>Top Level Error: {error.message}</div>
      )}

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
      {errors.title && touched.title && <Error>{errors.title}</Error>}
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
        {mediumTypes.map(t => <option key={t}>{t}</option>)}
      </select>
      {errors.medium && touched.medium && <Error>{errors.medium}</Error>}
    </fieldset>

    {allowsManufacturer(values.medium) && (
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
          touched.manufacturer && <Error>{errors.manufacturer}</Error>}
      </fieldset>
    )}

    {allowsPublisher(values.medium) && (
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
          touched.publisher && <Error>{errors.publisher}</Error>}
      </fieldset>
    )}

    {allowsUnique(values.medium) && (
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
        {errors.unique && touched.unique && <Error>{errors.unique}</Error>}
      </fieldset>
    )}

    {allowsCategories(values.medium) && (
      <Categories
        genes={values.genes}
        geneMap={geneMap}
        setFieldValue={setFieldValue}
      />
    )}

    <input type="submit" disabled={isSubmitting} />
  </form>
)

export default enhance(MyForm)

const Error = styled.div`
  color: red;
  font-size: small;
`

const has = (genes, geneName) =>
  genes[geneName] !== undefined && genes[geneName] > 0

const Categories = ({ genes, geneMap, setFieldValue }) => {
  const allGenes = _.flatten(_.values(geneMap))
  return (
    <fieldset>
      <label htmlFor="pac">Categories</label>
      <div id="pac" className="inputs">
        {allGenes.map(g => (
          <fieldset key={g.id}>
            <input
              type="checkbox"
              name={g.name}
              id={g.id}
              checked={has(genes, g.name)}
              onChange={e => {
                const { name, checked } = e.target
                const updatedGenes = Object.assign({}, genes, {
                  [name]: checked ? 100 : 0
                })
                setFieldValue('genes', updatedGenes)
              }}
            />
            <label htmlFor={g.id}>{g.name}</label>
          </fieldset>
        ))}
      </div>
    </fieldset>
  )
}
