import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (newName !== undefined || number !== undefined || newName.trim() !== '' || number.trim() !== '') {
      const personExists = persons.find(person => person.name === newName)
      if (personExists === undefined) {
        setPersons(persons.concat({ name: newName, number }))
        setNewName('')
        setNumber('')
      } else {
        alert(`${newName} is already added to phonebook`)
      }
    } else {
      alert('Both data are required')
    }
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNumber(event.target.value)
  }

  const handleFindName = (event) => {
    setFilterPersons(event.target.value)
  }

  const personsToShow = filterPersons === '' && filterPersons === undefined ?
    persons
    :
    persons.filter(person => person.name.toLowerCase().includes(filterPersons.toLowerCase()))
  const listNames = () => personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleFindName} value={filterPersons} />
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleChangeName} value={newName} required />
        </div>
        <div>
          number: <input onChange={handleChangeNumber} value={number} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>{listNames()}</>
    </div>
  )
}

export default App