import React, { useEffect, useState } from "react";
import socket from "../utils/socket";

const PlayerList = ({ room }) => {
  const [players, setPlayers] = useState(room ? room.players : []);
  const [currentRoundPlayersGuessed, setCurrentRoundPlayersGuessed] = useState(
    []
  );

  useEffect(() => {
    if (room) {
      setPlayers(room.players);
      const playersGuessed =
        room.rounds?.[room.roundNumber - 1]?.playersGuessed || [];
      setCurrentRoundPlayersGuessed(playersGuessed);
    }
  }, [room]);

  return (
    <div className="md:w-1/4 w-1/2 p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Players</h2>
      <ul>
        {players &&
          players.map((player, index) => (
            <li
              key={index}
              className={`mb-2 flex justify-between ${
                currentRoundPlayersGuessed.includes(player.id)
                  ? "bg-green-500"
                  : ""
              }`}
            >
              <div className={player.id === socket.id ? "font-bold" : ""}>
                {player.name} {player.isOwner ? "(Owner)" : ""}
              </div>
              <div>{player.score}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PlayerList;
