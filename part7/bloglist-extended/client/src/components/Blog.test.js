import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'testing',
    author: 'jim the tester',
    url: 'https://www.testers-heaven.com',
    likes: 1,
    user: {
      name: 'jack the tester'
    }
  }
  const mockHandler = jest.fn()
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeBlog={mockHandler}/>
    )
  })

  test('renders blog title and author', () => {
    const titleSpan = component.container.querySelector('.title')
    const authorSpan = component.container.querySelector('.author')
    expect(titleSpan).toHaveTextContent('testing')
    expect(authorSpan).toHaveTextContent('jim the tester')

  })

  test('hides blog details', () => {
    const toggleDiv = component.container.querySelector('.toggleDetails')

    expect(toggleDiv).toHaveStyle('display: none')
  })

  test('show blog details', () => {
    const { getByText  } = component

    const button = getByText('view')
    fireEvent.click(button)
    const toggleDiv = component.container.querySelector('.toggleDetails')

    expect(toggleDiv).not.toHaveStyle('display: none')
  })

  test('calls event handler twice', () => {
    const { getByText  } = component
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })



})

