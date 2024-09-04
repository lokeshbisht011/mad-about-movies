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
      className="flex flex-col"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "110vh",
        height: "auto"
      }}
    >
      <div className="flex justify-center">
        <MovieSequence params={params} />
      </div>
    </div>
  );
};

export default page;
