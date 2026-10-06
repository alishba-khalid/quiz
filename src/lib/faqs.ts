// Shared by the FAQ accordion and the FAQPage structured data, so the schema
// always matches the questions visible on the page.
export const GENERAL_FAQS: { q: string; a: string }[] = [
  {
    q: "Is there a free plan?",
    a: "No. Generating quizzes requires Pro ($9/month, unlimited generations) or a School plan.",
  },
  {
    q: "What subjects and grades does it cover?",
    a: "Any subject, any grade. Math, science, history, literature, languages — from kindergarten through college. Just type the topic and select the grade.",
  },
  {
    q: "Can I edit the questions?",
    a: "Not yet — editing is on the roadmap. For now, regenerate with a more specific topic if a question isn't right. The AI produces better questions the more specific you are.",
  },
  {
    q: "Can I use my own material?",
    a: "Yes, on Pro. Paste in text from your notes, textbook, or any source, and QuizKraft generates questions directly from that material — great for turning chapters or study notes into a quiz.",
  },
  {
    q: "Can students take quizzes online?",
    a: "Yes. In quiz mode, students click through questions, get scored instantly, and wrong answers come back for review until they get them right. Generate a worksheet and enter quiz mode directly in the app.",
  },
  {
    q: "Can I print or export?",
    a: "Yes. Every worksheet has a clean print layout. Pro includes clean PDF export with no watermark.",
  },
  {
    q: "Do you offer school or team plans?",
    a: "Yes. The School plan is $19 per teacher per month and gives every teacher on your team full Pro access. We set it up with you directly, so email us with how many teachers you have.",
  },
];

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
