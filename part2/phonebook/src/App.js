import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')
  
  const getPersonsData = () => {
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
        }
      )
  }

  useEffect(getPersonsData, [])

  const addToServer = (newPerson) => {
    personService
      .create(newPerson)
      .then(personsData => {
        setPersons(persons.concat(personsData))
      })
      .then(() => {
        setMessageType('success')
        setMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch( error => {
        console.log(error)
        setMessageType('error')
        setMessage(`Oh no! Could not add ${newPerson.name} to phonebook`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

  }

  const updateServer = (name, newNumber) => {
    const personToUpdate =  persons.find(person => person.name === name)
    const updatedPerson = {...personToUpdate, number: newNumber}
    personService
      .update(updatedPerson)
      .then(returnedPersonsData => {
        setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPersonsData))})
      .then(() => {
        setMessageType('success')
        setMessage(`Updated ${updatedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch( error => {
        console.log(error)
        setMessageType('error')
        setMessage(`Information of ${personToUpdate.name} has already been removed from server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== personToUpdate.id ))
      })

  }


  const addPerson = (event) => {
    event.preventDefault();

    const duplicateName = persons.find(person => person.name === newName)
    const newPerson = { 
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }


    if (duplicateName && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      updateServer(newName,newNumber)
    } else {
      addToServer(newPerson)
    }    
  
    setNewName('')
    setNewNumber('')
  }

  const deleteFromServer = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
    personService
      .deletePerson(person.id)
      .then(() => { 
        setPersons(persons.filter(p => p.id !== person.id));
      })
      .then(() => {
        setMessageType('success')
        setMessage(`Deleted ${person.name} from phonebook`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessageType('error')
        setMessage(`Oh no! Something went wrong when trying to delete ${person.name} in the phonebook to delete `)
        setTimeout(() => {
          setMessage(null)
        }, 5000)        
      })
    }
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
}

  const handleDelete = (person) => {
    deleteFromServer(person);
  }

  const personsToShow = newSearch !== '' ? persons.filter((person) => person.name.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase())) : persons;
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType}/>
        <Filter newSearch={newSearch} handleSearch={handleSearch}/>
      <h3>Add a new</h3>
        <PersonForm 
          newName={newName} 
          newNumber={newNumber} 
          handleNameInput={handleNameInput} 
          handleNumberInput={handleNumberInput} 
          addPerson={addPerson} 
        />
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
      </div>
  )
}

export default App