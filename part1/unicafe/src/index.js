import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = (good) + (neutral * -1)
  const average = ((good) + (neutral * -1)) / all
  const positive = good / all
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      {isFinite(all) ? <p>all {all}</p> : <></>}
      {isFinite(average) ? <p>average {average}</p> : <></>}
      {isFinite(positive) ? <p>positive {positive}</p> : <></>}
    </div>
  )
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
