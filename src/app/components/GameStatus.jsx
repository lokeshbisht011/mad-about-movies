import React from "react";

const GameStatus = ({ timer, currentRound }) => (
  <div className="flex items-center justify-center gap-12 mt-4">
    <div className="flex items-center gap-2">
      <label className="text-lg font-medium">Time:</label>
      <span className="text-xl font-bold">{timer}</span>
    </div>
    <div className="flex items-center gap-2">
      <label className="text-lg font-medium">Round:</label>
      <span className="text-xl font-bold">{currentRound}</span>
    </div>
  </div>
);

export default GameStatus;
