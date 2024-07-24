import Link from "next/link";
import React from "react";

const BollywoodMovies = ({ movies, char }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .filter((letter) => letter !== char.toUpperCase());

  // Function to shuffle array and select the first 6 elements
  const getRandomLetters = (arr, num) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const displayedLetters = getRandomLetters(letters, 6);

  return (
    <div>
      <div className="mx-auto max-w-2xl text-text p-5 mt-5">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bollywood Movies Starting with {char.toUpperCase()}
        </h1>
        <p className="mb-6">
          Welcome to our curated list of Bollywood movies that begin with the
          letter {char.toUpperCase()}! Happy watching!
        </p>
        <div>
          {movies.map((movie, index) => (
            <div key={index} className="mt-10">
              <h2 className="text-3xl font-semibold mb-2">
                {index + 1}. {movie.title}
              </h2>
              <p className="text-gray-700 mb-4">{movie.description}</p>
              <p className="text-gray-500 mb-2">
                <span className="font-semibold">Year:</span> {movie.year}
              </p>
              <p className="text-gray-500 mb-2">
                <span className="font-semibold">Cast:</span>{" "}
                {movie.cast.join(", ")}
              </p>
              {movie.links &&
                movie.links.map((link, index) => (
                  <div key={index}>
                    Watch on{" "}
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {link.platform}
                    </Link>
                    .
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      <hr className="mx-5"></hr>
      <h2 className="text-3xl font-bold text-center my-5">
        Explore More Bollywood Movies
      </h2>
      <div className="flex flex-wrap gap-5 mt-5 px-4 mx-12">
        {displayedLetters.map((letter) => (
          <div
            key={letter}
            className="flex flex-col p-4 border rounded-md shadow-md w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)]"
          >
            <Link
              href={`/blogs/bollywood-movies-starting-with-${letter.toLowerCase()}`}
              className="h-full flex flex-col justify-between"
            >
              <h2 className="text-2xl font-semibold">
                Movies Starting with {letter}
              </h2>
              <div className="relative">
                <img
                  src="/movies.png"
                  alt={`Movies starting with ${letter}`}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <span className="inline-block text-blue-500 text-7xl font-outline-2 font-bold">

                    {letter}
                  </span>
                </div>
              </div>
              <p className="text-xl line-clamp-2">
                A list of Bollywood movies that start with the letter{" "}
                {letter.toUpperCase()}.
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BollywoodMovies;
