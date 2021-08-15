import React, { useState } from 'react'
import '../App.css'

const Blog = ({ blog }) => {
  const [visibleBlog, setVisibleBlog] = useState(false)

  const styleVisible = { display: visibleBlog ? '' : 'none' }

  return (
    <div className='blog-style'>
      {blog.title} <button onClick={() => setVisibleBlog(!visibleBlog)}>{visibleBlog ? 'hide' : 'view'}</button><br />
      <div style={styleVisible}>
        {blog.url}<br />
        likes {blog.likes}<br />
        {blog.user.username}
      </div>
    </div>
  )
}

export default Blog
