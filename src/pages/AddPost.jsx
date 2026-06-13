import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white border-b border-gray-100'>
        <Container>
          <div className='py-6'>
            <h1 className='text-2xl font-bold text-gray-900'>Write a New Post</h1>
            <p className='text-sm text-gray-500 mt-1'>Share your thoughts with the world</p>
          </div>
        </Container>
      </div>
      <Container>
        <div className='py-8'>
          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default AddPost