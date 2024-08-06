import React, { useEffect, useState } from "react";
import socket from "../utils/socket";
import { FaCrown } from "react-icons/fa";

const PlayerList = ({ players }) => {
  const [currentRoundPlayersGuessed, setCurrentRoundPlayersGuessed] = useState(
    []
  );

  useEffect(() => {
    socket.on("update-player-guessed", (playerGuessed) => {
      setCurrentRoundPlayersGuessed(playerGuessed);
    });

    return () => {
      socket.off("update-player-guessed");
    };
  }, []);

  const getRankedPlayers = (players) => {
    if (!Array.isArray(players)) return [];
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    let rank = 1;
    const rankedPlayers = sortedPlayers.map((player, index) => {
      if (index > 0 && player.score < sortedPlayers[index - 1].score) {
        rank = index + 1;
      }
      return { ...player, rank };
    });
    rankedPlayers.push({
      id: "hghj",
      name: "lokesh lokesh lokesh",
      score: 450,
      isPlaying: true,
      isOwner: false,
      color: "red",
      rank: 1,
    });
    rankedPlayers.push({
      id: "hghj",
      name: "mukeshasdf",
      score: 450,
      isPlaying: true,
      isOwner: false,
      color: "blue",
      rank: 2,
    });
    rankedPlayers.push({
      id: "hghj",
      name: "rando292839",
      score: 450,
      isPlaying: true,
      isOwner: false,
      color: "green",
      rank: 3,
    });

    return rankedPlayers;
  };

  const rankedPlayers = getRankedPlayers(players);

  return (
    <div className="md:w-1/4 w-1/2 rounded-lg">
      <ul>
        {rankedPlayers &&
          rankedPlayers.map((player, index) => (
            <li
              key={index}
              className={`flex justify-between p-2 ${
                currentRoundPlayersGuessed.includes(player.id)
                  ? "bg-green-500"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
            >
              <div
                className={`flex items-center ${
                  player.id === socket.id ? "font-bold" : ""
                }`}
              >
                <span className="mr-2">#{player.rank}</span>
                <span>{player.name}</span>
                {player.id === socket.id && <span>(You)</span>}
                {player.isOwner && <FaCrown size={20} className="ml-2" />}
              </div>

              <div>{player.score}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PlayerList;
