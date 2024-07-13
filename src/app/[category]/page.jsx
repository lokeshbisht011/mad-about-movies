import { allBlogs } from "contentlayer/generated";
import BlogList from "../components/BlogList";

const BlogPage = () => {
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  const blogs = allBlogs;
  shuffle(blogs);

  return (
    <div className="container mx-auto px-4 mt-5 text-text">
      <h1 className="md:text-5xl text-4xl font-bold mb-8 text-center">BLOGS</h1>
      <section className="mt-8">
        <BlogList posts={blogs} />
      </section>
    </div>
  );
};

export default BlogPage;
