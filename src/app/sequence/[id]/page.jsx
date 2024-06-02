import React from 'react';
import MovieSequence from '@/app/components/MovieSequence';

const page = ({ params }) => {
    return (
        <div className='flex flex-col h-lvh mb-20 md:ml-48'>
          <div className='justify-center text-center text-white p-10'>
            <span className='text-xl'>Arrange the scenes into the correct order.</span>
          </div>
          <div className='flex justify-center mb-10'>
              <MovieSequence params={params}/>
          </div>
        </div>
      )
}

export default page
