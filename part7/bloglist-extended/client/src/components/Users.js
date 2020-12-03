import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


import { useResources } from '../hooks/index'

const Users = () => {
  const users = useResources('http://localhost:3001/api/users')

  return (
    <div>
      <h2>Users</h2>
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blogs created</th>

            </tr>
          </thead>
          <tbody>
            {users.map(u =>
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>
                  <span>{u.blogs.length}</span>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Users