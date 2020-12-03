import React  from 'react'
import { useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'

const Notification = () => {

  const notification = useSelector( state => state.notification)
  console.log(notification)


  return (
    <div id="notification-message">
      {notification.message === '' ? '' : (<Alert variant={notification.messageType} >{notification.message}</Alert>)}
    </div>
  )
}

export default Notification