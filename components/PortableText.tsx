import { PortableText as PortableTextRender, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";
import { urlForImage } from "@/lib/sanity";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 font-heading text-3xl font-black text-brand-blue md:text-4xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 mb-3 font-heading text-2xl font-bold text-brand-blue md:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-5 mb-2 font-heading text-xl font-bold text-brand-body md:text-2xl">{children}</h3>
    ),
    normal: ({ children }) => <p className="mb-4 text-base leading-relaxed text-brand-body">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand-bronze bg-brand-offwhite py-2 pl-6 pr-4 italic text-brand-body">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => <ul className="my-4 list-disc space-y-2 pl-6 text-brand-body">{children}</ul>,
    number: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-6 text-brand-body">{children}</ol>
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-base leading-relaxed">{children}</li>
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-brand-bronze underline hover:text-brand-blue"
      >
        {children}
      </a>
    )
  },
  types: {
    image: ({ value }) => {
      if (!value) return null;
      const url = urlForImage(value).width(1200).url();
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={value.alt ?? ""} className="w-full rounded-lg object-cover" />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm italic text-brand-body">{value.caption}</figcaption>
          )}
        </figure>
      );
    }
  }
};

type PortableTextProps = {
  value: PortableTextBlock[];
};

export default function PortableText({ value }: PortableTextProps) {
  if (!value?.length) return null;
  return <PortableTextRender value={value} components={components} />;
}
