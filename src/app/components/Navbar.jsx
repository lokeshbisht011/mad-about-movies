"use client";

import Link from "next/link";
import { React, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);

  const closeGamesDropdown = () => {
    setIsGamesOpen(false);
  };

  const handleClickOutside = (e) => {
    if (isGamesOpen) {
      closeGamesDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isGamesOpen]);

  const menuItems = [
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact Us" },
  ];

  const gameItems = [
    { href: "/sequence", label: "Arrange The Scenes" },
    { href: "/dialogue", label: "Guess From Dialogue" },
    { href: "/scene", label: "Guess From Scene" },
    { href: "/complete-dialogue", label: "Complete The Dialogue" },
  ];

  return (
    <div className="z-50">
      <div className="bg-bg max-w-4xl mx-auto">
        <div className="flex justify-between items-center p-2 bg-bg">
          <div className="text-text text-xl">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
            </Link>
          </div>
          <div className="flex space-x-6 items-center text-sm md:text-lg">
            <div className="relative" id="gamesDropdown">
              <button
                className="text-text hover:text-primary transition-colors"
                onClick={() => setIsGamesOpen(!isGamesOpen)}
              >
                Games
              </button>
              <AnimatePresence>
                {isGamesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 bg-white shadow-md rounded-md p-2 w-48"
                  >
                    <ul>
                      {gameItems.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-200 rounded"
                        >
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-text hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
