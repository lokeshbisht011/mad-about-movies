"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isMobile } from "react-device-detect";
import { derangements } from "../utils/derangements";
import bollywoodMovies from "/public/bollywoodMovies.json";
import toast, { Toaster } from "react-hot-toast";
import { extractIdFromUrl, nextMovie, stringToNumber } from "../utils/utils";
import CustomImage from "./CustomImage";
import {
  PREFIX,
  BOLLYWOOD_GAME_URL,
  RANDOM_URL_PREFIX,
  GUESSES_ALLOWED,
  SEQUENCE_DESCRIPTION,
  SEQUENCE_URL,
  INCORRECT_SEQUENCE_GUESS_MESSAGE,
  SEQUENCE_COMPLETED_DESCRIPTION,
} from "../utils/constants";
import CustomDragLayer from "./CustomDragLayer";
import { useRouter } from "next/navigation";
import {
  challengeFriendPopup,
  gameCompletedPopup,
  giveUp,
} from "../utils/popups";
import { triggerConfetti } from "@/lib/utils";

const MovieSequence = ({ params }) => {
  const router = useRouter();

  const movieIndexString = params.id.substring(RANDOM_URL_PREFIX.length);
  const movieIndex = stringToNumber(movieIndexString);

  const movieUrl = BOLLYWOOD_GAME_URL + "/sequence/" + params.id;

  const setRandomMovie = (currentData) => {
    const allImages = Object.entries(currentData)
      .filter(([key, value]) => key.startsWith("image"))
      .map(([key, value]) => {
        const id = extractIdFromUrl(value);
        return {
          src: `${PREFIX}${id}`,
          correctIndex: parseInt(key.slice(-1)) - 1,
        };
      });

    const setNewImages = (order) => {
      const newImages = Array(allImages.length).fill(null);
      order.forEach((index, i) => {
        newImages[index] = allImages[i];
      });
      setImages(newImages);
    };

    const randomIndex = Math.floor(Math.random() * derangements.length);
    setNewImages(derangements[randomIndex]);
  };

  const [images, setImages] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [movieName, setMovieName] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentData = bollywoodMovies[movieIndex];
    setMovieName(currentData.name);
    setRandomMovie(currentData);
    setLoading(false);
  }, []);

  const moveImage = (dragIndex, hoverIndex) => {
    const newImages = [...images];
    const draggedImage = newImages[dragIndex];

    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, draggedImage);

    setImages(newImages);
  };

  const guess = () => {
    toast.dismiss();
    var lastCorrectIndex = 0;

    for (let i = 0; i < images.length; i++) {
      if (images[i].correctIndex === i) {
        lastCorrectIndex++;
      } else {
        break;
      }
    }

    setCorrectIndex(lastCorrectIndex);

    if (lastCorrectIndex == 6) {
      setGameCompleted(true);
      showGameCompletedDialog(numberOfGuesses + 1);
      triggerConfetti()
    } else if (lastCorrectIndex > 0) {
      toast(`You guessed ${lastCorrectIndex} image(s) correctly! Keep going!`);
    } else if (numberOfGuesses + 1 === GUESSES_ALLOWED) {
      toast(
        "You've reached the maximum number of guesses. Better luck next time!"
      );
      markGameCompleted();
    } else {
      toast(INCORRECT_SEQUENCE_GUESS_MESSAGE);
    }
    setNumberOfGuesses((prev) => prev + 1);
  };

  const showGameCompletedDialog = (guesses) => {
    let title;

    if (guesses === 1) {
      title = `You guessed the sequence correctly in just 1 guess!!! Amazing! Challenge your friends now.`;
    } else if (guesses < 4) {
      title = `You guessed the sequence correctly in just ${guesses} guesses!!! Great job! Challenge your friends now.`;
    } else {
      title = `You guessed the sequence correctly in ${guesses} guesses! Challenge your friends now.`;
    }
    gameCompletedPopup(
      title,
      movieUrl,
      SEQUENCE_COMPLETED_DESCRIPTION(movieName, guesses)
    );
  };

  const markGameCompleted = () => {
    setCorrectIndex(6);
    setGameCompleted(true);
    setImages((images) => {
      const sortedImages = [...images].sort(
        (a, b) => a.correctIndex - b.correctIndex
      );
      return sortedImages.map((image, index) => ({
        ...image,
        correctIndex: index,
      }));
    });
  };

  return (
    <div className="flex flex-col bg-bg p-4 justify-center items-center rounded-lg shadow-md md:mt-4 mt-8">
      <span className="md:text-3xl text-xl text-black font-semibold text-center max-w-xl mb-4">
        Arrange the scenes from the movie into the correct order.
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
          <div className="justify-center text-center text-text text-2xl mt-4">
            <span className="font-bold">
              Movie : <span className="font-normal"> {movieName}</span>
            </span>
          </div>
          <Toaster />
          <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
            <CustomDragLayer className={"md:h-[150px] md:w-[350px] h-[75px] w-[175px]"} />
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="md:h-[150px] md:w-[350px] h-[75px] w-[175px] relative"
                >
                  {index >= correctIndex ? (
                    <CustomImage
                      src={image.src}
                      index={index}
                      moveImage={moveImage}
                      className={"md:h-[150px] md:w-[350px] h-[75px] w-[175px]"}
                    />
                  ) : (
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      className="object-cover border-4 border-green-500"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </DndProvider>
          {!gameCompleted && (
            <div className="flex items-center justify-center gap-10">
              <motion.button
                onClick={() => {
                  guess();
                  setNumberOfGuesses(numberOfGuesses + 1);
                }}
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
          )}
          <div className="flex items-center justify-center gap-10 md:text-md text-md">
            <motion.button
              onClick={() =>
                challengeFriendPopup(movieUrl, SEQUENCE_DESCRIPTION(movieName))
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
              onClick={() => nextMovie(router, bollywoodMovies, SEQUENCE_URL)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
            >
              {gameCompleted ? "Next" : "Skip"}
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSequence;
