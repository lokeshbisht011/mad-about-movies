import React from "react";
import MovieDialogue from "@/app/components/MovieDialogue";

export async function generateMetadata() {
  return {
    title: "Guess From Dialogue",
  };
}

const page = ({ params }) => {
  return (
    <div
      className="flex flex-col min-h-screen pb-8"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex justify-center">
        <MovieDialogue params={params} />
      </div>
    </div>
  );
};

export default page;
