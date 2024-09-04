"use client";

import Link from "next/link";
import { React } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  
  const menuItems = [
    { href: "/blogs", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact Us" },
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
    </div>
  );
};

export default Navbar;
