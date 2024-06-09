'use client'

import React, { useEffect, useState } from 'react'
import GameSection from './GameSection'

const HomeLayout = () => {

  return (
    <div className='flex flex-col h-vh p-4 items-center'>
      <header className="text-white py-4 text-center max-w-3xl">
        <h1 className='text-3xl fond-bold'>Enjoy different games based on your favourite bollywood movies. Challenge your friends and have fun playing.</h1>
      </header>
      <main className="grid md:grid-cols-2 justify-center items-center gap-5 m-8 text-white">
        <GameSection
          title="Arrange Movie Scenes"
          imageSrc="/sequence.jpg"
          description="Can you arrange the movie scenes in the correct order?"
          link="/sequence"
          imageClass="md:h-[250px] md:w-[350px] sm:h-[180px] sm:w-[250px] h-[80px] w-[190px]"
        />
        <GameSection
          title="Guess the Movie from the Dialogue"
          imageSrc="/scene.jpg"
          description="Test your movie knowledge by guessing the movie from a dialogue."
          link="/dialogue"
          imageClass="md:h-[250px] md:w-[350px] sm:h-[180px] sm:w-[250px] h-[80px] w-[190px]"
        />
        <GameSection
          title="Guess the Movie from the Scene"
          imageSrc="/scene.jpg"
          description="Test your movie knowledge by guessing the movie based on a scene."
          link="/scene"
          imageClass="md:h-[150px] md:w-[350px] sm:h-[100px] sm:w-[250px] h-[80px] w-[190px]"
        />
      </main>
    </div>
  )
}

export default HomeLayout
