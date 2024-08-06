import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CountdownOverlay = ({ showCountdown, countdown, playerUpdates, previousAnswer, gameType }) => (
  <AnimatePresence>
    {showCountdown && (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-300 z-50 p-4">
        {gameType != "Arrange the Scenes" && previousAnswer && (
          <motion.div
            className="text-center text-xl font-semibold text-black mb-4"
            initial={{ y: "-300%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-300%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            The correct answer was{" "}
            <strong>{previousAnswer.toUpperCase()}</strong>
          </motion.div>
        )}
        <motion.div
          className="text-center text-3xl font-bold text-black mb-4"
          initial={{ y: "-300%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-300%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {countdown}
        </motion.div>
        <motion.div
          className="grid gap-1 text-black"
          initial={{ y: "300%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "300%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
            maxWidth: "80%",
          }}
        >
          {playerUpdates.map((update, index) => {
            const scoreColor =
              update.scoreIncrement > 0 ? "text-green-500" : "text-red-500";

            return (
              <div key={index} className="flex items-center mb-2">
                <strong className="mr-2">{update.playerName}:</strong>
                <strong className={scoreColor}>{update.scoreIncrement}</strong>
              </div>
            );
          })}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default CountdownOverlay;
