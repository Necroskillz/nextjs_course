import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { STARTUPS_QUERYResult } from "@/sanity/types";

const StartupCard = ({ post }: { post: STARTUPS_QUERYResult[number] }) => {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(post._createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{post.views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.author?._id}`}>
            <p className="text-16-medium line-clamp-1">{post.author?.name}</p>
          </Link>
          <Link href={`/startup/${post._id}`}>
            <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
          </Link>
        </div>
        {post.author?.image && (
          <Link href={`/user/${post.author?._id}`}>
            <Image
              src={post.author?.image}
              alt={post.author?.name ?? ""}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        )}
      </div>

      <Link href={`/startup/${post._id}`}>
        <p className="startup-card_desc">{post.description}</p>

        {post.image && (
          <img
            src={post.image}
            alt={post.title ?? ""}
            className="startup-card_img"
          />
        )}
      </Link>

      <div className="flex-between mt-5 gap-3">
        <Link href={`/?query=${post.category?.toLowerCase()}`}>
          <p className="text-16-medium line-clamp-1">{post.category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${post._id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="startup-card_skeleton"></li>
      ))}
    </>
  );
};

export default StartupCard;
