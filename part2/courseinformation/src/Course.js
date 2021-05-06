const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({ parts }) => {
    const total = parts.map(part => part.exercises).reduce((prevValue, currentValue) => {
        return prevValue + currentValue
    }, 0)
    return (
        <strong>total of {total} exercises</strong>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            {course.parts.map(part => <Part key={part.id} part={part} />)}
            <Total parts={course.parts} />
        </div>
    )
}

export default Course