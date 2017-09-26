import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'
import data from './luc-paradis.json'
import _ from 'lodash'

class App extends Component {
  constructor(props) {
    super(props)
    const { description, changes } = data
    const sortedChanges = _.sortBy(changes, c => c.timestamp)
    this.state = {
      description,
      changes: sortedChanges,
      currentIndex: 0
    }
    this.previous = this.previous.bind(this)
    this.next = this.next.bind(this)
  }

  previous(e) {
    e.preventDefault()
    this.setState({
      currentIndex: Math.max(this.state.currentIndex - 1, 0)
    })
  }

  next(e) {
    e.preventDefault()
    this.setState({
      currentIndex: Math.min(
        this.state.currentIndex + 1,
        this.state.changes.length - 1
      )
    })
  }

  render() {
    const { description, currentIndex } = this.state
    const currentChange = this.state.changes[currentIndex]
    return (
      <div className="App">
        <p>{description}</p>
        <div>
          <a href="#" onClick={this.previous}>
            prev
          </a>
          |
          <a href="#" onClick={this.next}>
            next
          </a>
        </div>

        <Change {...currentChange} />
      </div>
    )
  }
}

const Change = ({ timestamp, before, after }) => {
  const allGeneNames = Object.keys(
    Object.assign({}, before.genes, after.genes)
  ).sort()
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
    <table width="50%" className={className}>
      {allGeneNames.map(name => {
        return _.has(genes, name) ? (
          <Gene key={Math.random()} name={name} value={genes[name]} />
        ) : (
          <Blank />
        )
      })}
    </table>
  )
}

const Gene = ({ name, value }) => (
  <tr>
    <td style={{ textAlign: 'right', paddingRight: '0.25em' }}>{value}</td>
    <td>{name}</td>
  </tr>
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
