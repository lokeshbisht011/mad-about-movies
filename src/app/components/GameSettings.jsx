import { useEffect, useState } from "react";
import socket from "@/app/utils/socket"; // Import your socket instance

const GameSettings = ({ isOwner, roomId, room }) => {
  const [gameType, setGameType] = useState(room ? room.gameType : "scene");
  const [playersAllowed, setPlayersAllowed] = useState(
    room ? room.playersAllowed : 4
  );
  const [guessTime, setGuessTime] = useState(room ? room.guessTime : 30);
  const [rounds, setRounds] = useState(room ? room.totalRounds : 5);

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
        console.log("dfd")
        setRounds(value);
        room.totalRounds = value;
        break;
      default:
        break;
    }

    socket.emit("room-settings-updated", roomId, room);
  };

  const startGame = () => {
    socket.emit("start-game", roomId);
  };

  return (
    <div>
      <div className="md:p-4 p-2 bg-gray-200 rounded-md">
        {isOwner ? (
          <>
            <div className="flex md:mb-4 mb-2 gap-2 items-center justify-between">
              <h2 className="md:text-lg text-md font-bold mb-2">Game Type:</h2>
              <select
                id="gameType"
                value={gameType}
                onChange={handleSettingsChange}
                className="border md:p-2 rounded md:text-md text-sm p-1"
              >
                <option value="scene">Guess from Scene</option>
                <option value="dialogue">Guess from Dialogue</option>
                <option value="complete">Complete the Dialogue</option>
              </select>
            </div>
            <div className="flex mb-4 items-center justify-between">
              <h2 className="md:text-lg text-md font-bold mb-2">Players Allowed:</h2>
              <input
                id="playersAllowed"
                type="number"
                value={playersAllowed}
                onChange={handleSettingsChange}
                className="border md:p-2 rounded md:text-md text-sm p-1"
              />
            </div>
            <div className="flex mb-4 items-center justify-between">
              <h2 className="md:text-lg text-md font-bold mb-2">Guess Time (seconds):</h2>
              <input
                id="guessTime"
                type="number"
                value={guessTime}
                onChange={handleSettingsChange}
                className="border md:p-2 rounded md:text-md text-sm p-1"
              />
            </div>
            <div className="flex mb-4 items-center justify-between">
              <h2 className="md:text-lg text-md font-bold mb-2">Rounds:</h2>
              <input
                id="rounds"
                type="number"
                value={rounds}
                onChange={handleSettingsChange}
                className="border md:p-2 rounded md:text-md text-sm p-1"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex mb-4 items-center justify-between">
              <h2 className="md:text-lg text-md font-bold mb-2">Game Type:</h2>
              <p>{gameType}</p>
            </div>
            <div className="flex mb-4 items-center justify-between">
              <h2 className="md:text-lg text-md font-bold mb-2">Players Allowed:</h2>
              <p>{playersAllowed}</p>
            </div>
            <div className="flex mb-4 items-center justify-between">
              <h2 className="md:text-lg text-md font-bold mb-2">Guess Time (seconds):</h2>
              <p>{guessTime}</p>
            </div>
            <div className="flex mb-4 items-center justify-between">
              <h2 className="md:text-lg text-md font-bold mb-2">Rounds:</h2>
              <p>{rounds}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center mt-4">
      <button
        onClick={startGame}
        className="md:text-md text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
      >
        Start Game
      </button>
      </div>
    </div>
  );
};

export default GameSettings;
