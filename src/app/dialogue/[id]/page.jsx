import React from 'react';
import MovieDialogue from '@/app/components/MovieDialogue';

export async function generateMetadata() {
  return {
    title: "Guess From Dialogue",
  };
}

const page = ({ params }) => {
    return (
        <div className='flex flex-col mb-10'>
          <div className='justify-center text-center text-text p-10'>
            <span className='text-xl'>Guess the name of the movie from the dialogue.</span>
          </div>
          <div className='flex justify-center'>
              <MovieDialogue params={params}/>
          </div>
        </div>
      )
}

export default page
