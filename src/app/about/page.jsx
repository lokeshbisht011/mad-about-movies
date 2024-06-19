import React from 'react'

const page = () => {
  return (
    <div className="p-5 max-w-2xl mx-auto border-2 border-gray-300 rounded-md text-text mt-5 text-center">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4 text-2xl">
        Mad About Movies was created by movie enthusiasts just like you.
        We have a lot of games based on movies that you will enjoy playing.
      </p>
      <p className="mb-4 text-2xl">
        Rearrange scenes from a movie into the correct order.<br />
        Guess the name of the movie from just one scene.<br />
        Guess the name of the movie from a dialogue.<br />
      </p>
      <p className="mb-4 text-2xl">
        You can also challenge your friends.
      </p>
      <p className="mb-4 text-2xl">
        We hope you have a lot of fun playing these games.
      </p>
    </div>
  )
}

export default page
