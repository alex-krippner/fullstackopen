import React from 'react'
import { useParams } from 'react-router-dom'

import { useResources } from '../hooks/index'

const User = () => {
  const id = useParams().id
  const users = useResources('http://localhost:3001/api/users')

  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }
  return (
    user.blogs.length === 0 ?
      <h3>user has not added blogs yet</h3>
      :
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(b => <li key={b.title}>{b.title}</li>)}
        </ul>
      </div>)

}

export default User