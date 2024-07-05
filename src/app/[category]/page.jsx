import { allBlogs } from "contentlayer/generated";
import BlogList from "../components/BlogList";

const BlogPage = () => {
  const blogs = allBlogs;
  const topPosts = blogs.slice(0, 3); // Example: Top 3 posts
  const otherPosts = blogs.slice(3);

  return (
    <div className="container mx-auto px-4 mt-5">
      <h1 className="text-5xl font-bold mb-8 text-center">Blog</h1>
      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-4">All Blogs</h2>
        <BlogList posts={blogs} />
      </section>
    </div>
  );
};

export default BlogPage;
