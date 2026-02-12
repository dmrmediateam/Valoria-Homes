import type { BuildStep } from "@/lib/data";

type BuildProcessSectionProps = {
  steps: BuildStep[];
};

function StepIcon({ icon }: { icon: BuildStep["icon"] }) {
  if (icon === "chat") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M4 5h16v10H7l-3 3V5Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (icon === "blueprint") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 4v16M15 4v16M4 10h16M4 14h16" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }

  if (icon === "hammer") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="m6 18 6-6M11 7l2-2 4 4-2 2-4-4ZM5 19l4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (icon === "checklist") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M5 7h3M5 12h3M5 17h3M11 7h8M11 12h8M11 17h8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M9 14l6-6M8 15l-2 5 5-2 7-7-3-3-7 7Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function BuildProcessSection({ steps }: BuildProcessSectionProps) {
  return (
    <section className="bg-brand-offwhite py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl fade-in-up">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Our Process</p>
          <h2 className="mt-2 font-heading text-3xl text-brand-blue sm:text-4xl">How We Build with Confidence</h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">
            Every Valoria home follows a clear, proven process to keep quality high and your project moving forward.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step) => (
            <article key={step.step} className="rounded-lg border border-slate-200 bg-white p-6 fade-in-up">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white">
                <StepIcon icon={step.icon} />
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-brand-bronze">Step {step.step}</p>
              <h3 className="mt-4 font-heading text-2xl text-brand-blue">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-body">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
