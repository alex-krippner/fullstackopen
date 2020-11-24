import anecdotesService from '../services/anecdotes'

export const initAnecdotes = () => {
  return async dispatch  => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes
  })
}
}

export const createAnecdote = (anecdote) => {
return async dispatch => {
  const newAnecdote = await anecdotesService.createNew(anecdote)
    dispatch( {
    type: 'NEW_ANECDOTE',
    data: newAnecdote
  })
} 
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdotesService.voteAnecdote(anecdote)
  dispatch( {
    type: 'VOTE_ANECDOTE',
    data: votedAnecdote
  })
  }

}


const reducer = (state = [], action) => {
  switch (action.type){
  case 'INIT_ANECDOTES':
    return action.data 
  case 'NEW_ANECDOTE': 
    return [...state, action.data]
  case 'VOTE_ANECDOTE':
    return state.map(a => a.id !== action.data.id ? a : action.data )
  default:
    return state
  }
}

export default reducer