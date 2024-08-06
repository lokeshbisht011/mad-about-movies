import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MultiplayerMovieScene = ({ image }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoading = () => {
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="md:w-[450px] md:h-[180px] w-[350px] h-[140px] mx-auto relative border-4 border-gray-300"
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
          quality={50}
        />
      )}
    </motion.div>
  );
};

export default MultiplayerMovieScene;
