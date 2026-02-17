import Link from "next/link";
import { contentRegistry, getContentEntry } from "@/lib/content-registry";

type RelatedContentProps = {
  currentSlug: string;
  limit?: number;
};

export default function RelatedContent({ currentSlug, limit = 5 }: RelatedContentProps) {
  const current = getContentEntry(currentSlug);

  if (!current) {
    return null;
  }

  const related = contentRegistry
    .filter((entry) => entry.slug !== currentSlug)
    .map((entry) => ({
      ...entry,
      relevance:
        (entry.category === current.category ? 3 : 0) +
        entry.tags.filter((tag) => current.tags.includes(tag)).length
    }))
    .filter((entry) => entry.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);

  if (related.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Related pages" className="mt-10 rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="font-heading text-2xl text-brand-blue">Related Coverage</h2>
      <ul className="mt-4 space-y-2">
        {related.map((entry) => (
          <li key={entry.slug}>
            <Link href={entry.slug} className="text-sm text-brand-body hover:text-brand-blue">
              {entry.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
