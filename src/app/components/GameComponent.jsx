"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import socket from "@/app/utils/socket";
import PlayerList from "./PlayerList";
import GameSettings from "./GameSettings";
import GameWindow from "./GameWindow";
import Chats from "./Chats";
import { Toaster } from "react-hot-toast";

const GameComponent = ({ roomId, playerName }) => {
  const router = useRouter();

  const [room, setRoom] = useState();
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);

  const [guessText, setGuessText] = useState("");
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    socket.emit("get-room-details", roomId);

    socket.on("room-not-found", (error) => {
      router.push("/");
    });

    socket.on("room-details", (room) => {
      setRoom(room);
      setPlayers(room.players);
      const owner = room.players.find((player) => player.isOwner);
      if (owner.id === socket.id) {
        setIsOwner(true);
      }
    });

    socket.on("update-players", ({ players }) => {
      setPlayers(players);
      const owner = players.find((player) => player.isOwner);
      if (owner.id === socket.id) {
        setIsOwner(true);
      }
    });

    socket.on("game-started", (room) => {
      setRoom(room);
      setIsGameStarted(true);
    });

    socket.on("update-room-settings", (room) => {
      setRoom(room);
    });

    socket.on("end-game", (room) => {
      setRoom(room);
      setPlayers(room.players);
      const owner = room.players.find((player) => player.isOwner);
      if (owner.id === socket.id) {
        setIsOwner(true);
      }
      resetGame();
    });

    return () => {
      socket.off("room-not-found");
      socket.off("room-details");
      socket.off("update-players");
      socket.off("game-started");
      socket.off("update-room-settings");
      socket.off("end-game");
    };
  }, [roomId]);

  function resetGame() {
    setIsGameStarted(false);
  }

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Toaster />
      <div className="hidden md:flex max-w-6xl mx-auto p-2">
        <PlayerList players={players} />
        <div className="w-1/2 flex flex-col px-2">
          {!isGameStarted && (
            <div className="flex flex-col items-center">
              <div className="w-full mb-4">
                <GameSettings isOwner={isOwner} roomId={roomId} room={room} />
              </div>
            </div>
          )}
          {isGameStarted && (
            <div>
              <GameWindow room={room} roomId={roomId} isOwner={isOwner} />
            </div>
          )}
        </div>
        <Chats roomId={roomId} playerName={playerName} players={players} />
      </div>

      <div className="md:hidden flex flex-col mx-auto p-2">
        <div className="flex flex-col bg-white rounded-lg">
          {!isGameStarted && (
              <div className="flex flex-col md:mb-4 mb-2">
                <GameSettings isOwner={isOwner} roomId={roomId} room={room} />
            </div>
          )}
          {isGameStarted && (
            <div>
              <GameWindow room={room} roomId={roomId} isOwner={isOwner} />
            </div>
          )}
        </div>
        <div className="flex gap-4 mt-4">
          <PlayerList players={players} />
          <Chats roomId={roomId} playerName={playerName} players={players} />
        </div>
      </div>
    </div>
  );
};

export default GameComponent;
