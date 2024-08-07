'use client'

import React, { useEffect, useState } from 'react'
import GameSection from './GameSection'

const SinglePlayerLayout = () => {

  const [themeSuffix, setThemeSuffix] = useState('_light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setThemeSuffix(savedTheme === 'light' ? '_light' : '_dark');
  }, []);

  return (
    <div className='flex flex-col h-vh p-4 items-center text-text'>
      <main className="grid md:grid-cols-2 justify-center items-center gap-5 m-8 text-text">
        <GameSection
          title="Arrange Movie Scenes"
          imageSrc={`/sequence${themeSuffix}.jpg`}
          description="Can you arrange the movie scenes in the correct order?"
          link="/sequence"
          imageClass="md:h-[150px] md:w-[260px] h-[130px] w-[180px]"
        />
        <GameSection
          title="Guess the Movie from the Dialogue"
          imageSrc={`/dialogue${themeSuffix}.jpg`}
          description="Test your movie knowledge by guessing the movie from a dialogue."
          link="/dialogue"
          imageClass="md:h-[150px] md:w-[400px] h-[90px] w-[240px]"
        />
        <GameSection
          title="Guess the Movie from the Scene"
          imageSrc="/scene.jpg"
          description="Test your movie knowledge by guessing the movie based on a scene."
          link="/scene"
          imageClass="md:h-[150px] md:w-[350px] h-[80px] w-[190px]"
        />
      </main>
    </div>
  )
}

export default SinglePlayerLayout
