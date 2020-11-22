import React from 'react'

const Notification = ({ message, messageType }) => {

  const messageStyle = {
    color: `${messageType === 'error' ? 'rgb(255, 0, 0)' : 'green'}`,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return (
    <div id="notification-message">
      {message === null ? '' : (<div style={messageStyle}>{message}</div>)}
    </div>
  )
}

export default Notification