import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route  } from 'react-router-dom'
import { Form, Button, Container, Row } from 'react-bootstrap'



import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import Blog from './components/Blog'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { userSet, userReset } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userSet(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {dispatch(initBlogs())}, [dispatch])

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
      dispatch(userSet(user))
      dispatch(setNotification({ content: `Logged in ${user.name}`, messageType: 'info' }))
      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch(setNotification({ content: e.response.data.error, messageType: 'warning' }))

    }
  }

  const handleLogout = () => {
    blogService.setToken(null)
    dispatch(userReset(user))
    window.localStorage.removeItem('loggedBlogUser')
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Form  onSubmit={handleLogin}>
        <div>
        username
          <Form.Control id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>

        </div>
        <div>
        password
          <Form.Control id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <Button variant="primary" type="submit">login</Button>
      </Form>
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm blogFormRef={ blogFormRef }/>
    </Togglable>
  )


  return (
    <div className="container">
      {user === null ? loginForm() :
        <div>
          <Menu>
            <span>{user.name} logged in</span>
            <span>
              <Button variant="warning" onClick={handleLogout}>logout</Button>
            </span>
          </Menu>
          <h2>blogs</h2>
          <Notification/>
          <Container>
            <Row>

              <Switch>
                <Route path='/blogs/:id'>
                  <Blog/>
                </Route>
                <Route path='/users/:id'>
                  <User/>
                </Route>
                <Route path='/users'>
                  <Users/>
                </Route>
                <Route path='/'><BlogList/></Route>
              </Switch>
            </Row>
            <Row>
              <div>
                {blogForm()}
              </div>
            </Row>
          </Container>
        </div>
      }

    </div>
  )
}

export default App