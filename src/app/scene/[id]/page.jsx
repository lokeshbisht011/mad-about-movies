import React from 'react';
import MovieScene from '@/app/components/MovieScene';

const page = ({ params }) => {
    return (
        <div className='flex flex-col h-lvh mb-20'>
          <div className='justify-center text-center text-white p-10'>
            <span className='text-xl'>Guess the movie from the scene.</span>
          </div>
          <div className='flex justify-center items-center mb-10'>
              <MovieScene params={params}/>
          </div>
        </div>
      )
}

export default page
