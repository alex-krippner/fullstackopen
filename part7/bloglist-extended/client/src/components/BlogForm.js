import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { blogAdd } from '../reducers/blogReducer'
import { Form, Button } from  'react-bootstrap'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const initialState = {
    title: '',
    author: '',
    url: ''
  }

  const [blogObject, setBlogObject] = useState(initialState)

  const handleSubmitBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    dispatch(blogAdd(blogObject))
    setBlogObject(initialState)
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
      <Form onSubmit={handleSubmitBlog} className="formDiv">
        <Form.Group>
          <Form.Label>
        Title:
          </Form.Label>
          <Form.Control id="title" value={blogObject.title} onChange={({ target }) => handleBlogInput(target.value, 'title')}/>
        </Form.Group>
        <Form.Label>
            Author:
        </Form.Label>
        <Form.Control id="author" value={blogObject.author} onChange={({ target }) => handleBlogInput(target.value, 'author')}/>

        <Form.Label>
            url:
        </Form.Label>
        <Form.Control id="url" value={blogObject.url} onChange={({ target }) => handleBlogInput(target.value, 'url')}/>
        <Button id="btn-submit-blog" type="submit" variant="primary">create</Button>
      </Form>
    </div>
  )
}

export default BlogForm