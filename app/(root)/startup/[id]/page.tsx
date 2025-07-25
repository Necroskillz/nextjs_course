import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PLAYLISTS_QUERY, STARTUP_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard from "@/components/StartupCard";

export const experimental_ppr = true;

const StartupPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const [post, editorPicks] = await Promise.all([
    client.fetch(STARTUP_QUERY, { id }),
    client.fetch(PLAYLISTS_QUERY, { slug: "editor-picks" }),
  ]);

  if (!post) {
    notFound();
  }

  const parsedPitch = markdownit().render(post.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        {post.image && (
          <img
            src={post.image}
            alt="thumbnail"
            className="w-full h-auto rounded-xl"
          />
        )}
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              {post.author?.image && (
                <Image
                  src={post.author?.image}
                  alt={post.author?.name ?? ""}
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />
              )}

              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-semibold">Pitch Details</h3>

          {parsedPitch ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedPitch }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {editorPicks?.select?.length && editorPicks.select.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>
            <ul className="mt-7 card_grid-sm">
              {editorPicks.select.map((post) => (
                <StartupCard key={post._id} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default StartupPage;
