import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'
import data from './luc-paradis.json'
import _ from 'lodash'

class App extends Component {
  constructor(props) {
    super(props)
    const { description, changes } = data
    this.state = {
      description,
      changes,
      currentIndex: 0
    }
  }

  render() {
    const { description, currentIndex } = this.state
    const currentChange = this.state.changes[currentIndex]
    return (
      <div className="App">
        <p>{description}</p>
        <Change {...currentChange} />
      </div>
    )
  }
}

const Change = ({ timestamp, before, after }) => {
  const allGeneNames = Object.keys(Object.assign({}, before.genes, after.genes)).sort()
  return (
    <div>
      <Timestamp>{timestamp}</Timestamp>
      <Diff>
        <Genome allGeneNames={allGeneNames} genes={before.genes} />
        <Genome allGeneNames={allGeneNames} genes={after.genes} />
      </Diff>
    </div>
  )
}

const Genome = ({ className, allGeneNames, genes }) => {
  console.log(allGeneNames, _.keys(genes))
  return (
    <div className={className}>
      {allGeneNames.map(name => {
        return _.has(genes, name) ? (
          <Gene key={Math.random()} name={name} value={genes[name]} />
        ) : (
          <Blank />
        )
      })}
    </div>
  )
}

const Gene = ({ name, value }) => (
  <div>
    {name}
    {value}
  </div>
)

const Blank = styled.div`
min-height: 1em;
background: #eee;
`

const Timestamp = styled.div`
  font-size: smaller;
  padding: 0.5em;
  background: #ccc;
  color: white;
  text-align: center;
  margin: 0 0 1em 0;
`

const Diff = styled.div`display: flex;`

const Before = styled(Genome)`color: #900;`
const After = styled(Genome)`color: #090;`

export default App
