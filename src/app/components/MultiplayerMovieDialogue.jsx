import React from "react";

const MultiplayerMovieDialogue = ({ dialogue }) => {
  return (
    <div className="flex flex-col gap-4 p-10 bg-bgSoft items-center rounded-lg shadow-md">
      <div className="max-w-xl text-center border p-5 border-textSoft">
        <span className="text-3xl md:text-4xl italic text-textSoft">
          &ldquo; {dialogue} &rdquo;
        </span>
      </div>
    </div>
  );
};

export default MultiplayerMovieDialogue;
