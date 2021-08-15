import React, { useState } from 'react'
import '../App.css'

const Blog = ({ blog, addLikeToBlog }) => {
  const [visibleBlog, setVisibleBlog] = useState(false)

  const styleVisible = { display: visibleBlog ? '' : 'none' }

  const addLike = (event) => {
    event.preventDefault()
    blog.likes++
    addLikeToBlog(blog)
  }

  return (
    <div className='blog-style'>
      {blog.title} <button onClick={() => setVisibleBlog(!visibleBlog)}>{visibleBlog ? 'hide' : 'view'}</button><br />
      <div style={styleVisible}>
        {blog.url}<br />
        likes {blog.likes} <button onClick={addLike}>like</button><br />
        {blog.user.username}
      </div>
    </div>
  )
}

export default Blog
