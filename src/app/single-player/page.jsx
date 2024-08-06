import React from "react";
import SinglePlayerLayout from "../components/SinglePlayerLayout";

const page = () => {
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
};

export default page;
