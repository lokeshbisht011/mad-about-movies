import Image from "next/image";
import Link from "next/link";

const BlogList = ({ posts }) => {
  return (
    <div className="flex flex-wrap gap-5 text-text">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="flex flex-col p-4 border rounded-md shadow-md w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)]"
        >
          <Link
            href={`/blogs/${post.slug}`}
            className="h-full flex flex-col justify-between"
          >
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            {post?.images?.cover && <img src={post.images.cover} fill alt={post.title} className="mt-5 mb-5" />}
            <p className="text-xl line-clamp-2">{post.summary}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
