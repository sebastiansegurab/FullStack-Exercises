import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    async function getAllBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getAllBlogs()
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem !== null || window.localStorage.getItem !== undefined) {
      const user = JSON.parse(localStorage.getItem('user'))
      setUser(user)
    }
  }, [])

  const loginUser = async (username, password) => {
    const user = await loginService.login(username, password)
    if (user) {
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
    } else {
      setNotification({ message: 'User or password incorrect.', status: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const addBlog = async (blog) => {
    blogService.setToken(user.token)
    const blogCreated = await blogService.createBlog(blog)
    if (blogCreated) {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setNotification({ message: `a new blog '${blogCreated.title}' by ${user.name} added.`, status: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } else {
      setNotification({ message: 'The blog could not be created.', status: 'fail' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  return <>
    <Notification notification={notification} />
    {
      user === null || user === undefined ?
        <div>
          <Login loginUser={loginUser} />
        </div>
        :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          <Toggable>
            <CreateBlog addBlog={addBlog} />
          </Toggable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
    }
  </>
}

export default App