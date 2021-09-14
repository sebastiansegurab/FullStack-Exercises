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

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    blog.user = blog.user.id
    const response = await axios.put(baseUrl + '/' + blog.id, blog, config)
    const { data } = response
    return data
  } catch (error) {
    console.error(error)
  }
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.delete(baseUrl + '/' + id, config)
    const { data } = response
    return data
  } catch (error) {
    console.error(error)
  }
}

export default { setToken, getAll, createBlog, updateBlog, removeBlog }