const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res ) => {
  const response =  await Blog.find({}).populate('user')
  res.json(response)
})

blogsRouter.post('/', async (req, res) => {

  const { title, author, url, likes } = req.body
  if(!req.token) {
    return res.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!url || !title) {
    return res.status(400).json({
      error: 'url and/or title missing'
    })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id

  })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(200).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blogId = req.params.id


  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)



  if (!user.blogs.includes(blogId)) {
    return res.status(403).json({
      error: 'no authorization to delete this post'
    })
  }


  await Blog.findByIdAndDelete(blogId)
  res.status(204).json({ message: 'blog deleted' })

})

blogsRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req

  const { title, author, url, likes } = body

  const blog =  { title, author, url, likes }

  const result = await Blog.findByIdAndUpdate(id, blog, { new: true })

  res.json(result)

})

module.exports = blogsRouter