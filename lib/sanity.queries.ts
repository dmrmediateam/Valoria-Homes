export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "mainImage": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  publishedAt,
  "author": author.name,
  tags,
  "seo": seo {
    metaTitle,
    metaDescription,
    keywords,
    ogTitle,
    ogDescription,
    "ogImage": ogImage.asset->url
  }
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  "mainImage": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  publishedAt,
  "author": author,
  tags,
  "seo": seo {
    metaTitle,
    metaDescription,
    keywords,
    ogTitle,
    ogDescription,
    "ogImage": ogImage.asset->url,
    canonicalUrl,
    noIndex,
    noFollow
  }
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;
