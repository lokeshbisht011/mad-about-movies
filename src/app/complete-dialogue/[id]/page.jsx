import React from 'react';
import CompleteMovieDialogue from '@/app/components/CompleteMovieDialogue';

export async function generateMetadata() {
  return {
    title: "Complete The Dialogue",
  };
}

const page = ({ params }) => {
    return (
        <div className='flex flex-col mb-10'>
          <div className='justify-center text-center text-text p-10'>
            <span className='text-xl'>Complete this dialogue from the movie.</span>
          </div>
          <div className='flex justify-center'>
              <CompleteMovieDialogue params={params}/>
          </div>
        </div>
      )
}

export default page
