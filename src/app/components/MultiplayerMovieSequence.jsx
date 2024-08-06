"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isMobile } from "react-device-detect";
import toast, { Toaster } from "react-hot-toast";
import CustomImage from "./CustomImage";
import CustomDragLayer from "./CustomDragLayer";
import { INCORRECT_SEQUENCE_GUESS_MESSAGE, PREFIX } from "../utils/constants";
import { extractIdFromUrl } from "../utils/utils";
import socket from "../utils/socket";

const MultiplayerMovieSequence = ({ images, movieName, roomId, timer, currentRound }) => {
  const [myImages, setMyImages] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const moveImage = (dragIndex, hoverIndex) => {
    const newImages = [...myImages];
    const draggedImage = newImages[dragIndex];

    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, draggedImage);

    setMyImages(newImages);
  };

  const guess = () => {
    toast.dismiss();
    var lastCorrectIndex = 0;

    for (let i = 0; i < myImages.length; i++) {
      if (myImages[i].correctIndex === i) {
        lastCorrectIndex++;
      } else {
        break;
      }
    }

    setCorrectIndex(lastCorrectIndex);

    if (lastCorrectIndex == 6) {
      setGameCompleted(true);
      socket.emit("answer-guessed", roomId, timer, currentRound);
    } else if (lastCorrectIndex > 0) {
      toast(`You guessed ${lastCorrectIndex} image(s) correctly! Keep going!`);
    } else {
      toast(INCORRECT_SEQUENCE_GUESS_MESSAGE);
    }
  };

  useEffect(() => {
    if (images) {
      const transformedImages = images.map((image) => {
        const id = extractIdFromUrl(image.url);
        return {
          ...image,
          url: PREFIX + id,
        };
      });
      setMyImages(transformedImages);
      setCorrectIndex(0)
      setGameCompleted(false)
    }
  }, [images])

  return (
    <div className="flex flex-col gap-5 p-2 items-center justify-center border rounded-lg shadow-lg">
      <div className="justify-center text-center text-text md:text-2xl text-xl">
        <span className="">Movie : {movieName}</span>
      </div>
      <Toaster />
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <CustomDragLayer className={"md:h-[80px] md:w-[200px] h-[70px] w-[160px]"} />
        <div className="grid grid-cols-2 md:gap-8 gap-4">
          {myImages && myImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="md:h-[80px] md:w-[200px] h-[70px] w-[160px] relative"
            >
              {index >= correctIndex ? (
                <CustomImage
                  src={image.url}
                  index={index}
                  moveImage={moveImage}
                  className={"md:h-[80px] md:w-[200px] h-[70px] w-[160px]"}
                />
              ) : (
                <Image
                  src={image.url}
                  alt=""
                  fill
                  className="object-cover md:border-4 border-2 border-green-500"
                />
                
              )}
            </motion.div>
          ))}
        </div>
      </DndProvider>
      {!gameCompleted && (
        <div className="flex items-center justify-center gap-10 mb-4">
          <motion.button
            onClick={() => {
              guess();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:text-md text-sm bg-gray-500 hover:bg-gray-400 text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
          >
            Guess
          </motion.button>
          <div>
            <p className="md:text-md text-sm text-textSoft">
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiplayerMovieSequence;
