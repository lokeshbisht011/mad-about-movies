import React from "react";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import Image from "next/image";

const RelatedBlogs = ({ currentBlogTags, currentBlogId }) => {
  const getRelatedBlogs = (tags, currentBlogId) => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const relatedBlogs = shuffleArray(
      allBlogs.filter(
        (blog) =>
          blog._id !== currentBlogId &&
          blog.tags.some((tag) => tags.includes(tag))
      )
    ).slice(0, 6);

    return relatedBlogs;
  };

  const relatedBlogs = getRelatedBlogs(currentBlogTags, currentBlogId);

  return (
    <div className="mx-12 px-4 mt-5 text-text">
      <h2 className="text-center font-bold text-3xl">Related Blogs</h2>
      <div className="flex flex-wrap gap-5 mt-5">
        {relatedBlogs.map((post) => (
          <div
            key={post.slug}
            className="flex flex-col p-4 border rounded-md shadow-md w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)]"
          >
            <Link
              href={`/blogs/${post.slug}`}
              className="h-full flex flex-col justify-between"
            >
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <img
                src={post.images.cover}
                fill
                alt={post.title}
                className="mt-5 mb-5"
              />
              <p className="text-xl line-clamp-2">{post.summary}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedBlogs;
