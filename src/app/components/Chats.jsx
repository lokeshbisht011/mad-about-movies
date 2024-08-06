"use client";

import React, { useEffect, useRef, useState } from "react";
import socket from "../utils/socket";

const Chats = ({ roomId, playerName, players }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const chatEndRef = useRef(null); // Ref for scrolling to the bottom

  useEffect(() => {
    socket.on("game-message", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("game-message");
    };
  }, []);

  // useEffect(() => {
  //
  //   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [chatMessages]);

  const sendMessage = (message) => {
    socket.emit("game-message", roomId, message);
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  const getPlayerColor = (userName) => {
    const player = players?.find((player) => player.name === userName);
    return player ? player.color : "black";
  };

  const getMessageColor = (message) => {
    if (!message.user) {
      if (
        message.text.includes("joined the room") ||
        message.text.includes("guessed")
      ) {
        return "green";
      } else if (message.text.includes("left the room")) {
        return "red";
      }
    }
    return getPlayerColor(message.user);
  };

  return (
    <div className="md:w-1/4 w-1/2 bg-white rounded-lg">
      <h2 className="text-xl font-bold text-center p-2 ">Chats</h2>
      <div className="flex flex-col h-full">
        <div className="flex flex-col overflow-y-scroll flex-grow h-96">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`p-2 ${index % 2 === 0 ? "bg-gray-200" : "white"}`}
            >
              <strong>{message.user}: </strong>
              {message.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="w-full p-1 bg-white rounded-b-lg">
          <input
            type="text"
            placeholder="Type a message"
            className="p-2 w-full border rounded-lg bg-white outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage({ user: playerName, text: e.target.value });
                e.target.value = "";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chats;
