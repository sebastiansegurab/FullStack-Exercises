import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    const { data } = response
    return data
  } catch (error) {
    console.error(error)
  }
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.post(baseUrl, blog, config)
    const { data } = response
    return data
  } catch (error) {
    console.error(error)
  }
}

export default { getAll, createBlog, setToken }