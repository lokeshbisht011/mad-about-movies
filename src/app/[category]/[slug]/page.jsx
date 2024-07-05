import React from "react";
import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponents } from "@mdx-js/react";
import { Mdx } from "@/app/components/Mdx";

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
    <div className="mx-auto max-w-2xl border-black p-5 mt-5">
      <Mdx code={doc.body.code} />
    </div>
  );
};

export default page;
