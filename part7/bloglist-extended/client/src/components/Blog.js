import React from 'react'
import { blogLike, blogDelete, blogComment } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useField } from '../hooks/index'
import { Button, Form } from 'react-bootstrap'


const Comments = ({ comments, blogId }) => {
  const dispatch = useDispatch()
  const comment = useField('text')
  const handleSubmitComment = (e) => {
    e.preventDefault()
    dispatch(blogComment({ comment: comment.value, blogId }))

  }

  return (
    <div>
      <h3>comments</h3>
      <Form onSubmit={handleSubmitComment}>
        <Form.Label>
          <Form.Control {...comment}/>
        </Form.Label>
        <Button variant='success' type="submit">add comment</Button>
      </Form>
      <ul>

        {comments.map( (c) => {
          console.log(c.id )
          return (
            <li key={c.id }>{c.content}</li>)})}
      </ul>
    </div>
  )
}

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)


  const blog = blogs.find(b => b.id === id)
  if (!blog) {
    return null
  }



  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(blogDelete(blog))
    }
  }


  return (
    <div  >
      <h3 className="title">{blog.title} {blog.author} </h3>
      <div>
        <a className="url" href={blog.url}>{blog.url}</a>
        <div>
          <span>likes</span>
          <span className="likes"> {blog.likes} </span>
          <span>
            <Button variant='info' id="btn-like-blog" onClick={() => dispatch(blogLike(blog))}>like</Button>
          </span>
        </div>
        <p>added by {blog.author}</p>
        <Button variant='danger' id="btn-delete-blog" onClick={() => handleDelete(blog)}>delete</Button>
        {console.log(blog)}
        <Comments comments={blog.comments} blogId={blog.id}/>

      </div>
    </div>
  )
}

export default Blog