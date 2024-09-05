import React from "react";
import MovieSequence from "@/app/components/MovieSequence";

export async function generateMetadata() {
  return {
    title: "Arrange The Scenes",
  };
}

const page = ({ params }) => {
  return (
    <div
      className="flex flex-col pb-4"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex justify-center mb-4">
        <MovieSequence params={params} />
      </div>
    </div>
  );
};

export default page;
