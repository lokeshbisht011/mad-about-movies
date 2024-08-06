import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const GameEndOverlay = ({ showGameEndScreen, winningPlayers, countdown }) => (
  <AnimatePresence>
    {showGameEndScreen && (
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-between bg-gray-300 z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="text-center text-3xl font-bold text-black mt-4"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {countdown}
        </motion.div>

        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="text-center text-3xl font-bold text-white space-y-4">
            <div className="flex justify-center items-end space-x-4">
              {winningPlayers.length >= 2 && (
                <motion.div
                  className="bg-purple-400 p-4 py-6 rounded-md text-black flex flex-col items-center justify-center"
                  initial={{ y: "-50%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <strong className="text-xl">2nd</strong>
                  <span className="text-lg">{winningPlayers[1].name}</span>
                  <span className="text-sm">{winningPlayers[1].score} points</span>
                </motion.div>
              )}
              {winningPlayers.length >= 1 && (
                <motion.div
                  className="bg-purple-500 p-6 py-10 rounded-md text-black flex flex-col items-center justify-center"
                  initial={{ y: "-50%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <strong className="text-xl">1st</strong>
                  <span className="text-lg">{winningPlayers[0].name}</span>
                  <span className="text-sm">{winningPlayers[0].score} points</span>
                </motion.div>
              )}
              {winningPlayers.length >= 3 && (
                <motion.div
                  className="bg-purple-300 p-4 rounded-md text-black flex flex-col items-center justify-center"
                  initial={{ y: "-50%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <strong className="text-xl">3rd</strong>
                  <span className="text-lg">{winningPlayers[2].name}</span>
                  <span className="text-sm">{winningPlayers[2].score} points</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default GameEndOverlay;
