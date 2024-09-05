"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import BackgroundMusic from "./BackgroundMusic";
import soundEffectsManager from "@/lib/soundManager";

const SinglePlayerLayout = () => {
  const [themeSuffix, setThemeSuffix] = useState("_light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setThemeSuffix(savedTheme === "light" ? "_light" : "_dark");
  }, []);

  const images = ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png"];

  return (
    <div className="flex flex-col h-vh p-4 items-center text-text">
      {/* <BackgroundMusic /> */}
      <main className="grid md:grid-cols-2 justify-center items-center gap-4 m-8 text-text">
        <section className="p-6 shadow-md rounded-lg text-center items-center justify-center bg-bgSoft">
          <h2 className="text-2xl mb-4">Arrange Movie Scenes</h2>
          <div className="flex justify-center items-center">
            <div className="text-center md:w-[500px] md:h-[200px] w-[350px] h-[150px] flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1">
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="md:h-[60px] md:w-[180px] h-[50px] w-[140px] relative"
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover border-2 border-green-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <p className="my-4 text-textSoft">
            Can you arrange the movie scenes in the correct order?
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:text-md text-md bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
            onClick={() => soundEffectsManager.playSound("click")} // Move the onClick here
          >
            <Link href="/sequence">Play Now</Link>
          </motion.button>
        </section>

        <section className="p-6 shadow-md rounded-lg text-center items-center justify-center bg-bgSoft">
          <h2 className="text-2xl mb-4">Guess Movie from Dialogue</h2>
          <div className="flex justify-center items-center">
            <div className="flex items-center justify-center border border-textSoft p-4 md:w-[500px] md:h-[200px] w-[350px] h-[150px]">
              <span className="text-2xl md:text-4xl italic text-textSoft">
                &ldquo; Bade bade deshon mein aisi choti choti baatein hoti
                rehti hai, Senorita.&rdquo;
              </span>
            </div>
          </div>
          <p className="my-4 text-textSoft">
            Test your movie knowledge by guessing the movie from a dialogue.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:text-md text-md bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
            onClick={() => soundEffectsManager.playSound("click")} // Move the onClick here
          >
            <Link href="/dialogue">Play Now</Link>
          </motion.button>
        </section>

        <section className="p-6 shadow-md rounded-lg text-center items-center justify-center bg-bgSoft">
          <h2 className="text-2xl mb-4">Complete Movie Dialogue</h2>
          <div className="flex justify-center items-center">
            <div className="flex items-center justify-center border border-textSoft p-4 md:w-[500px] md:h-[200px] w-[350px] h-[150px]">
              <span className="text-2xl md:text-4xl italic text-textSoft">
                &ldquo; Main udna chahta hun, daudna chahta hun, girna bhi
                chahta hun... &rdquo;
              </span>
            </div>
          </div>
          <p className="my-4 text-textSoft">
            Can you complete the dialogue from the movie?
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:text-md text-md bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
            onClick={() => soundEffectsManager.playSound("click")} // Move the onClick here
          >
            <Link href="/complete-dialogue">Play Now</Link>
          </motion.button>
        </section>

        <section className="p-6 shadow-md rounded-lg text-center items-center justify-center bg-bgSoft">
          <h2 className="text-2xl mb-4">Guess Movie from Scene</h2>
          <div className="flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative border-2 border-green-500 md:w-[500px] md:h-[200px] w-[350px] h-[150px]"
            >
              <Image
                src="/znmd.png"
                alt={"Zindagi Na Milegi Dobara Movie Scene"}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
          <p className="my-4 text-textSoft">
            Test your movie knowledge by guessing the movie from on a scene.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:text-md text-md bg-button hover:bg-buttonHover text-white px-3 py-1 md:px-4 md:py-2 rounded-md"
            onClick={() => soundEffectsManager.playSound("click")} // Move the onClick here
          >
            <Link href="/scene">Play Now</Link>
          </motion.button>
        </section>
      </main>
    </div>
  );
};

export default SinglePlayerLayout;
