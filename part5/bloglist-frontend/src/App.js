import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem !== null || window.localStorage.getItem !== undefined) {
      const user = JSON.parse(localStorage.getItem('user'))
      setUser(user)
    }
  }, [])

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = await loginService.login(username, password)
    if (user) {
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } else {
      setNotification('User or password incorrect.')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  return <>
    {
      user === null || user === undefined ?
        <div>
          <Notification notification={notification} />
          <Login username={username} password={password} handleUsername={handleUsername} handlePassword={handlePassword} handleSubmit={handleSubmit} />
        </div>
        :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
    }
  </>
}

export default App