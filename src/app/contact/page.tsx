import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us | QuizKraft",
  description:
    "Get in touch with QuizKraft. Send us questions, feedback, feature requests, or inquire about school licensing.",
  alternates: { canonical: "https://www.quizkraft.tech/contact" },
  openGraph: {
    title: "Contact Us | QuizKraft",
    description: "Got questions, feedback, or custom requests? Contact the QuizKraft team today.",
    type: "website",
    url: "https://www.quizkraft.tech/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | QuizKraft",
    description: "Got questions, feedback, or custom requests? Contact the QuizKraft team today.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quizkraft.tech" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.quizkraft.tech/contact" },
  ],
};

const organizationContactSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QuizKraft",
  url: "https://www.quizkraft.tech",
  logo: "https://www.quizkraft.tech/apple-icon.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "alishbakhalid766@gmail.com",
    contactType: "customer support",
    availableLanguage: "English",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={organizationContactSchema} />

      {/* Page Header */}
      <section className="border-b border-hairline bg-surface py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.02em] mb-4"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Get in touch.
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            Have questions about pricing, feature requests, or need custom worksheets? Drop us a line and we'll reply right away.
          </p>
        </div>
      </section>

      {/* Main Form container */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex-1">
        <ContactForm />
      </section>
    </div>
  );
}
