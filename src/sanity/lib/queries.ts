import { defineQuery } from "next-sanity";

export const newsListQuery = defineQuery(`
  *[
    _type == "news" &&
    defined(slug.current) &&
    !(_id in path("drafts.**")) &&
    status == "published"
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage,
    status
  }
`);

export const newsBySlugQuery = defineQuery(`
  *[
    _type == "news" &&
    slug.current == $slug &&
    !(_id in path("drafts.**")) &&
    status == "published"
  ][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage,
    body,
    status
  }
`);

export const pagesQuery = defineQuery(`
  *[_type == "sitePage" && defined(slug.current)] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    status
  }
`);
