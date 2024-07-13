import React from 'react'

export async function generateMetadata() {
  return {
    title: "Contact Us",
  };
}

const page = () => {
  return (
    <div className="p-5 max-w-2xl mx-auto border-2 border-gray-300 rounded-md text-text mt-5 text-center">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4 text-2xl">
        We would love to hear your feedback.<br />
        If you find anything wrong or if you want us to add games from one of your favourite movies,<br />
        feel free to contact us.
      </p>
      <p className="mb-4 text-2xl">
        Also contact us, if you loved playing the games.<br />
        Email: madaboutmovies009@gmail.com
      </p>
    </div>
  )
}

export default page
