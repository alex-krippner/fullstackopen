const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'RESET_USER':
    return null
  default:
    return state
  }
}

export const userSet = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export const userReset = () => {
  return {
    type: 'RESET_USER'
  }
}

export default userReducer