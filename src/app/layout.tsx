import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "QuizKraft | AI Worksheet & Quiz Generator for Teachers",
  description:
    "Generate clean, printable worksheets and quizzes for any subject and grade in seconds. Free AI quiz maker for teachers with instant answer keys and adaptive retake study loops.",
  metadataBase: new URL("https://www.quizkraft.tech"),
  alternates: {
    canonical: "https://www.quizkraft.tech",
  },
  keywords: [
    "AI worksheet generator",
    "free printable worksheet maker",
    "quiz maker for teachers",
    "AI quiz generator",
    "pdf to quiz converter",
    "free test maker for teachers",
    "multiple choice quiz generator",
    "classroom assessment tool",
    "printable quiz with answer key",
    "educational AI tools",
    "study loop quiz generator",
    "teacher lesson plan tools"
  ],
  authors: [{ name: "QuizKraft Team", url: "https://www.quizkraft.tech/about" }],
  creator: "QuizKraft",
  publisher: "QuizKraft",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ovrOyhHF-Agd-qwiBVDA35SzjaHG1-AU2WqpA2QWLNI",
  },
  openGraph: {
    title: "QuizKraft | AI Worksheet & Quiz Generator for Teachers",
    description: "Worksheets and quizzes worth handing out — built by AI in seconds. Printable PDFs with answer keys.",
    url: "https://www.quizkraft.tech",
    type: "website",
    locale: "en_US",
    siteName: "QuizKraft",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "QuizKraft | AI Worksheet & Quiz Generator for Teachers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizKraft | AI Worksheet & Quiz Generator for Teachers",
    description: "Generate clean, printable worksheets & quizzes in seconds with AI. Answer keys included.",
    images: ["/opengraph-image"],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QuizKraft",
  url: "https://www.quizkraft.tech",
  logo: "https://www.quizkraft.tech/icon",
  description: "AI-powered worksheet and quiz generator designed for teachers, educators, and students.",
  sameAs: [
    "https://twitter.com/quizkraft",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "QuizKraft",
  url: "https://www.quizkraft.tech",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.quizkraft.tech/quiz-generator?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full bg-canvas text-ink font-sans flex flex-col antialiased">
        <JsonLd data={orgSchema} />
        <JsonLd data={webSiteSchema} />
        <Providers>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
