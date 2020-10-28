import React from 'react';

const Person = ({person, handleDelete}) => {

    return (
        <div>
            <span>{person.name}</span>
            <span>{person.number}</span>
            <button onClick={() => handleDelete(person)}>delete</button>
        </div>
    )
}

export default Person