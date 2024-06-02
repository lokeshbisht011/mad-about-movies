import Link from 'next/link'
import React, { Suspense } from 'react'

const HomeLayout = () => {
  return (
    <div className='flex flex-col h-lvh p-4'>
      <header className="w-full text-white py-4 text-center">
        <h1 className='text-3xl fond-bold'>Everything movies. Enjoy games, read our blogs about</h1>
      </header>
      <main className="w-full max-w-4xl m-8 bg-[color:var(--bgSoft)] text-white">
        <section className="p-6 shadow-md rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Guess the Movie from the Scene</h2>
          <p className="mb-4">Test your movie knowledge by guessing the movie based on a scene.</p>
          <Link href="/guess-movie">
            <span className="bg-[color:var(--bg)] text-white px-4 py-2 rounded-md hover:bg-blue-700">Play Now</span>
          </Link>
        </section>

        <section className=" p-6 shadow-md rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Arrange Movie Scenes</h2>
          <p className="mb-4">Can you arrange the movie scenes in the correct order?</p>
          <Link href="/arrange-scenes">
            <span className="bg-[color:var(--bg)] text-white px-4 py-2 rounded-md hover:bg-blue-700">Play Now</span>
          </Link>
        </section>

        <section className="bg-[color:var(--bgSoft)] p-6 shadow-md rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Movie Trivia</h2>
          <p className="mb-4">Challenge yourself with our movie trivia questions.</p>
          <Link href="/movie-trivia">
            <span className="bg-[color:var(--bg)] text-white px-4 py-2 rounded-md hover:bg-blue-700">Play Now</span>
          </Link>
        </section>
      </main>
    </div>
  )
}

export default HomeLayout
