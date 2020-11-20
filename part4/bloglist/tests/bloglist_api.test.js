const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require ('../models/user')
const api = supertest(app)
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const blogPromiseArray = await blogObjects.map(blog => blog.save())

  await Promise.all(blogPromiseArray)

})

describe('when there are blogs on the database', () => {

  test('the api returns two blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })



  test('if api handles get request with id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
    const blogIds = response.body.map(blog => blog.id)
    expect(blogIds).toBeDefined()
  })
})

describe('addition of new blog', () => {

  test('if a blog can be added', async () => {
    const user = helper.initialUsers[0]


    const token = await helper.createLoggedInUserAndToken(api, user)

    // create blog post and add blog with token in header
    const newBlog = {
      title: 'when will i find a job',
      author: 'junior dev',
      url: 'a url'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()

    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAfterPost.map(b => b.title)
    expect(titles).toContain(
      'when will i find a job'
    )

  })

  test('if there is no token than respond with status code 401', async () => {
    const user = helper.initialUsers[0]

    // create new user and sign in (returned token is not assigned to a variable)

    await helper.createLoggedInUserAndToken(api, user)

    const newBlog = {
      title: 'when will i find a job',
      author: 'junior dev',
      url: 'a url'
    }
    // send post request without token in header
    let message
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .expect((res) => message = res.body.error )

    const blogsAfterPost = await helper.blogsInDb()

    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
    expect(message).toContain('token missing')
  })


  test('if likes default to 0', async () => {
    const user = await helper.initialUsers[0]
    console.log('entered test')

    const token = await helper.createLoggedInUserAndToken(api, user)

    const newBlog = {
      title: 'why do people vote for Trump?',
      author: 'reason',
      url: 'a url'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    const newlyAddedBlog = await blogsAfterPost.find( b => b.title === newBlog.title)

    expect(newlyAddedBlog.likes).toBe(0)
  })


  test('if post request without title and/or url return 400 bad request', async() => {
    const user = helper.initialUsers[0]

    const token = await helper.createLoggedInUserAndToken(api, user)
    const newBlog = {
      author: 'author who forgot to add a title and/or url'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

  })
})

describe('deletion of a blog', () => {

  test('delete blog by id', async() => {
    const blogs = await helper.blogsInDb()

    const blogToDelete = blogs[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()
    const findDeletedBlog = blogsAfterDelete.find( b => b.id === blogToDelete.id)

    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1)
    expect(findDeletedBlog).toBe(undefined)
  })
})


describe('update of a blog', () => {
  test('update blog', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterUpdate = await helper.blogsInDb()

    const newlyUpdatedBlog = blogsAfterUpdate.find( b => b.id === blogToUpdate.id)

    expect(newlyUpdatedBlog.likes).toBe(blogToUpdate.likes + 1)
  })
})

afterAll(async() => {
  await  mongoose.connection.close()
})