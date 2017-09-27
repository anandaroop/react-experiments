import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'
import data from './luc-paradis.json'
import _ from 'lodash'
import moment from 'moment'

window.moment = moment

const formatTimestamp = t => moment(t).format('M/D h:mm:ss a')

const percentageElapsed = (changes, currentChange) => {
  const earliestTimestamp = moment(_.first(changes).timestamp)
  const latestTimestamp = moment(_.last(changes).timestamp)
  const elapsed = moment(currentChange.timestamp) - earliestTimestamp
  return 100 * elapsed / (latestTimestamp - earliestTimestamp)
}

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

  componentDidMount() {
    window.addEventListener('keyup', e => {
      switch (e.code) {
        case 'ArrowLeft':
          this.previous(e)
          break
        case 'ArrowRight':
          this.next(e)
          break
        default:
      }
    })
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
    const { description, currentIndex, changes } = this.state
    const currentChange = changes[currentIndex]
    const percentage = percentageElapsed(changes, currentChange)
    return (
      <div className="App">
        <Header>
          <Description>{description}</Description>
          <Controls prev={this.previous} next={this.next} />
        </Header>
        <Change {...currentChange} elapsed={percentage} />
      </div>
    )
  }
}

const Change = ({ timestamp, before, after, elapsed }) => {
  const beforeGenes = Object.keys(before.genes)
  const afterGenes = Object.keys(after.genes)
  const all = _.union(beforeGenes, afterGenes).sort()
  const added = _.difference(afterGenes, beforeGenes)
  const dropped = _.difference(beforeGenes, afterGenes)
  return (
    <div>
      <Timestamp elapsed={elapsed}>{formatTimestamp(timestamp)}</Timestamp>
      <Diff>
        <Genome
          title="Before"
          genes={before.genes}
          all={all}
          added={added}
          dropped={dropped}
        />
        <Genome
          title="After"
          genes={after.genes}
          all={all}
          added={added}
          dropped={dropped}
        />
      </Diff>
    </div>
  )
}

const Timestamp = ({ elapsed, children }) => {
  return (
    <TimestampContainer>
      <TimestampBar elapsed={elapsed} />
      <TimestampValue>{children}</TimestampValue>
    </TimestampContainer>
  )
}

const TimestampContainer = styled.div`
  background: #ccc;
  margin: 1em 0;
  position: relative;
  height: 2em;
`

const TimestampValue = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 2em;
  width: 100%;
  line-height: 2em;
  text-align: center;
  color: white;
`

const TimestampBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background: hsla(0, 0%, 0%, 0.1);
  height: 100%;
  height: 2em;
  width: ${props => props.elapsed}%;
`

const Genome = ({ className, title, all, genes, added = [], dropped = [] }) => {
  return (
    <table width="50%" className={className}>
      <thead>
        <tr>
          <th style={{ borderBottom: 'solid 1px #ddd' }} colSpan={2}>
            {title}
          </th>
        </tr>
      </thead>
      <tbody>
        {all.map(name => {
          const isAdded = _.includes(added, name)
          const isDropped = _.includes(dropped, name)
          return _.has(genes, name) ? (
            <Gene
              key={Math.random()}
              name={name}
              value={genes[name]}
              isAdded={isAdded}
              isDropped={isDropped}
            />
          ) : (
            <Blank key={Math.random()} />
          )
        })}
      </tbody>
    </table>
  )
}

const Gene = ({ name, value, isAdded, isDropped }) => (
  <tr>
    <td>
      <GeneValue>{value}</GeneValue>
    </td>
    <td>
      <GeneName isAdded={isAdded} isDropped={isDropped}>
        {name}
      </GeneName>
    </td>
  </tr>
)

const GeneValue = styled.div`
  text-align: right;
  padding-right: 0.25em;
  color: #ddd;
`

const GeneName = styled.span`
  color: gray;
  ${props => props.isAdded && `color: green; background: lightGreen;`};
  ${props => props.isDropped && `color: red; background: pink;`};
`

const Blank = () => (
  <tr>
    <td colSpan={2}>&nbsp;</td>
  </tr>
)

const Controls = ({ prev, next }) => (
  <div>
    <a href="#previous" onClick={prev}>
      &larr; prev
    </a>
    &nbsp; | &nbsp;
    <a href="#next" onClick={next}>
      next &rarr;
    </a>
  </div>
)

const Header = styled.div`text-align: center;`
const Description = styled.div`margin: 1em 0;`

const Diff = styled.div`display: flex;`

export default App
