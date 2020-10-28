import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => { 
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request =  axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (personID) => {
    const request = axios.delete(`${baseUrl}/${personID}`)
    return request.then(response => {console.log(response); return response})    
}

const update = (personToUpdate) => {
    const request = axios.put(`${baseUrl}/${personToUpdate.id}`, personToUpdate)
    return request.then(response => response.data)
}

const personService = { getAll, create, deletePerson, update }

export default personService