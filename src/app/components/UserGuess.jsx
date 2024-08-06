import React, { useEffect, useState } from "react";
import socket from "../utils/socket";
import levenshtein from "fast-levenshtein";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

const UserGuess = ({ answer, roomId, timer, currentRound }) => {
  const [guess, setGuess] = useState("");
  const [hasGuessed, setHasGuessed] = useState(false);
  const [guessFeedback, setGuessFeedback] = useState([]);

  const checkGuess = () => {
    toast.dismiss();
    const userGuess = guess.toLowerCase();
    const trimmedAnswer = answer.toLowerCase();

    const distance = levenshtein.get(userGuess, trimmedAnswer);
    const similarityThreshold = Math.floor(trimmedAnswer.length * 0.3);

    if (userGuess === trimmedAnswer) {
      setHasGuessed(true);
      socket.emit("answer-guessed", roomId, timer, currentRound);
      setGuessFeedback([]);
      triggerConfetti();
    } else if (distance <= similarityThreshold) {
      toast("Your guess is very close. Try again!");
      setGuessFeedback(
        userGuess.split("").map((char, index) =>
          trimmedAnswer[index] === char ? (
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
      setGuessFeedback(
        userGuess.split("").map((char, index) =>
          trimmedAnswer[index] === char ? (
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
      setGuessFeedback([]);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    setHasGuessed(false);
    setGuess("");
    setGuessFeedback([]);
  }, [answer]);

  const renderUnderlines = () => {
    let charIndex = 0;

    return answer.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="mr-2">
        {word.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block text-center w-2 border-b-2 border-gray-500 mx-[2px]"
          />
        ))}
        {charIndex < word.length - 1 && (
          <span className="inline-block w-1"></span>
        )}
        {word.length}
      </span>
    ));
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <div className="flex flex-col items-center gap-2 w-full px-6 mt-2">
        <div className={`flex gap-1 ${hasGuessed ? "invisible" : ""}`}>{renderUnderlines()}</div>
        {guessFeedback.length > 0 && (
          <div className="text-sm w-full">{guessFeedback} is very close.</div>
        )}
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            className={`border ${
              hasGuessed ? "border-green-300" : "border-gray-300"
            } rounded-md p-2 w-full`}
            placeholder="Your guess..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            maxLength={answer.length}
          />
          <button
            onClick={checkGuess}
            disabled={hasGuessed}
            className="md:text-md text-sm bg-gray-500 hover:bg-gray-400 text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
          >
            Guess
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserGuess;
