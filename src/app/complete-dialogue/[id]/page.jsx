import React from "react";
import CompleteMovieDialogue from "@/app/components/CompleteMovieDialogue";

export async function generateMetadata() {
  return {
    title: "Complete The Dialogue",
  };
}

const page = ({ params }) => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex justify-center">
        <CompleteMovieDialogue params={params} />
      </div>
    </div>
  );
};

export default page;
