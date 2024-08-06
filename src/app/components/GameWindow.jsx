import React, { useEffect, useRef, useState } from "react";

import socket from "../utils/socket";
import { extractIdFromUrl } from "../utils/utils";
import { PREFIX } from "../utils/constants";
import MultiplayerMovieScene from "./MultiplayerMovieScene";
import MultiplayerMovieDialogue from "./MultiplayerMovieDialogue";
import MultiplayerCompleteMovieDialogue from "./MultiplayerCompleteMovieDialogue";
import UserGuess from "./UserGuess";
import { motion, AnimatePresence } from "framer-motion";
import MultiplayerMovieSequence from "./MultiplayerMovieSequence";
import GameEndScreen from "./GameEndOverlay";
import CountdownOverlay from "./CountdownOverlay";

const GameWindow = ({ room, roomId, isOwner }) => {
  const [gameType, setGameType] = useState(
    room ? room.gameType : "Arrange the Scenes"
  );
  const [guessTime, setGuessTime] = useState(room ? room.guessTime : 15);
  const [rounds, setRounds] = useState(room ? room.rounds : []);
  const [currentRound, setCurrentRound] = useState(0);
  const [playerUpdates, setPlayerUpdates] = useState([]);

  const [answer, setAnswer] = useState("");
  const [previousAnswer, setPreviousAnswer] = useState("");

  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(true);

  const [showGameEndScreen, setshowGameEndScreen] = useState(false);
  const [winningPlayers, setWinningPlayers] = useState([]);

  const [image, setImage] = useState();
  const [images, setImages] = useState();
  const [dialogue, setDialogue] = useState();

  const gameTimerIntervalIdRef = useRef(null);
  const countDownTimerIntervalIdRef = useRef(null);
  const gameEndTimerIntervalIdRef = useRef(null);

  const hasStartedGameRef = useRef(false);
  const hasRoundIncreasedRef = useRef(false);
  const countdownTime = 3;

  const startGameTimer = (time) => {
    setTimer(time);
    if (gameTimerIntervalIdRef.current) {
      clearInterval(gameTimerIntervalIdRef.current);
    }

    gameTimerIntervalIdRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        } else {
          clearInterval(gameTimerIntervalIdRef.current);
          handleRoundEnd();
          return 0;
        }
      });
    }, 1000);
  };

  const startCountdownTimer = (time) => {
    setCountdown(time);
    if (countDownTimerIntervalIdRef.current) {
      clearInterval(countDownTimerIntervalIdRef.current);
    }

    countDownTimerIntervalIdRef.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 1) {
          return prevCountdown - 1;
        } else {
          setPlayerUpdates([]);
          setShowCountdown(false);
          clearInterval(countDownTimerIntervalIdRef.current);
          startGameTimer(guessTime);
          return 0;
        }
      });
    }, 1000);
  };

  const startGameEndTimer = (time) => {
    setCountdown(time);
    if (gameEndTimerIntervalIdRef.current) {
      clearInterval(gameEndTimerIntervalIdRef.current);
    }

    gameEndTimerIntervalIdRef.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 1) {
          return prevCountdown - 1;
        } else {
          if (isOwner) {
            socket.emit("game-ended", roomId);
          }
          return 0;
        }
      });
    }, 1000);
  };

  const stopGameTimer = () => {
    if (gameTimerIntervalIdRef.current) {
      clearInterval(gameTimerIntervalIdRef.current);
    }
  };

  const stopCountdownTimer = () => {
    if (countDownTimerIntervalIdRef.current) {
      clearInterval(countDownTimerIntervalIdRef.current);
    }
  };

  const stopGameEndTimer = () => {
    if (gameEndTimerIntervalIdRef.current) {
      clearInterval(gameEndTimerIntervalIdRef.current);
    }
  };

  useEffect(() => {
    const handlePlayerUpdates = (data) => {
      setPlayerUpdates((prevUpdates) => {
        const existingPlayer = prevUpdates.find(
          (update) => update.socketId === data.socketId
        );

        if (existingPlayer) {
          return prevUpdates.map((update) =>
            update.socketId === data.socketId
              ? { ...update, scoreIncrement: data.scoreIncrement }
              : update
          );
        } else {
          return [
            ...prevUpdates,
            {
              ...data,
              playerName:
                room.players.find((player) => player.id === data.socketId)
                  ?.name || "",
              scoreIncrement: data.scoreIncrement || 0,
            },
          ];
        }
      });
    };

    socket.on("player-updates", handlePlayerUpdates);

    return () => {
      socket.off("player-updates", handlePlayerUpdates);
    };
  }, []);

  useEffect(() => {
    return () => {
      stopGameTimer();
      stopCountdownTimer();
      stopGameEndTimer();
    };
  }, []);

  useEffect(() => {
    if (room && !hasStartedGameRef.current) {
      hasStartedGameRef.current = true;
      setCurrentRound((prev) => prev + 1);
    }
  }, [room]);

  useEffect(() => {
    if (currentRound >= 1) {
      const currentRoundDetails = rounds[currentRound - 1];
      setPreviousAnswer(answer);
      setAnswer(currentRoundDetails.movieName);
      if (gameType === "Complete the Dialogue") {
        setAnswer(currentRoundDetails.hiddenPart);
      }
      const id = extractIdFromUrl(currentRoundDetails.image);
      console.log("asfsadf");
      console.log(currentRoundDetails.images);
      setImages(currentRoundDetails.images);
      setImage(PREFIX + id);
      setDialogue(currentRoundDetails.dialogue);
      setShowCountdown(true);
      startCountdownTimer(countdownTime);
      hasRoundIncreasedRef.current = false;
    }
  }, [currentRound]);

  const handleRoundEnd = () => {
    if (isOwner) {
      socket.emit("round-ended", roomId);
    }
    if (currentRound >= room.totalRounds) {
      handleGameEnd();
    } else if (!hasRoundIncreasedRef.current) {
      updatePlayerScoreIncrement();
      setCurrentRound((prev) => prev + 1);
      hasRoundIncreasedRef.current = true;
    }
  };

  const updatePlayerScoreIncrement = () => {
    setPlayerUpdates((prevUpdates) => {
      const updatedPlayerUpdates = [...prevUpdates];

      room.players.forEach((player) => {
        const existingPlayer = prevUpdates.find(
          (update) => update.socketId === player.id
        );

        if (!existingPlayer) {
          updatedPlayerUpdates.push({
            socketId: player.socketId,
            playerName: player.name,
            scoreIncrement: 0,
          });
        }
        // code for testing
        updatedPlayerUpdates.push({
          socketId: "dfdf",
          playerName: "sfdasdfsadf",
          scoreIncrement: 200,
        });
        updatedPlayerUpdates.push({
          socketId: "dfdf",
          playerName: "sfadf",
          scoreIncrement: 200,
        });
        updatedPlayerUpdates.push({
          socketId: "dfdf",
          playerName: "sfdasdfsadfdf",
          scoreIncrement: 20,
        });
      });

      return updatedPlayerUpdates;
    });
  };

  const handleGameEnd = () => {
    setshowGameEndScreen(true);
    setCurrentRound(0);
    const sortedPlayers = [...room.players]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

      sortedPlayers.push({
        socketId: "dfdf",
        name: "sfdasdfsadf",
        score: 230,
      });
      sortedPlayers.push({
        socketId: "dfdf",
        name: "sfadf",
        score: 200,
      });

    setWinningPlayers(sortedPlayers);
    startGameEndTimer(1000);
  };

  return (
    <div className="relative bg-white p-4">
      <CountdownOverlay showCountdown={showCountdown} countdown={countdown} playerUpdates={playerUpdates} previousAnswer={previousAnswer} gameType={gameType}/>
      <GameEndScreen showGameEndScreen={showGameEndScreen} winningPlayers={winningPlayers} countdown={countdown} />
      {true && (
        <div className="">
          <div className="flex items-center justify-center gap-12 mb-2">
            <div className="flex items-center gap-2">
              <label className="text-lg font-medium">Time:</label>
              <span className="text-xl font-bold">{timer}</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-lg font-medium">Round:</label>
              <span className="text-xl font-bold">{currentRound}</span>
            </div>
          </div>
          {gameType === "Arrange the Scenes" && (
            <MultiplayerMovieSequence
              images={images}
              movieName={answer}
              roomId={roomId}
              timer={timer}
              currentRound={currentRound}
            />
          )}
          {gameType === "Guess from Scene" && (
            <MultiplayerMovieScene image={image} />
          )}
          {gameType === "Guess from Dialogue" && (
            <MultiplayerMovieDialogue dialogue={dialogue} />
          )}
          {gameType === "Complete the Dialogue" && (
            <MultiplayerCompleteMovieDialogue dialogue={dialogue} />
          )}
          {gameType != "Arrange the Scenes" && (
            <UserGuess
              answer={answer}
              roomId={roomId}
              timer={timer}
              currentRound={currentRound}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GameWindow;
