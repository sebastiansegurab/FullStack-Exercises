import axios from 'axios'

const url = 'http://localhost:3001/persons'

export const getAllPersons = () => {
    return axios.get(url).then(response => {
        const { data } = response
        return data
    })
}

export const createPerson = (person) => {
    return axios.post(url, person).then(response => {
        const { data } = response
        return data
    })
}

export const deletePerson = (person) => {
    return axios.delete(url + '/' + person.id).then(response => {
        const { status } = response
        return status
    })
}

export const updatePerson = (person, number) => {
    console.log(person)
    console.log(number)
    return axios.put(url + '/' + person.id, { number }).then(response => {
        console.log(response)
        const { data } = response
        return data
    })
}