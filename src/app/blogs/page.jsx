import { allBlogs } from "contentlayer/generated";
import BlogList from "../components/BlogList";
import moviesArray from "../../../public/movies.json";

const BlogPage = () => {
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  const blogs = allBlogs;

  const movieBlogs = Object.keys(moviesArray).map((char) => ({
    title: `Bollywood Movies Starting from ${char.toUpperCase()}`,
    slug: `bollywood-movies-starting-from-${char}`,
    summary: `List of Bollywood movies that start with the letter ${char.toUpperCase()}`,
    tags: ["Bollywood", "Movies", char.toUpperCase()],
    body: {
      code: JSON.stringify(moviesArray[char]),
    },
  }));
  const combinedBlogs = [...blogs, ...movieBlogs];

  shuffle(blogs);

  return (
    <div className="container mx-auto px-4 mt-5 text-text" >
      <h1 className="md:text-5xl text-4xl font-bold mb-8 text-center">BLOGS</h1>
      <section className="mt-8">
        <BlogList posts={blogs} />
      </section>
    </div>
  );
};

export default BlogPage;
