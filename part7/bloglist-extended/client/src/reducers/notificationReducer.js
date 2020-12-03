const initialState = {
  message: '',
  messageType: '',
}

const  notificationReducer = (state = initialState, action) => {
  switch( action.type ) {
  case 'SET_NOTIFICATION':
    return {
      message: action.content,
      messageType: action.messageType
    }
  case 'NOTIFY_RESET':
    return initialState
  default:
    return state
  }
}


const handleTimeout = (dispatch) => {
  let timeoutID
  clearTimeout(timeoutID)
  timeoutID = setTimeout(() => { dispatch(notificationReset())}, 5000)
}

export const setNotification = ({ content, messageType }) => {
  console.log(messageType)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content,
      messageType
    })
    handleTimeout(dispatch)
  }
}

export const notificationReset = () => {
  return {
    type: 'NOTIFY_RESET'
  }
}




export default notificationReducer