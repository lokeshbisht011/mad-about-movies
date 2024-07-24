

import React, { useEffect, useState } from "react";
import socket from "../utils/socket";
import levenshtein from "fast-levenshtein";
import toast from "react-hot-toast";

const UserGuess = ({ answer, roomId, timer }) => {
  const [guess, setGuess] = useState("");
  const [hasGuessed, setHasGuessed] = useState(false);
  const [guessFeedback, setGuessFeedback] = useState([]);

  const checkGuess = () => {
    toast.dismiss();
    const userGuess = guess.toLowerCase();
    const distance = levenshtein.get(userGuess, answer);
    const similarityThreshold = Math.floor(answer.length * 0.5);

    if (distance === 0) {
      setHasGuessed(true);
      socket.emit("answer-guessed", roomId, timer);
      setGuessFeedback(
        answer.split("").map((char) => (
          <span key={char} className="text-green-500">
            {char}
          </span>
        ))
      );
    } else if (distance <= similarityThreshold) {
      toast("Almost there! Your guess is very close. Try again!");
      setGuessFeedback(
        userGuess.split("").map((char, index) =>
          answer[index] === char ? (
            <span key={index} className="text-green-500">
              {char}
            </span>
          ) : (
            <span key={index} className="text-red-500">
              {char}
            </span>
          )
        )
      );
    } else {
      toast("Incorrect guess. Try again!");
      setGuessFeedback([]);
    }
  };

  useEffect(() => {
    setHasGuessed(false)
    setGuess("")
    setGuessFeedback([]);
  }, [answer]);

  const renderUnderlines = () => {
    const feedbackMap = new Map(guessFeedback.map((el, index) => [index, el]));
    return answer.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="mr-2">
        {word.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block text-center w-4 border-b-2 border-gray-500 mx-[2px]"
          >
            {feedbackMap.get(index + wordIndex * word.length)}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <div className="flex gap-1">{renderUnderlines()}</div>
      {!hasGuessed && (
        <div className="flex items-center gap-2 w-full mt-2">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Your guess..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            maxLength={answer.length}
          />
          <button
            onClick={checkGuess}
            className="md:text-md text-sm bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
          >
            Guess
          </button>
        </div>
      )}
    </div>
  );
};

export default UserGuess;
