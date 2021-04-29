import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Part = (props) => {
  console.log(props.name)
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Total = (props) => {
  let totalExercises = 0
  props.parts.map((part) => {
    totalExercises += part.exercises
  })
  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
