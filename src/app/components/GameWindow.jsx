import React, { useEffect, useRef, useState } from "react";

import socket from "../utils/socket";
import { extractIdFromUrl } from "../utils/utils";
import { INCORRECT_GUESS_MESSAGE, PREFIX } from "../utils/constants";
import MultiplayerMovieScene from "./MultiplayerMovieScene";
import MultiplayerMovieDialogue from "./MultiplayerMovieDialogue";
import MultiplayerCompleteMovieDialogue from "./MultiplayerCompleteMovieDialogue";
import UserGuess from "./UserGuess";
import { motion, AnimatePresence } from "framer-motion";

const GameWindow = ({ room, roomId, isOwner }) => {
  const [gameType, setGameType] = useState(room ? room.gameType : "scene");
  const [loading, setLoading] = useState(false);
  const [guessTime, setGuessTime] = useState(room ? room.guessTime : 15);
  const [rounds, setRounds] = useState(room ? room.rounds : 5);

  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(0);
  // const [endTime, setEndTime] = useState(0);

  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(true);

  const [round, setRound] = useState();
  const [image, setImage] = useState();
  const [dialogue, setDialogue] = useState();

  const gameTimerIntervalIdRef = useRef(null);
  const countDownTimerIntervalIdRef = useRef(null);
  const roundEndedRef = useRef(false);


  useEffect(() => {
    setCountdown(3);
    setShowCountdown(true);
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 1) {
          return prevCountdown - 1;
        } else {
          setShowCountdown(false);
          // clearInterval(countDownTimerIntervalIdRef.current);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [round]);

  useEffect(() => {
    if (!showCountdown) {
      setTimer(guessTime);
      // Timer logic for the main game
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          console.log(prevTimer);
          if (prevTimer > 1) {
            return prevTimer - 1;
          } else {
            // clearInterval(gameTimerIntervalIdRef.current);
            handleRoundEnd();
            return 0;
          }
        });
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [showCountdown]);

  // const startGameTimer = () => {
  //   if (gameTimerIntervalIdRef.current) {
  //     clearInterval(gameTimerIntervalIdRef.current);
  //   }

  //   gameTimerIntervalIdRef.current = setInterval(() => {
  //     setTimer((prevTimer) => {
  //       console.log(prevTimer);
  //       if (prevTimer > 1) {
  //         return prevTimer - 1;
  //       } else {
  //         clearInterval(gameTimerIntervalIdRef.current);
  //         handleRoundEnd();
  //         return 0;
  //       }
  //     });
  //   }, 1000);
  // };

  // const startCountdownTimer = () => {
  //   if (countDownTimerIntervalIdRef.current) {
  //     clearInterval(countDownTimerIntervalIdRef.current);
  //   }

  //   countDownTimerIntervalIdRef.current = setInterval(() => {
  //     setCountdown((prevCountdown) => {
  //       if (prevCountdown > 1) {
  //         return prevCountdown - 1;
  //       } else {
  //         setShowCountdown(false);
  //         clearInterval(countDownTimerIntervalIdRef.current);
  //         return 0;
  //       }
  //     });
  //   }, 1000);
  // };

  // const stopGameTimer = () => {
  //   if (gameTimerIntervalIdRef.current) {
  //     clearInterval(gameTimerIntervalIdRef.current);
  //   }
  // };

  // const stopCountdownTimer = () => {
  //   if (countDownTimerIntervalIdRef.current) {
  //     clearInterval(countDownTimerIntervalIdRef.current);
  //   }
  // };

  // useEffect(() => {
  //   return () => {
  //     stopGameTimer();
  //     stopCountdownTimer();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!showCountdown) {
  //     setTimer(guessTime);
  //     startGameTimer();
  //   }
  // }, [showCountdown]);

  // useEffect(() => {
  //   setCountdown(3);
  //   setShowCountdown(true);
  //   startCountdownTimer();
  // }, [round]);

  useEffect(() => {
    if (room) {
      setGameType(room.gameType);
    }

    if (room.rounds[room.roundNumber - 1]?.startTime) {
      const currentRound = room.rounds[room.roundNumber - 1];
      // const startTime = currentRound.startTime;
      // const duration = currentRound.duration;
      // setEndTime(startTime + duration);
      setRound(room.roundNumber);
      setAnswer(currentRound.movieName.toLowerCase());
      if (gameType === "complete") {
        setAnswer(currentRound.hiddenPart.toLowerCase());
      }
      const id = extractIdFromUrl(currentRound.image);
      setImage(PREFIX + id);
      setDialogue(currentRound.dialogue);
      roundEndedRef.current = false; // Reset the round ended ref

    }
  }, [room]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleRoundEnd = () => {
    if (!roundEndedRef.current && isOwner) {
      socket.emit("round-ended", roomId);
      roundEndedRef.current = true; // Mark the round as ended
    }

  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showCountdown && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-500  z-50"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="text-center text-3xl font-bold text-white">
              {countdown}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {true && (
        <div className="">
          <div className="flex items-center justify-center gap-12 mt-4">
            <div className="flex items-center gap-2">
              <label className="text-lg font-medium">Time:</label>
              <span className="text-xl font-bold">{timer}</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-lg font-medium">Round:</label>
              <span className="text-xl font-bold">{round}</span>
            </div>
          </div>
          {gameType === "scene" && (
            <MultiplayerMovieScene
              handleImageLoad={handleImageLoad}
              image={image}
            />
          )}
          {gameType === "dialogue" && (
            <MultiplayerMovieDialogue dialogue={dialogue} />
          )}
          {gameType === "complete" && (
            <MultiplayerCompleteMovieDialogue dialogue={dialogue} />
          )}
          <UserGuess answer={answer} roomId={roomId} timer={timer} />
        </div>
      )}
    </div>
  );
};

export default GameWindow;
