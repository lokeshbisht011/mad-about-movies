import React from "react";
import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/Mdx";
import RelatedBlogs from "@/app/components/RelatedBlogs";
import moviesArray from "../../../../public/movies.json";
import BollywoodMovies from "@/app/components/BollywoodMovies";

async function getDocFromParams(slug) {
  const doc = allBlogs.find((doc) => doc.slug === slug);

  if (!doc) {
    notFound();
  }

  return doc;
}

export async function generateMetadata({ params }) {
  const { slug } = params;

  if (slug.includes("bollywood-movies-starting-with-")) {
    const char = slug.split("bollywood-movies-starting-with-")[1];
    return {
      title: `Bollywood Movies Starting from ${char.toUpperCase()}`,
      description: `A list of Bollywood movies that start with the letter ${char.toUpperCase()}.`,
    };
  }

  const doc = await getDocFromParams(slug);
  return {
    title: doc.title,
    description: doc.summary,
  };
}

const page = async ({ params }) => {
  const { slug } = params;

  if (slug.includes("bollywood-movies-starting-with-")) {
    const char = slug.split("bollywood-movies-starting-with-")[1];
    const movies = moviesArray[char.toLowerCase()];
    return (
      <div>
        <BollywoodMovies movies={movies} char={char} />
      </div>
    );
  }

  const doc = await getDocFromParams(params.slug);
  return (
    <div>
      <div className="mx-auto max-w-2xl text-text p-5 mt-5">
        <Mdx code={doc.body.code} />
      </div>
      <hr className="mx-5"></hr>
      <RelatedBlogs currentBlogTags={doc.tags} currentBlogId={doc._id} />
    </div>
  );
};

export default page;
