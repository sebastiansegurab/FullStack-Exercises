import React, { useState } from 'react'

const Login = ({ loginUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        loginUser(username, password)
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username: <input type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} required />
                </div>
                <div>
                    password: <input type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} required />
                </div>
                <div>
                    <button>log in</button>
                </div>
            </form >
        </div >
    )
}

export default Login