"use client";

import HomeLayout from "./components/HomeLayout";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <HomeLayout />
    </div>
  );
}
