import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id,
    name, 
    image,
  },
  views,
  description,
  category,
  image,
}`);

export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && author._ref == $id] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id,
    name, 
    image,
  },
  views,
  description,
  category,
  image,
}`);

export const STARTUP_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0] {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id,
    name,
    username,
    image,
  },
  views,
  description,
  category,
  image,
  pitch
}`);

export const PLAYLISTS_QUERY =
  defineQuery(`*[_type == "playlist" && defined(slug.current) && slug.current == $slug][0] {
  _id,
  title,
  select[]->{
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id,
      name,
      username,
      image,
    },
    views,
    description,
    category,
    image,
  }
}`);

export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0] {
  views
}`);

export const AUTHOR_BY_GITHUB_ID_QUERY =
  defineQuery(`*[_type == "author" && id == $id][0] {
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`);

export const AUTHOR_BY_ID_QUERY =
  defineQuery(`*[_type == "author" && _id == $id][0] {
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`);
