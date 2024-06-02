import Link from 'next/link'
import React, { Suspense } from 'react'

const HomeLayout = () => {
  return (
    <div className='flex flex-col h-lvh p-4 items-center'>
      <header className="w-full text-white py-4 text-center">
        <h1 className='text-3xl fond-bold'>Everything movies. Enjoy various games based on bollywood movies.</h1>
      </header>
      <main className="flex flex-col gap-5 max-w-4xl m-8 text-white">
        <section className="p-6 shadow-md rounded-lg text-center bg-[color:var(--bgSoft)]">
          <h2 className="text-2xl font-semibold mb-4">Arrange Movie Scenes</h2>
          <p className="mb-4">Can you arrange the movie scenes in the correct order?</p>
          <Link href="/sequence">
            <span className="bg-[color:var(--bg)] text-white px-4 py-2 rounded-md hover:bg-blue-700">Play Now</span>
          </Link>
        </section>
        <section className="p-6 shadow-md rounded-lg text-center bg-[color:var(--bgSoft)]">
          <h2 className="text-2xl font-semibold mb-4">Guess the Movie from the Dialogue</h2>
          <p className="mb-4">Test your movie knowledge by guessing the movie from a dialogue.</p>
          <Link href="/dialogue">
            <span className="bg-[color:var(--bg)] text-white px-4 py-2 rounded-md hover:bg-blue-700">Play Now</span>
          </Link>
        </section>
        <section className="p-6 shadow-md rounded-lg text-center bg-[color:var(--bgSoft)]">
          <h2 className="text-2xl font-semibold mb-4">Guess the Movie from the Scene</h2>
          <p className="mb-4">Test your movie knowledge by guessing the movie based on a scene.</p>
          <Link href="/scene">
            <span className="bg-[color:var(--bg)] text-white px-4 py-2 rounded-md hover:bg-blue-700">Play Now</span>
          </Link>
        </section>
      </main>
    </div>
  )
}

export default HomeLayout
