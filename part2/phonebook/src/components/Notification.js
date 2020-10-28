import React from 'react'

const Notification = ({message, messageType}) => {

    const messageStyle = {
      color: `${messageType === 'error' ? 'red' : 'green'}`,
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    }
  
    return (
      <div>
     {message === null ? '' : (<div style={messageStyle}>{message}</div>)}
     </div>
    )
  }

  export default Notification