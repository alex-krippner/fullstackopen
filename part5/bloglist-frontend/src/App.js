import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  const blogFormRef = React.createRef()

  const sortByLike = (a, b) => a.likes > b.likes ? -1 : 1


  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort(sortByLike)
      setBlogs( sortedBlogs ) }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.create(blogObject)
      const sortedBlogs = [...blogs, newBlog].sort(sortByLike)
      setBlogs(sortedBlogs)
      setNotification(`Added ${newBlog.title}`, 'success')
    } catch (e) {
      setNotification(e.response.data.error, 'error')
    }
  }

  const likeBlog = async (blogObject) => {
    const blogToUpdate = {
      ...blogObject,
      likes: blogObject.likes + 1
    }
    try{
      const updatedBlog = await blogService.update(blogToUpdate)
      const sortedUpdatedBlogs = blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b).sort(sortByLike)
      setBlogs(sortedUpdatedBlogs)

    } catch(e) {
      setNotification(e.response.data.error, 'error')
    }
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title}`)) {
      try {
        await blogService.deleteBlog(blogObject)
        const sortedUpdatedBloglist = blogs.filter( b => b.id !== blogObject.id).sort(sortByLike)
        setBlogs(sortedUpdatedBloglist)
        setNotification(`Removed ${blogObject.title}`, 'success')
      } catch (e) {
        setNotification(e.response.data.error, 'error')
      }
    }
  }

  const setNotification = (message, messageType) => {
    if (messageType === 'error') {
      setMessageType(messageType)
      setMessage(message)
    }

    setMessageType(messageType)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)

  }



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setNotification(`${user.name} has logged in`, 'success')
      setUsername('')
      setPassword('')
    } catch (e) {
      setNotification(e.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    blogService.setToken(null)
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form  onSubmit={handleLogin}>
        <div>
        username
          <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>

        </div>
        <div>
        password
          <input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm addBlog={ addBlog }/>
    </Togglable>
  )


  return (
    <div>

      <h2>blogs</h2>
      <Notification message={message} messageType={messageType}/>
      {user === null ? loginForm() :
        <div>
          <span>{user.name} logged in</span>
          <span>
            <button onClick={handleLogout}>logout</button>
          </span>
          <div>
            {blogForm()}
          </div>
          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
            )}
          </div>
        </div>
      }

    </div>
  )
}

export default App