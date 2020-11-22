import React,{ useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visibility, setVisibility] = useState(false)

  const showWhenVisible = { display: visibility ? '' : 'none' }




  return (
    <div style={blogStyle}>
      <span className="title">{blog.title} </span>
      <span className="author">{blog.author}</span>
      <span>
        <button onClick={ () => setVisibility(!visibility)}>{visibility ? 'hide' : 'view'}</button>
      </span>
      <div className="toggleDetails" style={showWhenVisible}>
        <p className="url">{blog.url}</p>
        <div>
          <span>likes</span>
          <span className="likes"> {blog.likes} </span>
          <span>
            <button id="btn-like-blog" onClick={() => likeBlog(blog)}>like</button>
          </span>
        </div>
        <p>{blog.author}</p>
        <button id="btn-delete-blog" onClick={() => deleteBlog(blog)}>delete</button>
      </div>
    </div>
  )
}

export default Blog