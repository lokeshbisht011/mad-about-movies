import React from "react";

const MultiplayerCompleteMovieDialogue = ({ dialogue }) => {
  return (
    <div className="flex flex-col gap-4 p-6 text-center items-center border rounded-lg shadow-lg">
      <span className="text-2xl md:text-4xl italic text-textSoft mx-4">
        &ldquo; {dialogue}... &rdquo;
      </span>
    </div>
  );
};

export default MultiplayerCompleteMovieDialogue;
