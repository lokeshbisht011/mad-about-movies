"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import bollywoodMovies from "/public/bollywoodMovies.json";
import { numberToString } from "@/app/utils/utils";
import { RANDOM_URL_PREFIX } from "@/app/utils/constants";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const randomMovieIndex = Math.floor(Math.random() * bollywoodMovies.length);
    const suffix = numberToString(randomMovieIndex);
    const newUrl = "/sequence/" + RANDOM_URL_PREFIX + suffix;
    router.push(newUrl);
  }, [router]);

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    ></div>
  );
};

export default Page;
