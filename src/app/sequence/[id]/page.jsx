import React from 'react';
import MovieSequence from '@/app/components/MovieSequence';

export async function generateMetadata() {
  return {
    title: "Arrange The Scenes",
  };
}

const page = ({ params }) => {
    return (
        <div className='flex flex-col mb-10'>
          <div className='justify-center text-center text-text p-10'>
            <span className='text-2xl'>Arrange the scenes from the movie into the correct order.</span>
          </div>
          <div className='flex justify-center'>
              <MovieSequence params={params}/>
          </div>
        </div>
      )
}

export default page
