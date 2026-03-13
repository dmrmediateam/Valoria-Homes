import "server-only";

import { client } from "@/lib/sanity";
import { postBySlugQuery, postSitemapQuery, postSlugsQuery, postsQuery } from "@/lib/sanity.queries";
import type { PortableTextBlock } from "sanity";

export type BlogPostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  mainImage: string | null;
  mainImageAlt: string | null;
  publishedAt: string;
  author: string | null;
  tags: string[] | null;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: PortableTextBlock[];
  mainImage: string | null;
  mainImageAlt: string | null;
  publishedAt: string;
  author: { name?: string; image?: unknown } | null;
  tags: string[] | null;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    noFollow?: boolean;
  } | null;
};

export type BlogSitemapEntry = {
  slug: string;
  publishedAt: string;
  updatedAt: string;
  noIndex: boolean;
};

export const BLOG_TAGS = {
  posts: "sanity:posts"
} as const;

export const BLOG_REVALIDATE_TAGS = Object.values(BLOG_TAGS);

export async function getBlogPostsSource(): Promise<BlogPostSummary[]> {
  try {
    const posts = await client.fetch<BlogPostSummary[]>(postsQuery, {}, {
      useCdn: false,
      next: {
        tags: [BLOG_TAGS.posts]
      }
    });

    return posts ?? [];
  } catch {
    return [];
  }
}

export async function getBlogPostBySlugSource(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch<BlogPost | null>(postBySlugQuery, { slug }, {
      useCdn: false,
      next: {
        tags: [BLOG_TAGS.posts]
      }
    });
  } catch {
    return null;
  }
}

export async function getBlogPostSlugsSource(): Promise<Array<{ slug: string }>> {
  try {
    const slugs = await client.fetch<Array<{ slug: string }>>(postSlugsQuery, {}, {
      useCdn: false,
      next: {
        tags: [BLOG_TAGS.posts]
      }
    });

    return slugs ?? [];
  } catch {
    return [];
  }
}

export async function getBlogSitemapEntriesSource(): Promise<BlogSitemapEntry[]> {
  try {
    const posts = await client.fetch<
      Array<{
        slug: string;
        publishedAt: string;
        _updatedAt: string;
        noIndex?: boolean;
      }>
    >(postSitemapQuery, {}, {
      useCdn: false,
      next: {
        tags: [BLOG_TAGS.posts]
      }
    });

    return (posts ?? [])
      .filter((post) => Boolean(post.slug) && !post.noIndex)
      .map((post) => ({
        slug: post.slug,
        publishedAt: post.publishedAt,
        updatedAt: post._updatedAt,
        noIndex: Boolean(post.noIndex)
      }));
  } catch {
    return [];
  }
}
