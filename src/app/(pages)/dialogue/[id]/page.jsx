import React from 'react';
import MovieDialogue from '@/app/components/MovieDialogue';

const page = ({ params }) => {
    return (
        <div className='flex flex-col h-lvh mb-20 md:ml-48'>
          <div className='justify-center text-center text-white p-10'>
            <span className='text-xl'>Guess the movie from dialogue.</span>
          </div>
          <div className='flex justify-center mb-10'>
              <MovieDialogue params={params}/>
          </div>
        </div>
      )
}

export default page
