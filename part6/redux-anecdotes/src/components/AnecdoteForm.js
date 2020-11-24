import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifyCreate, notifyReset } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

const addAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
  
    props.createAnecdote(anecdote)
    props.notifyCreate(anecdote)
    e.target.anecdote.value = ''

    setTimeout(() => {props.notifyReset()}, 5000)
  
}


    return (
        <form onSubmit={addAnecdote}>
            <div>
            <input name="anecdote"/>
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

const mapDispatchToProps = {
    notifyCreate,
    notifyReset,
    createAnecdote
}

const ConnectAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectAnecdoteForm