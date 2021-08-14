import React from 'react'

const Login = ({ username, password, handleUsername, handlePassword, handleSubmit }) => (
    <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleSubmit}>
            <div>
                username: <input type="text" name="username" value={username} onChange={handleUsername} required />
            </div>
            <div>
                password: <input type="password" name="password" value={password} onChange={handlePassword} required />
            </div>
            <div>
                <button>log in</button>
            </div>
        </form >
    </div >
)

export default Login