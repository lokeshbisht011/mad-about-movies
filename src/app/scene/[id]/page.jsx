import React from 'react';
import MovieScene from '@/app/components/MovieScene';

const page = ({ params }) => {
    return (
        <div className='flex flex-col mb-10'>
          <div className='justify-center text-center text-text p-10'>
            <span className='text-xl'>Guess the name of the movie from the scene.</span>
          </div>
          <div className='flex justify-center items-center'>
              <MovieScene params={params}/>
          </div>
        </div>
      )
}

export default page
