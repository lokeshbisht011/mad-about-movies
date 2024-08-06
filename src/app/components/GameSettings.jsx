import { useEffect, useState } from "react";
import socket from "@/app/utils/socket"; // Import your socket instance
import toast from "react-hot-toast";

const GameSettings = ({ isOwner, roomId, room }) => {
  const [gameType, setGameType] = useState(
    room ? room.gameType : "Arrange the Scenes"
  );
  const [playersAllowed, setPlayersAllowed] = useState(
    room ? room.playersAllowed : 4
  );
  const [guessTime, setGuessTime] = useState(room ? room.guessTime : 30);
  const [rounds, setRounds] = useState(room ? room.totalRounds : 5);

  const playerOptions = Array.from({ length: 19 }, (_, i) => i + 2);
  const guessTimeOptions = [
    2, 5, 15, 20, 30, 45, 60, 70, 80, 90, 100, 120, 150, 180,
  ];
  const roundsOptions = Array.from({ length: 15 }, (_, i) => i + 2);
  const gameTypeOptions = [
    "Arrange the Scenes",
    "Guess from Scene",
    "Guess from Dialogue",
    "Complete the Dialogue",
  ];

  useEffect(() => {
    if (room) {
      setGameType(room.gameType);
      setPlayersAllowed(room.playersAllowed);
      setGuessTime(room.guessTime);
      setRounds(room.totalRounds);
    }
  }, [isOwner, room]);

  const handleSettingsChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "gameType":
        setGameType(value);
        room.gameType = value;
        break;
      case "playersAllowed":
        setPlayersAllowed(value);
        room.playersAllowed = value;
        break;
      case "guessTime":
        setGuessTime(value);
        room.guessTime = value;
        break;
      case "rounds":
        setRounds(value);
        room.totalRounds = value;
        break;
      default:
        break;
    }

    socket.emit("room-settings-updated", roomId, room);
  };

  const startGame = () => {
    if (room.players.length > 0) {
      socket.emit("start-game", roomId);
    } else {
      toast("Need at least two players to start game");
    }
  };

  const settings = [
    {
      id: "gameType",
      label: "Game Type",
      value: gameType,
      options: gameTypeOptions,
    },
    {
      id: "playersAllowed",
      label: "Players",
      value: playersAllowed,
      options: playerOptions,
    },
    {
      id: "guessTime",
      label: "Time(seconds)",
      value: guessTime,
      options: guessTimeOptions,
    },
    {
      id: "rounds",
      label: "Rounds",
      value: rounds,
      options: roundsOptions,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg">
      <div className="md:p-4 p-2 flex-grow md:mx-0 md:mt-0 mx-2 mt-2">
        {isOwner ? (
          <>
            {settings.map(({ id, label, value, options }) => (
              <div key={id} className="flex mb-4 items-center justify-between">
                <h2 className="md:text-md text-sm text-black font-semibold mb-2">
                  {label}
                </h2>
                <select
                  id={id}
                  value={value}
                  onChange={handleSettingsChange}
                  className="md:p-2 rounded text-center text-black md:text-md bg-gray-100 text-sm p-1 w-full max-w-60"
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </>
        ) : (
          <>
            {settings.map(({ label, value }, index) => (
              <div
                key={index}
                className="flex mb-4 items-center justify-between"
              >
                <h2 className="md:text-lg text-md font-bold mb-2">{label}</h2>
                <p>{value}</p>
              </div>
            ))}
          </>
        )}
      </div>
      {isOwner && (
        <div className="flex justify-center mt-4 md:p-4 px-2">
          <button
            onClick={startGame}
            className="md:text-md text-sm w-full bg-gray-100 hover:bg-gray-200 text-black px-3 py-1 md:px-4 md:py-2 rounded-md"
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default GameSettings;
