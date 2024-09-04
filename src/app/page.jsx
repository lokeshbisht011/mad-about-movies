"use client";

// import HomeLayout from "./components/HomeLayout";
import SinglePlayerLayout from "./components/SinglePlayerLayout";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <SinglePlayerLayout />
    </div>
  );
}
