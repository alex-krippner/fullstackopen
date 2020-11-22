import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Blog form calls addBlog handler with the right details', () => {

  const addBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={addBlog}/>
  )

  const input = component.container.querySelector('.title')
  const form = component.container.querySelector('.formDiv')

  fireEvent.change(input, {
    target: { value: 'test test test' }
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('test test test')

})