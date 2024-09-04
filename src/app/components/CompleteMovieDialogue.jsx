"use client";

import React, { useEffect, useRef, useState } from "react";
import bollywoodMovieCompleteDialogue from "/public/bollywoodMovieCompleteDialogue.json";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  BOLLYWOOD_GAME_URL,
  GUESSES_ALLOWED,
  COMPLETE_DIALOGUE_DESCRIPTION,
  RANDOM_URL_PREFIX,
  COMPLETE_DIALOGUE_URL,
  INCORRECT_GUESS_MESSAGE,
  DIALOGUE_COMPLETED_DESCRIPTION,
} from "../utils/constants";
import levenshtein from "fast-levenshtein";
import { nextMovie, stringToNumber } from "../utils/utils";
import {
  challengeFriendPopup,
  gameCompletedPopup,
  giveUp,
} from "../utils/popups";
import { motion } from "framer-motion";
import { triggerConfetti } from "@/lib/utils";

const MovieDialogue = ({ params }) => {
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [guessText, setGuessText] = useState("");
  const [currentData, setCurrentData] = useState();
  const [hiddenPartLength, setHiddenPartLength] = useState();
  const [movieName, setMovieName] = useState();
  const [guessFeedback, setGuessFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const movieIndexString = params.id.substring(RANDOM_URL_PREFIX.length);
  const movieIndex = stringToNumber(movieIndexString);

  const movieUrl = BOLLYWOOD_GAME_URL + "/complete-dialogue/" + params.id;

  useEffect(() => {
    const currentData = bollywoodMovieCompleteDialogue[movieIndex];
    const hiddenPartLength = currentData.hiddenPart.length;
    const movieName = currentData.name;
    setCurrentData(currentData);
    setHiddenPartLength(hiddenPartLength);
    setMovieName(movieName);
    setLoading(false);
  }, []);

  const guess = () => {
    toast.dismiss();

    const hiddenPart = currentData.hiddenPart.toLowerCase();
    const userGuess = guessText.toLowerCase();
    const distance = levenshtein.get(userGuess, hiddenPart);
    const similarityThreshold = Math.floor(hiddenPart.length * 0.5);

    if (distance === 0) {
      setGameCompleted(true);
      showGameCompletedDialog(numberOfGuesses + 1);
      triggerConfetti();
    } else if (numberOfGuesses + 1 === GUESSES_ALLOWED) {
      toast(
        "You've reached the maximum number of guesses. Better luck next time!"
      );
      markGameCompleted();
      setGuessFeedback([]);
    } else if (distance <= similarityThreshold) {
      toast("Almost there! Your guess is very close. Try again!");
      setGuessFeedback(
        userGuess.split("").map((char, index) =>
          hiddenPart[index] === char ? (
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
      toast(INCORRECT_GUESS_MESSAGE);
      setGuessFeedback([]);
    }
    setNumberOfGuesses((prev) => prev + 1);
  };

  const showGameCompletedDialog = (guesses) => {
    let title;

    if (guesses === 1) {
      title = `You completed the dialogue in just 1 guess!!! Amazing! Challenge your friends now.`;
    } else if (guesses < 4) {
      title = `You completed the dialogue in just ${guesses} guesses!!! Great job! Challenge your friends now.`;
    } else if (numberOfGuesses + 1 === GUESSES_ALLOWED) {
      toast(
        "You've reached the maximum number of guesses. Better luck next time!"
      );
      setGameCompleted(true);
    } else {
      title = `You completely the dialogue correctly in ${guesses} guesses! Challenge your friends now.`;
    }
    gameCompletedPopup(
      title,
      movieUrl,
      DIALOGUE_COMPLETED_DESCRIPTION(movieName, guesses)
    );
  };

  const markGameCompleted = () => {
    setGameCompleted(true);
    if (inputRef.current) {
      inputRef.current.innerHTML = currentData.hiddenPart;
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInput = (e) => {
    const text = e.target.innerText;
    setGuessText(text);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
    const text = inputRef.current.textContent;
    if (
      text.length >= hiddenPartLength &&
      event.key !== "Backspace" &&
      event.key !== "Delete"
    ) {
      event.preventDefault();
    }
  };

  const renderUnderlines = () => {
    let charIndex = 0;

    return currentData.hiddenPart.split(" ").map((word, wordIndex) => (
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
    <div className="flex flex-col bg-bg p-4 justify-center items-center rounded-lg shadow-md mt-12 mx-8">
      <span className="md:text-3xl text-xl text-black font-semibold text-center max-w-xl mb-4">
        Complete the dialogue from the movie.
      </span>
      {loading ? (
        <>
          <div className="justify-center text-center text-text text-2xl">
            <span className="font-bold">
              Movie : <span className="font-normal"></span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                className="md:h-[150px] md:w-[350px] h-[75px] w-[175px] relative bg-gray-300 animate-pulse"
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 border-t">
          <Toaster />
          <div className="flex flex-col gap-4 mt-4">
            <div className="justify-center text-center text-text text-2xl">
              <span className="font-bold">
                Movie : <span className="font-normal"> {movieName}</span>
              </span>
            </div>
            <div className="text-text max-w-xl text-center border p-5 border-textSoft">
              <span className="text-4xl italic text-textSoft">
                &ldquo; {currentData.dialogue}{" "}
              </span>
              <div
                ref={inputRef}
                contentEditable
                className="inline-block text-4xl italic text-text border-b-2 border-textSoft bg-transparent outline-none"
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                spellCheck="false"
                style={{
                  minWidth: "50px",
                  display: "inline-block",
                  verticalAlign: "bottom",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              ></div>
              <span className="text-4xl italic text-textSoft">&rdquo;</span>
              {!gameCompleted && (
                <div className="text-sm mt-2 text-textSoft">
                  {guessText.length}/{hiddenPartLength} characters
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 items-center">
              {!gameCompleted && (
                <div className="flex flex-col items-center justify-center gap-4">
                  <div
                    className={`flex gap-1 items-center justify-center ${
                      gameCompleted ? "invisible" : ""
                    }`}
                  >
                    {renderUnderlines()}
                  </div>
                  {guessFeedback.length > 0 && (
                    <div className="text-sm w-full">
                      {guessFeedback} is very close.
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-10">
                    <motion.button
                      onClick={guess}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-md md:text-md bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
                    >
                      Guess
                    </motion.button>
                    <div>
                      <p className="text-md md:text-md text-textSoft">
                        Guesses: {numberOfGuesses}/{GUESSES_ALLOWED}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-center gap-10 md:text-md text-md">
                <motion.button
                  onClick={() =>
                    challengeFriendPopup(
                      movieUrl,
                      COMPLETE_DIALOGUE_DESCRIPTION(movieName)
                    )
                  }
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
                >
                  Share
                </motion.button>
                {!gameCompleted && (
                  <motion.button
                    onClick={() => giveUp(markGameCompleted)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-giveUpButton hover:bg-giveUpButtonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
                  >
                    Give Up
                  </motion.button>
                )}
                <motion.button
                  onClick={() =>
                    nextMovie(
                      router,
                      bollywoodMovieCompleteDialogue,
                      COMPLETE_DIALOGUE_URL
                    )
                  }
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
                >
                  {gameCompleted ? "Next" : "Skip"}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDialogue;
