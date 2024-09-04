"use client";

import React, { useEffect, useState } from "react";
import bollywoodMovieDialogues from "../../../public/bollywoodMovieDialogues.json";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  BOLLYWOOD_GAME_URL,
  DIALOGUE_DESCRIPTION,
  DIALOGUE_GUESSED_DESCRIPTION,
  DIALOGUE_URL,
  GUESSES_ALLOWED,
  INCORRECT_GUESS_MESSAGE,
  RANDOM_URL_PREFIX,
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
  const [currentData, setCurrentData] = useState();
  const [movieNameLength, setMovieNameLength] = useState();
  const [gameCompleted, setGameCompleted] = useState(false);
  const [guessText, setGuessText] = useState("");
  const [guessFeedback, setGuessFeedback] = useState([]);

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const movieIndexString = params.id.substring(RANDOM_URL_PREFIX.length);
  const movieIndex = stringToNumber(movieIndexString);

  useEffect(() => {
    const currentData = bollywoodMovieDialogues[movieIndex];
    const movieNameLength = currentData.name.length;
    setCurrentData(currentData);
    setMovieNameLength(movieNameLength);
    setLoading(false);
  }, []);

  const movieUrl = BOLLYWOOD_GAME_URL + "/dialogue/" + params.id;

  const markGameCompleted = () => {
    setGameCompleted(true);
  };

  const guess = () => {
    toast.dismiss();

    const actualMovieName = currentData.name.toLowerCase();
    const userGuess = guessText.toLowerCase();
    const distance = levenshtein.get(userGuess, actualMovieName);
    const similarityThreshold = Math.floor(actualMovieName.length * 0.3);

    if (distance === 0) {
      markGameCompleted();
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
          actualMovieName[index] === char ? (
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
      title = `You guessed the movie correctly in just 1 guess!!! Amazing! Challenge your friends now.`;
    } else if (guesses < 4) {
      title = `You guessed the movie correctly in just ${guesses} guesses!!! Great job! Challenge your friends now.`;
    } else if (numberOfGuesses + 1 === GUESSES_ALLOWED) {
      toast(
        "You've reached the maximum number of guesses. Better luck next time!"
      );
      markGameCompleted();
    } else {
      title = `You guessed the movie correctly in ${guesses} guesses! Challenge your friends now.`;
    }
    gameCompletedPopup(title, movieUrl, DIALOGUE_GUESSED_DESCRIPTION(guesses));
  };

  const renderUnderlines = () => {
    let charIndex = 0;

    return currentData.name.split(" ").map((word, wordIndex) => (
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
    <div className="flex flex-col bg-bg p-4 justify-center items-center rounded-lg shadow-md md:mt-4 mt-8">
      <span className="md:text-3xl text-xl text-black font-semibold text-center max-w-xl mb-4">
        Guess the name of the movie from the dialogue.
      </span>
      {loading ? (
        <>
          <div className="md:h-[250px] md:w-[650px] h-[140px] w-[350px]"></div>
          <div className="flex flex-col gap-5 items-center">
            <div className="flex flex-col gap-5 min-w-[18rem] md:min-w-[30rem]">
              <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="text-sm mt-2 text-right text-textSoft h-5 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="flex items-center justify-center gap-10">
              <div className="bg-gray-200 h-10 w-24 md:w-32 rounded-md animate-pulse"></div>
              <div className="bg-gray-200 h-10 w-24 md:w-32 rounded-md animate-pulse"></div>
              <div className="bg-gray-200 h-10 w-24 md:w-32 rounded-md animate-pulse"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <Toaster />
          <div className="max-w-xl text-center border p-5 border-textSoft">
            <span className="text-3xl md:text-4xl italic text-textSoft">
              &ldquo; {currentData.dialogue} &rdquo;
            </span>
          </div>
          {gameCompleted && (
            <div className="justify-center text-center text-text text-2xl">
              <span className="font-bold">
                Movie : <span className="font-normal">{currentData.name}</span>
              </span>
            </div>
          )}
          <div className="flex flex-col gap-5 items-center">
            {!gameCompleted && (
              <div className="flex flex-col gap-5 md:min-w-[30rem] min-w-[20rem]">
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
                <div className="">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Your guess..."
                    value={guessText}
                    maxLength={movieNameLength}
                    onChange={(e) => setGuessText(e.target.value)}
                  />
                  <div className="text-sm mt-2 text-right text-textSoft">
                    {guessText.length}/{movieNameLength} characters
                  </div>
                </div>
                <div className="flex items-center justify-center gap-10">
                  <motion.button
                    onClick={guess}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="md:text-md text-md bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
                  >
                    Guess
                  </motion.button>
                  <div>
                    <p className="md:text-md text-md text-textSoft">
                      Guesses: {numberOfGuesses}/{GUESSES_ALLOWED}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-center gap-10 md:text-md text-md">
              <motion.button
                onClick={() =>
                  challengeFriendPopup(movieUrl, DIALOGUE_DESCRIPTION)
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
                  nextMovie(router, bollywoodMovieDialogues, DIALOGUE_URL)
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
      )}
    </div>
  );
};

export default MovieDialogue;
