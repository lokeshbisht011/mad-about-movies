"use client";

import GameComponent from "@/app/components/GameComponent";
import socket from "@/app/utils/socket";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const GameRoom = ({ params }) => {
  const { id } = params;

  const [playerName, setPlayerName] = useState();
  const [hasPlayerName, setHasPlayerName] = useState(false);

  useEffect(() => {
    const savedPlayerName = localStorage.getItem("playerName");
    if (savedPlayerName) {
      setPlayerName(savedPlayerName);
      setHasPlayerName(true);
      socket.emit("join-room", id, savedPlayerName);
    } else {
      Swal.fire({
        title: "Enter your name",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: false,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          if (!name || name.trim() === "") {
            Swal.showValidationMessage("Name is required");
          } else {
            return name;
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const name = result.value;
          setPlayerName(name);
          localStorage.setItem("playerName", name);
          setHasPlayerName(true);
          socket.emit("join-room", id, name);
        }
      });
    }
  }, []);

  return (
    <div>
      {hasPlayerName && <GameComponent roomId={id} playerName={playerName} />}
    </div>
  );
};

export default GameRoom;
