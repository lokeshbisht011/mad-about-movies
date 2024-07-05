import Image from "next/image";
import Link from "next/link";

const BlogList = ({ posts }) => {
  return (
    <div className="flex flex-wrap gap-5">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="flex flex-col p-4 border rounded-md shadow-md w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)]"
        >
          <Link
            href={`/${post._raw.flattenedPath}`}
            className="h-full flex flex-col justify-between"
          >
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <div className="md:h-72 md:w-96 h-[140px] w-[330px] relative my-5">
              <Image src={post.images.cover} fill alt={post.title} />
            </div>
            <p className="text-xl">{post.summary}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
