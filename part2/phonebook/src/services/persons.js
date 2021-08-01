import axios from 'axios'

const url = '/api/persons'

export const getAllPersons = () => {
    return axios.get(url).then(response => {
        const { data } = response
        return data
    }).catch(error => console.error(error))
}

export const createPerson = (person) => {
    return axios.post(url, person).then(response => {
        const { data } = response
        return data
    }).catch(error => console.error(error))
}

export const deletePerson = (person) => {
    return axios.delete(url + '/' + person.id).then(response => {
        const { status } = response
        return status
    }).catch(error => console.error(error))
}

export const updatePerson = (person, personUpdate) => {
    return axios.put(url + '/' + person.id, personUpdate).then(response => {
        const { data } = response
        return data
    }).catch(error => console.error(error))
}