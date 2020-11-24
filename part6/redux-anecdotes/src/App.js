import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


import AndecdoteList from './components/AnecdoteList'
import AndecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {dispatch(initAnecdotes())
  },[dispatch])

  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter/>
      <AndecdoteList />
      <h2>create new</h2>
      <AndecdoteForm/>
    </div>
  )
}

export default App