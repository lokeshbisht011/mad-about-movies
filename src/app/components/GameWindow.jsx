import React, { useEffect, useState } from "react";

import Image from "next/image";
import socket from "../utils/socket";
import { extractIdFromUrl } from "../utils/utils";
import { INCORRECT_GUESS_MESSAGE, PREFIX } from "../utils/constants";
import levenshtein from "fast-levenshtein";
import toast from "react-hot-toast";
import MultiplayerMovieScene from "./MultiplayerMovieScene";
import MultiplayerMovieDialogue from "./MultiplayerMovieDialogue";
import MultiplayerCompleteMovieDialogue from "./MultiplayerCompleteMovieDialogue";
import UserGuess from "./UserGuess";

const GameWindow = ({ room, roomId, isOwner }) => {
  const [gameType, setGameType] = useState(room ? room.gameType : "scene");
  const [loading, setLoading] = useState(false);
  const [guessTime, setGuessTime] = useState(room ? room.guessTime : 30);
  const [rounds, setRounds] = useState(room ? room.rounds : 3);

  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [countdown, setCountdown] = useState(1);
  const [showCountdown, setShowCountdown] = useState(true);
  const [round, setRound] = useState();
  const [image, setImage] = useState();
  const [dialogue, setDialogue] = useState();

  useEffect(() => {
    if (room) {
      setGameType(room.gameType);
    }

    if (room.rounds[room.roundNumber - 1]?.startTime) {
      const currentRound = room.rounds[room.roundNumber - 1];
      const startTime = currentRound.startTime;
      const duration = currentRound.duration;
      setEndTime(startTime + duration);
      setRound(room.roundNumber);
      setAnswer(currentRound.movieName.toLowerCase());
      if (gameType === "complete") {
        setAnswer(currentRound.hiddenPart.toLowerCase());
      }
      const id = extractIdFromUrl(currentRound.image);
      setImage(PREFIX + id);
      setDialogue(currentRound.dialogue)
    }
  }, [room]);

  useEffect(() => {
    if (showCountdown) {
      const countdownInterval = setInterval(() => {
        if (countdown > 0) {
          setCountdown((prevCountdown) => prevCountdown - 1);
        } else {
          setShowCountdown(false);
          clearInterval(countdownInterval);
        }
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [countdown, showCountdown]);

  useEffect(() => {
    if (!showCountdown && !loading) {
      const intervalId = setInterval(() => {
        if (endTime) {
          const timeLeft = Math.max(
            0,
            Math.floor((endTime - Date.now()) / 1000)
          );
          setTimer(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(intervalId);
            if (isOwner) {
              socket.emit("round-ended", roomId);
            }
          }
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [endTime, showCountdown, loading]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative">
      {showCountdown && (
        <div className="absolute inset-0 flex items-center justify-center bg-black ">
          <div className="text-center text-3xl font-bold text-white">
            {countdown > 0 ? countdown : "Go!"}
          </div>
        </div>
      )}
      <div className="">
        <div className="flex items-center justify-center gap-12 mt-4">
          <div className="flex items-center gap-2">
            <label className="text-lg font-medium">Time:</label>
            <span className="text-xl font-bold">
              {showCountdown ? countdown : timer}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-lg font-medium">Round:</label>
            <span className="text-xl font-bold">{round}</span>
          </div>
        </div>
        {gameType === "scene" && (
          <MultiplayerMovieScene handleImageLoad={handleImageLoad} image={image} />
        )}
        {gameType === "dialogue" && (
          <MultiplayerMovieDialogue dialogue={dialogue} />
        )}
        {gameType === "complete" && (
          <MultiplayerCompleteMovieDialogue dialogue={dialogue} />
        )}
        <UserGuess answer={answer} roomId={roomId} timer={timer} />
      </div>
    </div>
  );
};

export default GameWindow;
