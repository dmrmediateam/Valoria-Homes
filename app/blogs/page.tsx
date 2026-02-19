import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { postsQuery } from "@/lib/sanity.queries";
import SEOWrapper from "@/components/SEOWrapper";
import type { JsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Blog",
  description: "Insights and updates on modular homes, building tips, and the Valoria Homes community."
};

export const revalidate = 60;

async function getPosts() {
  return client.fetch<Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    mainImage: string | null;
    mainImageAlt: string | null;
    publishedAt: string;
    author: string | null;
    tags: string[] | null;
  }>>(postsQuery);
}

export default async function BlogsPage() {
  const posts = await getPosts();

  const articleListSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Valoria Homes Blog",
    description: metadata.description,
    url: "https://www.valoriahomes.com/blogs",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.publishedAt,
      url: `https://www.valoriahomes.com/blog/${post.slug}`,
      author: post.author ? { "@type": "Person", name: post.author } : undefined
    }))
  };

  return (
    <SEOWrapper slug="/blogs" extraSchemas={[articleListSchema]}>
      <section className="bg-brand-offwhite py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
          <header className="mb-12">
            <h1 className="font-heading text-4xl font-black text-brand-blue md:text-5xl">Blog</h1>
            <p className="mt-4 max-w-2xl text-lg text-brand-body">Insights and updates on modular homes, building tips, and the Valoria Homes community.</p>
          </header>

          {posts.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
              <p className="text-lg text-brand-body">No blog posts yet. Check back soon!</p>
              <p className="mt-4 text-sm text-brand-body/80">
                Content is managed in Sanity. Visit{" "}
                <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer" className="text-brand-bronze hover:underline">
                  Sanity Studio
                </a>{" "}
                to add posts.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <article key={post._id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card transition hover:shadow-lg">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[16/10]">
                      {post.mainImage ? (
                        <Image
                          src={post.mainImage}
                          alt={post.mainImageAlt ?? post.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-brand-offwhite">
                          <span className="text-4xl text-brand-body/30">📄</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <time dateTime={post.publishedAt} className="text-sm text-brand-body/70">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </time>
                      <h2 className="mt-2 font-heading text-xl font-bold text-brand-blue hover:text-brand-bronze">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-3 line-clamp-3 text-base text-brand-body">{post.excerpt}</p>
                      )}
                      {post.author && (
                        <p className="mt-3 text-sm text-brand-body/80">By {post.author}</p>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SEOWrapper>
  );
}
