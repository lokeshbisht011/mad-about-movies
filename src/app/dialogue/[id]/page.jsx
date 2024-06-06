import React from 'react';
import MovieDialogue from '@/app/components/MovieDialogue';

const page = ({ params }) => {
    return (
        <div className='flex flex-col mb-20'>
          <div className='justify-center text-center text-text p-10'>
            <span className='text-xl'>Guess the movie from dialogue.</span>
          </div>
          <div className='flex justify-center'>
              <MovieDialogue params={params}/>
          </div>
        </div>
      )
}

export default page
