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
      className="flex flex-col pb-8"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "700px",
      }}
    >
      <div className="flex justify-center mx-10">
        <CompleteMovieDialogue params={params} />
      </div>
    </div>
  );
};

export default page;
