import React from "react";
import MovieScene from "@/app/components/MovieScene";

export async function generateMetadata() {
  return {
    title: "Guess From Scene",
  };
}

const page = ({ params }) => {
  return (
    <div
      className="flex flex-col pb-8"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <div className="flex justify-center items-center">
        <MovieScene params={params} />
      </div>
    </div>
  );
};

export default page;
