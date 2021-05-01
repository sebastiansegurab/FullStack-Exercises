import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ text, value }) => {
  if (isFinite(value)) {
    return (<p>{text} {value}</p>)
  } else {
    return (<></>)
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => { setGood(good + 1) }} text="good" />
      <Button handleClick={() => { setNeutral(neutral + 1) }} text="neutral" />
      <Button handleClick={() => { setBad(bad + 1) }} text="bad" />
      <h1>statistics</h1>
      {good !== 0 || neutral !== 0 || bad !== 0 ?
        <div>
          <Statistics text="good" value={good} />
          <Statistics text="neutral" value={neutral} />
          <Statistics text="bad" value={bad} />
          <Statistics text="all" value={((good) + (bad * -1)) / (good + neutral)} />
          <Statistics text="average" value={((good) + (bad * -1)) / (good + neutral)} />
          <Statistics text="positive" value={((good) + (bad * -1)) / (good + neutral)} />
        </div>
        :
        <p>No feedback given</p>
      }
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
