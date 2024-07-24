"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import socket from "../utils/socket";
import toast, { Toaster } from "react-hot-toast";

const MultiplayerGame = () => {
  const router = useRouter();

  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const savedPlayerName = localStorage.getItem("playerName");
    if (savedPlayerName) {
      setPlayerName(savedPlayerName);
    }

    socket.on("room-created", (roomId) => {
      router.push(`/room/${roomId}`);
    });

    socket.on("room-joined", (roomId) => {
      setRoomId(roomId);
      router.push(`/room/${roomId}`);
    });

    socket.on("room-not-found", (error) => {
      toast.dismiss();
      toast.error(error);
      setRoomId("");
    });

    socket.on("game-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("room-created");
      socket.off("room-joined");
      socket.off("room-not-found");
      socket.off("player-joined");
      socket.off("player-left");
      socket.off("game-message");
    };
  }, []);

  const createRoom = () => {
    if (!playerName || playerName.trim() === "") {
      toast.dismiss();
      toast.error("Name is required");
    } else {
      localStorage.setItem("playerName", playerName);
      const newRoomId = Math.random().toString(36).substr(2, 9);
      socket.emit("create-room", newRoomId, playerName);
    }
  };

  const joinRoom = (id) => {
    if (!playerName || playerName.trim() === "") {
      toast.dismiss();
      toast.error("Name is required");
    } else {
      localStorage.setItem("playerName", playerName);
      socket.emit("join-room", id, playerName);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <Toaster />
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="border border-gray-300 p-2 mb-2"
        />
        <button
          onClick={createRoom}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
        >
          Create Room
        </button>
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border border-gray-300 p-2 mb-2"
        />
        <button
          onClick={() => joinRoom(roomId)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default MultiplayerGame;
