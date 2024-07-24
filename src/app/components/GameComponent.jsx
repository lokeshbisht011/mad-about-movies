"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import bollywoodMovieScenes from "/public/bollywoodMovieScenes.json";
import levenshtein from "fast-levenshtein";
import { PREFIX } from "@/app/utils/constants";
import socket from "@/app/utils/socket";
import { extractIdFromUrl } from "../utils/utils";
import PlayerList from "./PlayerList";
import GameSettings from "./GameSettings";
import GameWindow from "./GameWindow";
import Swal from "sweetalert2";
import Chats from "./Chats";
import { Toaster } from "react-hot-toast";

const GameComponent = ({ roomId, playerName }) => {
  const router = useRouter();

  const [room, setRoom] = useState();
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [players, setPlayers] = useState([]);
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

    socket.on("update-players", (players) => {
      setPlayers(players);
      const owner = players.find((player) => player.isOwner);
      if (owner.id === socket.id) {
        setIsOwner(true);
      }
    });

    socket.on("start-round", (room) => {
      setIsGameStarted(true);
      setRoom(room);
    });

    socket.on("player-guessed", (room, playerName) => {
      setRoom(room);
    });

    socket.on("update-room-settings", (room) => {
      setRoom(room);
    });

    socket.on("end-game", (room) => {
      setRoom(room);
      resetGame();
    });

    return () => {
      socket.off("update-players");
    };
  }, [roomId]);

  function resetGame() {
    setIsGameStarted(false);
  }

  return (
    <div>
      <div className="hidden md:flex h-screen max-w-5xl mx-auto p-2">
        <Toaster />
        <PlayerList room={room} />
        <div className="w-1/2 flex flex-col bg-white px-2">
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
        <Chats roomId={roomId} playerName={playerName} />
      </div>

      <div className="md:hidden flex flex-col h-screen mx-auto p-2">
        <Toaster />
        <div className="flex flex-col bg-white px-2">
          {!isGameStarted && (
            <div className="flex flex-col items-center">
              <div className="mb-4">
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
        <div className="flex gap-4">
          <PlayerList room={room} />
          <Chats roomId={roomId} playerName={playerName} />
        </div>
      </div>
    </div>
  );
};

export default GameComponent;