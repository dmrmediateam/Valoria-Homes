import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Valoria Homes to discuss floor plans, timelines, and next steps for building your modular home."
};

export default function ContactPage() {
  return (
    <section className="bg-brand-offwhite py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="fade-in-up">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Contact</p>
          <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">Let&apos;s Start the Conversation</h1>
          <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">
            Reach out to discuss your floor plan goals, budget range, and timeline. We are here to help you take the
            next step with confidence.
          </p>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="font-heading text-2xl text-brand-blue">Contact Information</h2>
            <p className="mt-4 text-sm text-brand-body">
              Phone: <a href="tel:+12622045534" className="font-semibold text-brand-blue">+1 (262) 204-5534</a>
            </p>
            <p className="mt-2 text-sm text-brand-body">
              Email: <a href="mailto:Jade@valoriahomes.com" className="font-semibold text-brand-blue">Jade@valoriahomes.com</a>
            </p>
          </div>
        </div>

        <div className="fade-in-up">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
