import React from 'react'

const PersonForm = ({newName, newNumber, handleNameInput,handleNumberInput, addPerson}) => {

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameInput} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberInput} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    )
}

export default PersonForm