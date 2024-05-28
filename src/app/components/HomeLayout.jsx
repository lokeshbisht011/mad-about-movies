import React, { Suspense } from 'react'
import Images from './Images'

const HomeLayout = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex-1 justify-center text-center text-white p-10'>
        <span className=''>Arrange the scenes into the correct order.</span>
      </div>
      <div className='flex justify-center'>
          <Images />
      </div>
    </div>
  )
}

export default HomeLayout
