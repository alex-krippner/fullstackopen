const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require ('../models/user')

const api = supertest(app)


beforeEach(async() => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers
    .map( user => new User(user))
  const promiseArray = userObjects.map(user => user.save())

  await Promise.all(promiseArray)
})
// check that invalid users are not created and invalid add user operation
// returns a suitable status code and error message.

describe('when creating users', () => {

  test('invalid username responds with 400 and error message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aa',
      name: 'username too short',
      password: 'username too short'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('invalid password format responds with 400 and error message', async () => {
    const usersAtStart = await helper.usersInDb()


    const newUser = {
      username: 'password too short',
      name: 'password too short',
      password: 'pa'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})