"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bollywoodMovieScenes from "/public/bollywoodMovieScenes.json";
import toast, { Toaster } from "react-hot-toast";
import { extractIdFromUrl, nextMovie, stringToNumber } from "../utils/utils";
import {
  PREFIX,
  BOLLYWOOD_GAME_URL,
  RANDOM_URL_PREFIX,
  GUESSES_ALLOWED,
  SCENE_DESCRIPTION,
  SCENE_URL,
  INCORRECT_GUESS_MESSAGE,
  SCENE_GUESSED_DESCRIPTION,
} from "../utils/constants";
import { useRouter } from "next/navigation";
import levenshtein from "fast-levenshtein";
import {
  challengeFriendPopup,
  gameCompletedPopup,
  giveUp,
} from "../utils/popups";
import { triggerConfetti } from "@/lib/utils";
import soundEffectsManager from "@/lib/soundManager";

const MovieScene = ({ params }) => {
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [guessText, setGuessText] = useState("");
  const [currentData, setCurrentData] = useState();
  const [movieNameLength, setMovieNameLength] = useState();
  const [sceneUrl, setSceneUrl] = useState();
  const [guessFeedback, setGuessFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  const router = useRouter();

  const movieIndexString = params.id.substring(RANDOM_URL_PREFIX.length);
  const movieIndex = stringToNumber(movieIndexString);

  const movieUrl = BOLLYWOOD_GAME_URL + "/scene/" + params.id;

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  useEffect(() => {
    const currentData = bollywoodMovieScenes[movieIndex];
    const movieNameLength = currentData.name.length;
    const id = extractIdFromUrl(currentData.image);
    const sceneUrl = PREFIX + id;

    setCurrentData(currentData);
    setMovieNameLength(movieNameLength);
    setSceneUrl(sceneUrl);
    setLoading(false);
  }, []);

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
      soundEffectsManager.playSound("right");
      markGameCompleted();
      showGameCompletedDialog(numberOfGuesses + 1);
      triggerConfetti();
    } else if (numberOfGuesses + 1 === GUESSES_ALLOWED) {
      soundEffectsManager.playSound("failed");
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
      soundEffectsManager.playSound("wrong");
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
    } else {
      title = `You guessed the movie correctly in ${guesses} guesses! Challenge your friends now.`;
    }
    gameCompletedPopup(title, movieUrl, SCENE_GUESSED_DESCRIPTION(guesses));
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
    <div className="flex flex-col bg-bg gap-5 p-4 justify-center items-center rounded-lg shadow-md mt-12 mx-8">
      <span className="md:text-3xl text-xl text-black font-semibold text-center max-w-xl">
        Guess the name of the movie from the scene.
      </span>
      {loading ? (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:h-[250px] md:w-[650px] h-[140px] w-[350px] relative border-4 border-green-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          </motion.div>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:h-[250px] md:w-[650px] h-[140px] w-[350px] relative border-4 border-green-500"
          >
            {imageLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
            )}
            <Image
              src={sceneUrl}
              alt=""
              fill
              className="object-cover"
              onLoad={handleImageLoad}
            />
          </motion.div>
          {gameCompleted && (
            <div className="justify-center text-center text-text text-2xl">
              <span className="font-bold">
                Movie : <span className="font-normal">{currentData.name}</span>
              </span>
            </div>
          )}
          <div className="flex flex-col gap-4 items-center">
            {!gameCompleted && (
              <div className="flex flex-col gap-4 min-w-[18rem] md:min-w-[30rem]">
                <div
                  className={`flex flex-wrap gap-1 items-center justify-center ${
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
                    onChange={(e) => setGuessText(e.target.value)}
                    maxLength={movieNameLength}
                  />
                  <div className="text-sm mt-2 text-right text-textSoft">
                    {guessText.length}/{movieNameLength} characters
                  </div>
                </div>
                <div className="flex items-center justify-center gap-10">
                  <button
                    onClick={guess}
                    className="md:text-md text-md bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
                  >
                    Guess
                  </button>
                  <div>
                    <p className="md:text-md text-md text-textSoft">
                      Guesses: {numberOfGuesses}/{GUESSES_ALLOWED}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-center gap-8 md:text-md text-md">
              <motion.button
                onClick={() => {
                  soundEffectsManager.playSound("click");
                  challengeFriendPopup(movieUrl, SCENE_DESCRIPTION);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
              >
                Share
              </motion.button>
              {!gameCompleted && (
                <motion.button
                  onClick={() => {
                    soundEffectsManager.playSound("click");
                    giveUp(markGameCompleted);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-giveUpButton hover:bg-giveUpButtonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
                >
                  Give Up
                </motion.button>
              )}
              <motion.button
                onClick={() => {
                  soundEffectsManager.playSound("click");
                  nextMovie(router, bollywoodMovieScenes, SCENE_URL);
                }}
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

export default MovieScene;
