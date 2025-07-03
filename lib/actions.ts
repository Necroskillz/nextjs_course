"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { Startup } from "@/sanity/types";

export const createPitch = async (
  state: any,
  formData: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session) {
    return {
      status: "ERROR",
      error: "Unauthorized",
    };
  }

  const { title, description, category, link } = Object.fromEntries(formData);
  const slug = (title as string).toLowerCase().split(" ").join("-");

  const startup: Omit<Startup, "_createdAt" | "_updatedAt" | "_rev" | "_id"> = {
    _type: "startup",
    title: title as string,
    description: description as string,
    category: category as string,
    image: link as string,
    slug: {
      _type: "slug",
      current: slug,
    },
    views: 0,
    pitch,
    author: {
      _type: "reference",
      _ref: session.id,
    },
  };

  try {
    const result = await writeClient.create(startup);

    return {
      status: "SUCCESS",
      id: result._id,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "ERROR",
      error: "Failed to create startup",
    };
  }
};
