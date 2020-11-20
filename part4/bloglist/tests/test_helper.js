
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'My blog',
    author: 'jack',
    likes: 0,
  },
  {
    title: 'Coding is fun',
    author: 'jill',
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


const initialUsers = [
  {
    username: 'godzilla',
    name: 'james',
    password: 'password',
  },
  {
    username: 'poroporo',
    name: 'andrian',
    password: 'password',
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const createLoggedInUserAndToken = async (api, user) => {
  // create new user
  await api
    .post('/api/users')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    // sign in and get token
  let token

  await api
    .post('/api/login')
    .send({ username: user.username , password: user.password })
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(( res) => {
      token = res.body.token
    })

  return token
}

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb,
  createLoggedInUserAndToken
}