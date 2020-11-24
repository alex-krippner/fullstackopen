let timeoutID 

export const notifyVote = (message, timeout) => {
    return async dispatch => {
    dispatch( {
        type: 'VOTE',
        message
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {dispatch(notifyReset())}, timeout * 1000)
    }
}

export const notifyCreate = (anecdote) => {
    return {
        type: 'CREATE',
        anecdote
    }
}

export const notifyReset = () => {
    return {
        type: 'RESET'
    }
}

const reducer = (state = null, action) => {
    switch (action.type){
        case 'VOTE':
            return  action.message
        case 'CREATE': 
            return `you created '${action.anecdote}'`
        case 'RESET':
            return null
        default:
            return state
    }
}

export default reducer