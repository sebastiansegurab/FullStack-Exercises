import React, { useState, useEffect } from 'react'

import { createPerson, getAllPersons, deletePerson, updatePerson } from './services/persons'

import './app.css'

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

const Persons = ({ persons, personsToFind, updatePersons, notificationStateFromChild }) => {
  const handleDelete = (e, personToEliminated) => {
    if (window.confirm('Delete ' + personToEliminated.name + '?')) {
      deletePerson(personToEliminated)
        .then(status => {
          notificationStateFromChild({ status, message: personToEliminated.name + ' eliminated.' })
          e.target.parentNode.parentNode.removeChild(e.target.parentNode);
          let arrayPersons = persons.filter(person => person.id !== personToEliminated.id)
          updatePersons(arrayPersons)
        }).catch(error => {
          notificationStateFromChild({ status: error.status, message: `Information of ${personToEliminated.name} has already been removed from server.` })
          setTimeout(() => {
            notificationStateFromChild(null)
          }, 5000)
          let arrayPersons = persons.filter(person => person.id !== personToEliminated.id)
          updatePersons(arrayPersons)
        })
    }
  }

  if (personsToFind !== '' && personsToFind !== undefined) {
    return (
      <>{persons.map(function (person) {
        if (person.name.includes(personsToFind)) {
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

const Notification = ({ notification }) => {
  const stylesNoti = {
    marginBottom: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: '#bfbfbf',
    padding: '1rem'
  }
  if (notification === null) {
    return null;
  } else {
    if (notification.status === 200) {
      stylesNoti.color = 'green'
      stylesNoti.border = '.3rem solid green'
    } else {
      stylesNoti.color = 'red'
      stylesNoti.border = '.3rem solid red'
    }
    return <div style={stylesNoti}>{notification.message}</div>
  }
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [personsToFind, setPersonsToFind] = useState('')
  const [notification, setNotification] = useState(null)

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
            setNotification({ status: 200, operation: 'CREATE', message: `Added ${personAdd.name}.` })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            getAllPersons().then(response => {
              setPersons(response)
            })
          })
          .catch(error => {
            setNotification({ status: error.status, operation: 'CREATE', message: error.message })
          })
        setNewName('')
        setNumber('')
      } else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          updatePerson(personExists, { name: newName, number }).then(personUpdated => {
            setNotification({ status: 200, message: `${personUpdated.name}'s number was successfully updated.` })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            getAllPersons().then(response => {
              setPersons(response)
            })
            setNewName('')
            setNumber('')
          }).catch(error => {
            setNotification({ status: error.status, message: `Information of ${personExists.name} has already been removed from server.` })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
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

  const updatePersons = personsArray => {
    setPersons(personsArray)
  }

  const notificationStateFromChild = notificationState => {
    setNotification(notificationState)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter personsToFind={personsToFind} handleFindName={handleFindName} />
      <h2>add a new</h2>
      <PersonForm addName={addName} handleChangeName={handleChangeName} newName={newName}
        handleChangeNumber={handleChangeNumber} number={number} />
      <h2>Numbers</h2>
      <Persons persons={persons} personsToFind={personsToFind} updatePersons={updatePersons} notificationStateFromChild={notificationStateFromChild} />
    </div>
  )
}

export default App