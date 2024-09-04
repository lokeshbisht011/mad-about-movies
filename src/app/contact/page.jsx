import React from "react";

export async function generateMetadata() {
  return {
    title: "Contact Us",
  };
}

const page = () => {
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
      <div className="flex flex-col items-center justify-center bg-bg p-5 max-w-2xl md:mx-auto border-2 border-gray-300 rounded-md text-text mt-5 text-center mx-4">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-4 md:text-2xl text-xl">
          We would love to hear your feedback.
          <br />
          If you find anything wrong or if you want us to add games from one of
          your favourite movies,
          <br />
          feel free to contact us.
        </p>
        <p className="mb-4 md:text-2xl text-xl">
          Also contact us, if you loved playing the games.
          <br />
          Email: madaboutmovies009@gmail.com
        </p>
      </div>
    </div>
  );
};

export default page;
