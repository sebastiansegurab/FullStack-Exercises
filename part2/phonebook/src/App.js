import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App