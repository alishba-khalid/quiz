import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

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
    "Generate clean, printable worksheets and quizzes for any subject and grade — then let students practice with a built-in retake loop. Free to start.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://quizkraft.app"),
  openGraph: {
    title: "QuizKraft | AI Worksheet & Quiz Generator",
    description: "Worksheets and quizzes worth handing out — built by AI in seconds.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizKraft | AI Worksheet & Quiz Generator",
    description: "Worksheets and quizzes worth handing out — built by AI in seconds.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full bg-canvas text-ink font-sans flex flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
