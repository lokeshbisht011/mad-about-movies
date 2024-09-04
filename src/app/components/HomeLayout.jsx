"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import socket from "../utils/socket";
import toast, { Toaster } from "react-hot-toast";
import { generateRandomString } from "../utils/utils";
import GoogleAd from "./GoogleAd";

const HomeLayout = () => {
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
      router.push(`/room/${roomId}`);
    });

    socket.on("room-not-found", (error) => {
      toast.dismiss();
      toast.error(error);
      setRoomId("");
    });

    return () => {
      socket.off("room-created");
      socket.off("room-joined");
      socket.off("room-not-found");
    };
  }, []);

  const createRoom = () => {
    if (!playerName || playerName.trim() === "") {
      toast.dismiss();
      toast.error("Name is required");
    } else {
      localStorage.setItem("playerName", playerName);
      const newRoomId = generateRandomString(5);
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
    <div
      className="flex items-center justify-center bg-gray-100 p-5"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <Toaster />
      <motion.div
        className="max-w-md rounded-lg p-8 shadow-lg bg-purple-600 -mt-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4 text-center text-4xl font-bold text-white">
          Mad About Movies
        </h1>
        <input
          type="text"
          placeholder="Your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="mb-3 w-full rounded-md border border-gray-300 p-3 text-gray-700"
        />
        <button
          onClick={createRoom}
          className="mb-3 w-full rounded-md bg-blue-500 px-4 py-3 text-white transition hover:bg-blue-600"
        >
          Create Room
        </button>
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="mb-3 w-full rounded-md border border-gray-300 p-3 text-gray-700"
        />
        <button
          onClick={() => joinRoom(roomId)}
          className="mb-3 w-full rounded-md bg-green-500 px-4 py-3 text-white transition hover:bg-green-600"
        >
          Join Room
        </button>
        <button
          onClick={() => router.push("/single-player")}
          className="w-full rounded-md bg-gray-500 px-4 py-3 text-white transition hover:bg-gray-600"
        >
          Single Player Mode
        </button>
      </motion.div>
    </div>
  );
};

export default HomeLayout;
