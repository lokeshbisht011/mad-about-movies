import React from "react";

const page = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <div className="bg-bg p-5 max-w-2xl md:mx-auto mx-4 border-2 border-gray-300 rounded-md text-text mt-5 text-center">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-4 md:text-2xl text-xl">
          <b>Mad About Movies</b> was created by movie enthusiasts just like you. We
          have a lot of games based on movies that you will enjoy playing.
        </p>
        <p className="mb-4 md:text-2xl text-xl">
          Rearrange scenes from a movie into the correct order.
          <br />
          Guess the name of the movie from just one scene.
          <br />
          Guess the name of the movie from a dialogue.
          <br />
          Complete dialogue from a movie.
          <br />
        </p>
        <p className="mb-4 md:text-2xl text-xl">You can also challenge your friends.<br/>
          We hope you have a lot of fun playing these games.</p>
      </div>
    </div>
  );
};

export default page;
