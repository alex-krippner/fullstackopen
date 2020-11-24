import React from 'react'
import { connect } from 'react-redux'

import {voteAnecdote} from '../reducers/anecdoteReducer'
import {notifyVote} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {

    return(
        <div>
        <div>
        {anecdote.content}
    </div>
    <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote)}>vote</button>
    </div>   
    </div>
    )
}

const AnecdoteList = (props) => {
    
    const vote = (anecdote) => {
     props.voteAnecdote(anecdote)
     props.notifyVote(`you voted '${anecdote.content}'`, 5)
    }

    return(
        <div>
        {props.anecdotes
            .filter(a => { 
                return a.content.toLowerCase().match(props.filter.toLowerCase())
            })
            .sort((a,b) => a.votes > b.votes ? -1 : 1)
            .map(anecdote =>
            <Anecdote handleClick={vote} anecdote={anecdote} key={anecdote.id}/>
        )}
        </div>
  )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    notifyVote
}

const ConnectAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectAnecdoteList