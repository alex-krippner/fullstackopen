import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './blogReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'



const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store