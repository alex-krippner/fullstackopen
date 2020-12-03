import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const sortByLike = (a, b) => b.likes - a.likes

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD_BLOG':
    return [...state, action.data].sort(sortByLike)
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.data)
  case 'LIKE_BLOG':
    return state.map( b => b.id === action.data.id ? action.data.blog : b).sort(sortByLike)
  case 'COMMENT_BLOG':
    return state.map( b => b.id === action.data.id ? action.data.blog : b).sort(sortByLike)
  case 'INIT_BLOG':
    return action.data.sort(sortByLike)
  default:
    return state
  }
}

export const initBlogs = () => {

  return async dispatch => {
    try {
      const blogList = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOG',
        data: blogList
      })
    } catch (e) {
      console.log(e)
      dispatch(setNotification({ content: e.response.data.error, messageType: 'warning' }))
    }
  }
}

export const blogAdd = (blogObject) => async dispatch => {
  try {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
    dispatch(setNotification({ content: `Added ${blogObject.title}` , messageType: 'info' }))
  } catch (e) {
    dispatch(setNotification({ content: e.response.data.error, messageType: 'warning' }))
  }
}

export const blogLike = (blogObject) => async dispatch => {

  const blogToUpdate = {
    ...blogObject,
    likes: blogObject.likes + 1
  }
  try{
    const blog = await blogService.update(blogToUpdate)
    dispatch({
      type: 'LIKE_BLOG',
      data: {
        blog,
        id: blog.id
      }
    })
  } catch(e) {
    dispatch(setNotification({ content: e.response.data.error, messageType: 'warning' }))
  }
}


export const blogDelete = (blogObject) => {

  return async dispatch => {
    try {
      await blogService.deleteBlog(blogObject)

      dispatch({
        type: 'DELETE_BLOG',
        data: blogObject.id
      })
      dispatch(setNotification({ content:`Deleted ${blogObject.title}` , messageType: 'info' }))
    } catch (e) {
      dispatch(setNotification({ content: e.response.data.error, messageType: 'warning' }))
    }
  }
}

export const blogComment = (commentObject) => async dispatch => {
  try {
    const blog = await blogService.commentBlog(commentObject)
    console.log(blog)

    dispatch({
      type: 'COMMENT_BLOG',
      data: {
        blog,
        id: commentObject.blogId
      }
    })
  } catch (e) {
    dispatch(setNotification({ content: e.response.data.error, messageType: 'warning' }))

  }
}

export default blogReducer