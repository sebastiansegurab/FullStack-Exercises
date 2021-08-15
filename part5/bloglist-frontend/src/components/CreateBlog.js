import React, { useState } from 'react'

const CreateBlog = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = (event) => {
        event.preventDefault()
        const blog = { title, author, url }
        addBlog(blog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={handleCreateBlog}>
                <div>
                    title: <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} required />
                </div>
                <div>
                    author: <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} required />
                </div>
                <div>
                    url: <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} required />
                </div>
                <div>
                    <button>create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBlog