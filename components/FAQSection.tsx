import type { FAQItem } from "@/lib/data";

type FAQSectionProps = {
  items: FAQItem[];
};

export default function FAQSection({ items }: FAQSectionProps) {
  return (
    <section className="bg-brand-offwhite py-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center fade-in-up">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">FAQ</p>
          <h2 className="mt-2 font-heading text-3xl text-brand-blue sm:text-4xl">Common Questions</h2>
        </div>

        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <details key={item.question} className="rounded-lg border border-slate-200 bg-white p-5 fade-in-up">
              <summary className="cursor-pointer list-none pr-6 font-semibold text-brand-blue">{item.question}</summary>
              <p className="mt-3 text-sm leading-relaxed text-brand-body">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
