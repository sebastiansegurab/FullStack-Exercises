import React from 'react'

const CreateBlog = ({ handleCreateBlog, title, author, url, handleTitle, handleAuthor, handleUrl }) =>
(
    <div>
        <form onSubmit={handleCreateBlog}>
            <div>
                title: <input type="text" value={title} name="title" onChange={handleTitle} required />
            </div>
            <div>
                author: <input type="text" value={author} name="author" onChange={handleAuthor} required />
            </div>
            <div>
                url: <input type="text" value={url} name="url" onChange={handleUrl} required />
            </div>
            <div>
                <button>create</button>
            </div>
        </form>
    </div>
)

export default CreateBlog