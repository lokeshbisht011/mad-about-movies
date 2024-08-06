import React from "react";

const MultiplayerMovieDialogue = ({ dialogue }) => {
  return (
    <div className="flex flex-col gap-4 p-6 text-center items-center border rounded-lg shadow-lg">
      <span className="text-2xl md:text-4xl italic text-textSoft">
        &ldquo; {dialogue} &rdquo;
      </span>
    </div>
  );
};

export default MultiplayerMovieDialogue;
