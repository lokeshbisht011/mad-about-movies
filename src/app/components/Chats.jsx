"use client";

import React, { useEffect, useState } from "react";
import socket from "../utils/socket";

const Chats = ({ roomId, playerName }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.on("player-joined", (playerName) => {
      setChatMessages((prev) => [
        ...prev,
        { user: "", text: `${playerName} joined the room` },
      ]);
    });

    socket.on("player-left", (playerName) => {
      setChatMessages((prev) => [
        ...prev,
        { user: "", text: `${playerName} left the room` },
      ]);
    });

    socket.on("game-message", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("game-message");
      socket.off("player-joined");
      socket.off("player-left");
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit("game-message", roomId, message);
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="md:w-1/4 w-1/2 p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="flex flex-col overflow-y-scroll mb-4">
        {chatMessages.map((message, index) => (
          <div key={index} className="mb-2">
            {message.user && message.user.trim() !== "" ? (
              <strong>{message.user}:</strong>
            ) : null}
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        className="border p-2 rounded w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage({ user: playerName, text: e.target.value });
            e.target.value = "";
          }
        }}
      />
    </div>
  );
};

export default Chats;
