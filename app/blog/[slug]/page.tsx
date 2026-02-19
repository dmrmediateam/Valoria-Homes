import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { postBySlugQuery, postSlugsQuery } from "@/lib/sanity.queries";
import type { PortableTextBlock } from "sanity";
import PortableText from "@/components/PortableText";
import SEOWrapper from "@/components/SEOWrapper";
import { buildArticleSchema, type JsonLd } from "@/lib/structured-data";

type Post = {
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

export const revalidate = 60;

async function getPost(slug: string) {
  return client.fetch<Post | null>(postBySlugQuery, { slug });
}

async function getPostSlugs() {
  return client.fetch<Array<{ slug: string }>>(postSlugsQuery);
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const title = post.seo?.metaTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.excerpt ?? undefined;

  return {
    title,
    description,
    keywords: post.seo?.keywords,
    robots: {
      index: !post.seo?.noIndex,
      follow: !post.seo?.noFollow
    },
    alternates: post.seo?.canonicalUrl ? { canonical: post.seo.canonicalUrl } : undefined,
    openGraph: {
      title: post.seo?.ogTitle ?? title,
      description: post.seo?.ogDescription ?? description,
      images: post.seo?.ogImage ? [post.seo.ogImage] : post.mainImage ? [post.mainImage] : undefined
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const articleSchema: JsonLd = buildArticleSchema({
    title: post.title,
    slug: `/blog/${post.slug}`,
    description: post.excerpt ?? post.seo?.metaDescription ?? undefined,
    publishedAt: post.publishedAt,
    image: post.mainImage ?? undefined,
    author: post.author?.name
  });

  return (
    <SEOWrapper slug={`/blog/${slug}`} extraSchemas={[articleSchema]}>
      <article className="bg-brand-offwhite py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link href="/blogs" className="text-brand-bronze hover:underline">
              ← Back to Blog
            </Link>
          </nav>

          <header className="mb-10">
            <time dateTime={post.publishedAt} className="text-sm text-brand-body/70">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </time>
            <h1 className="mt-2 font-heading text-4xl font-black text-brand-blue md:text-5xl">
              {post.title}
            </h1>
            {post.author?.name && (
              <p className="mt-3 text-base text-brand-body">By {post.author.name}</p>
            )}
          </header>

          {post.mainImage && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={post.mainImage}
                alt={post.mainImageAlt ?? post.title}
                fill
                className="object-cover"
                sizes="(max-width: 800px) 100vw, 800px"
                priority
              />
            </div>
          )}

          {post.body && post.body.length > 0 && (
            <div className="prose-custom">
              <PortableText value={post.body} />
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-brand-offwhite px-3 py-1 text-sm text-brand-body"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </SEOWrapper>
  );
}
