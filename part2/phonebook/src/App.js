import React, { useState, useEffect } from 'react'
import requestService from './services/requests'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification , setNotification ] = useState([])

  useEffect(() => {
    requestService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNameInputChange = (event) => setNewName(event.target.value)

  const handleNumberInputChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const notify = (message, success) => {
    setNotification([message, success])
    setTimeout(() => setNotification([]), 5000)
  }

  const addEntry = (event) => {
    event.preventDefault()
    const index = persons.map(person => person.name).indexOf(newName)
    if (index !== -1 && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const personToModify = persons[index]
      requestService
      .update(personToModify.id, {...personToModify, number:newNumber})
      .then(returnedPerson => setPersons(persons.map(p => p.id === personToModify.id ? returnedPerson : p)))
      .catch(error => {
        console.log('err', error)
        notify(error.response.data.error, false)
        setPersons(persons.filter(p => p.id !== personToModify.id))
      })
    } else {
      requestService
      .create({name: newName, number: newNumber})
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        notify(`Added ${returnedPerson.name}`, true)
      }).catch(error => {
        notify(error.response.data.error, false)
      })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      requestService
      .del(person.id)
      .then(setPersons(persons.filter(p => p.id !== person.id)))
    }
  }

  const filterPersons = () => newFilter === ""
    ? persons
    : [...persons].filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm handleNameInputChange={handleNameInputChange} 
                  handleNumberInputChange={handleNumberInputChange}
                  addEntry={addEntry} />
      <h2>Numbers</h2>
      <Persons list={filterPersons()} deletePerson={deletePerson} />
    </div>
  )
}

export default App