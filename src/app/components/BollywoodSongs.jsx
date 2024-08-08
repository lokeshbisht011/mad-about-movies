import Link from "next/link";
import React from "react";

const BollywoodSongs = ({ songs, char }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .filter((letter) => letter !== char.toUpperCase());
  const getRandomLetters = (arr, num) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const displayedLetters = getRandomLetters(letters, 6);

  return (
    <div>
      <div className="mx-auto max-w-2xl text-text p-5 mt-5">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bollywood Songs Starting with {char.toUpperCase()}
        </h1>
        <p className="mb-6">
          Welcome to our curated list of Bollywood songs that begin with the
          letter {char.toUpperCase()}! Enjoy the music!
        </p>
        <div>
          {songs.map((song, index) => (
            <div key={index} className="mt-10">
              <h2 className="text-3xl font-semibold mb-2">
                {index + 1}. {song.title}
              </h2>
              <p className="text-gray-700 mb-4">{song.description}</p>
              <p className="text-gray-500 mb-2">
                <span className="font-semibold">Year:</span> {song.year}
              </p>
              <p className="text-gray-500 mb-2">
                <span className="font-semibold">Artist(s):</span> {song.artist}
              </p>
              <p className="text-gray-500 mb-2">
                <span className="font-semibold">Album:</span> {song.album}
              </p>
              {song.links &&
                song.links.map((link, index) => (
                  <div key={index}>
                    Listen on{" "}
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
        Explore More Bollywood Songs
      </h2>
      <div className="flex flex-wrap gap-5 mt-5 px-4 mx-12">
        {displayedLetters.map((letter) => (
          <div
            key={letter}
            className="flex flex-col p-4 border rounded-md shadow-md w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)]"
          >
            <Link
              href={`/blogs/bollywood-songs-starting-with-${letter.toLowerCase()}`}
              className="h-full flex flex-col justify-between"
            >
              <h2 className="text-2xl font-semibold">
                Songs Starting with {letter}
              </h2>
              <div className="relative">
                <img
                  src="/movies.png"
                  alt={`Songs starting with ${letter}`}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <span className="inline-block text-blue-500 text-7xl font-outline-2 font-bold">
                    {letter}
                  </span>
                </div>
              </div>
              <p className="text-xl line-clamp-2">
                A list of Bollywood songs that start with the letter{" "}
                {letter.toUpperCase()}.
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BollywoodSongs;
