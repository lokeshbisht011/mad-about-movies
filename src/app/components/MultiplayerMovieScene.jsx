import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MultiplayerMovieScene = ({ image, handleImageLoad}) => {

  const [loading, setLoading] = useState(true);

  const handleImageLoading = () => {
    setLoading(false);
    handleImageLoad();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="md:w-[450px] md:h-[180px] w-[350px] h-[140px] mx-auto relative border-4 border-black"
    >
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
      )}
      {image && (
        <Image
          src={image}
          alt="Scene"
          fill
          className="object-cover"
          onLoad={handleImageLoading}
        />
      )}
    </motion.div>
  );
};

export default MultiplayerMovieScene;
