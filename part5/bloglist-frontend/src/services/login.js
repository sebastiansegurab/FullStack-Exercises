import axios from 'axios'
const baseUrl = 'api/login'

const login = async (username, password) => {
    try{
    const response = await axios.post(baseUrl, { username, password })
    const { data } = response
    return data
    } catch(error){
        console.error(error)
    }
}

export default { login }