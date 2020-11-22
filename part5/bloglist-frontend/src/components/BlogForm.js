import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {

  const [blogObject, setBlogObject] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleSubmitBlog = async (event) => {
    event.preventDefault()
    addBlog(blogObject)
    setBlogObject({
      title: '',
      author: '',
      url: ''
    })
  }

  const handleBlogInput = (value, key ) => {
    setBlogObject({
      ...blogObject,
      [key]: value
    })
  }


  return(
    <div >
      <h2>create new</h2>
      <form onSubmit={handleSubmitBlog} className="formDiv">
        <label>
            Title:
          <input id="title" value={blogObject.title} onChange={({ target }) => handleBlogInput(target.value, 'title')}/>
        </label>
        <label>
            Author:
          <input id="author" value={blogObject.author} onChange={({ target }) => handleBlogInput(target.value, 'author')}/>
        </label>
        <label>
            url:
          <input id="url" value={blogObject.url} onChange={({ target }) => handleBlogInput(target.value, 'url')}/>
        </label>
        <button id="btn-submit-blog" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm