import React from "react";
import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/Mdx";
import RelatedBlogs from "@/app/components/RelatedBlogs";

async function getDocFromParams(slug) {
  const doc = allBlogs.find((doc) => doc.slug === slug);

  if (!doc) {
    notFound();
  }

  return doc;
}

const page = async ({ params }) => {
  const doc = await getDocFromParams(params.slug);
  return (
    <div>
      <div className="mx-auto max-w-2xl text-text p-5 mt-5">
        <Mdx code={doc.body.code} />
      </div>
      <hr className='mx-5'></hr>
      <RelatedBlogs currentBlogTags={doc.tags} currentBlogId={doc._id} />
    </div>
  );
};

export default page;
