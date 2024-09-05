'use client'

import { useEffect, useState } from "react";

const BackgroundMusic = () => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create a new Audio object
    const bgAudio = new Audio("/background.mp3");
    bgAudio.loop = true; // Loop the music if desired
    setAudio(bgAudio);

    // Function to play the music once user interacts with the page
    const startMusicOnInteraction = () => {
      if (!isPlaying && bgAudio) {
        bgAudio
          .play()
          .then(() => {
            setIsPlaying(true); // Set to true when the music starts playing
          })
          .catch((error) => {
            console.error("Failed to play the audio:", error);
          });
      }
    };

    // Add event listeners for any user interaction
    window.addEventListener("click", startMusicOnInteraction);
    window.addEventListener("keydown", startMusicOnInteraction);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("click", startMusicOnInteraction);
      window.removeEventListener("keydown", startMusicOnInteraction);
    };
  }, []);

  return null;
};

export default BackgroundMusic;
