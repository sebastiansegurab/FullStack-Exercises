import React, { useState, useEffect } from 'react'

import { createPerson, getAllPersons, deletePerson, updatePerson } from './services/persons'

const Filter = ({ handleFindName, personsToFind }) => {
  return (
    <>filter shown with <input onChange={handleFindName} value={personsToFind} /></>
  )
}

const PersonForm = ({ addName, handleChangeName, newName, handleChangeNumber, number }) => {
  return (
    <>
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
    </>
  )
}

const Persons = ({ persons, personsToFind }) => {
  const handleDelete = (e, personToEliminated) => {
    if (window.confirm('Delete ' + personToEliminated.name + '?')) {
      deletePerson(personToEliminated)
        .then(status => {
          if (status === 200) {
            alert(personToEliminated.name + ' eliminated')
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
          } else {
            alert(personToEliminated.name + " couldn't be deleted")
          }
        })
    }
  }

  if (personsToFind !== '' && personsToFind !== undefined) {
    return (
      <>{persons.map(function(person) {
        if(person.name.includes(personsToFind)){
          return (<div key={person.name}><p>{person.name} {person.number} <button onClick={(e) => handleDelete(e, person)}>delete</button></p></div>)
        }
      }
      )}</>
    )
  } else {
    return (
      <>{persons.map((person) => {
        return (<div key={person.name}><p>{person.name} {person.number} <button onClick={(e) => handleDelete(e, person)}>delete</button></p></div>)
      })}</>
    )
  }
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [personsToFind, setPersonsToFind] = useState('')

  useEffect(() => {
    getAllPersons()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (newName !== undefined || number !== undefined || newName.trim() !== '' || number.trim() !== '') {
      const personExists = persons.find(person => person.name === newName)
      if (personExists === undefined) {
        const personToAdd = {
          name: newName,
          number
        }
        createPerson(personToAdd)
          .then(personAdd => {
            alert(`${personAdd.name} was successfully added.`)
            setPersons(prevPersons => prevPersons.concat(personAdd))
          })
          .catch(error => {
            alert(error)
          })
        setNewName('')
        setNumber('')
      } else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          updatePerson(personExists, { name: newName, number }).then(personUpdated => {
            alert(`${personUpdated.name}'s number was successfully updated.`)
            getAllPersons().then(response => {
              setPersons(response)
            })
          })
        }
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
    setPersonsToFind(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter personsToFind={personsToFind} handleFindName={handleFindName} />
      <h2>add a new</h2>
      <PersonForm addName={addName} handleChangeName={handleChangeName} newName={newName}
        handleChangeNumber={handleChangeNumber} number={number} />
      <h2>Numbers</h2>
      <Persons persons={persons} personsToFind={personsToFind} />
    </div>
  )
}

export default App