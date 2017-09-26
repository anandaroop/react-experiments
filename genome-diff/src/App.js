import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'
import data from './luc-paradis.json'

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
        <p>Genome updates</p>
        <p>{description}</p>
        <Change {...currentChange} />
      </div>
    )
  }
}

const Change = ({ timestamp, before, after }) => {
  return (
    <div>
      <Timestamp>{timestamp}</Timestamp>
      <Diff>
        <Before>{JSON.stringify(before.genes)}</Before>
        <After>{JSON.stringify(after.genes)}</After>
      </Diff>
    </div>
  )
}

const Timestamp = styled.div``

const Diff = styled.div`display: flex;`

const Genome = styled.div``

const Before = Genome.extend`color: #900;`
const After = Genome.extend`color: #090;`

export default App
