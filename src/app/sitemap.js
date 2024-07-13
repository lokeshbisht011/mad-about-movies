import { allBlogs } from 'contentlayer/generated';

export default async function sitemap() {
  return allBlogs.map((post) => ({
    url: `https://www.madaboutmovies.in/blogs/${post.slug}`,
    lastModified: post.date,
  }))
}