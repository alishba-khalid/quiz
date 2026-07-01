export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  publishedAt: string;
  updatedAt?: string;
  body: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-write-quiz-questions",
    title: "How to write quiz questions that test understanding, not memory",
    excerpt:
      "Most quiz questions test whether students memorized the textbook. Here's how to write questions that reveal whether they actually understand the material.",
    category: "Teaching",
    readTime: "6 min read",
    date: "June 2026",
    publishedAt: "2026-06-01T00:00:00Z",
    body: `Most quiz questions are written in a hurry and test one thing: whether the student read the textbook. "What year did Columbus sail?" is a recall question. It has its place, but it doesn't tell you whether a student understands cause, consequence, or context.

Good quiz questions reveal understanding. They ask students to apply, compare, explain, or predict — not just recite.

Here are the principles that make quiz questions worth answering:

**1. Ask for the "why" not the "what"**

Instead of: "What is photosynthesis?"
Ask: "Why do plants need sunlight to grow?"

The second question requires the student to connect sunlight to the chemical process — not just repeat a definition.

**2. Use plausible wrong answers for multiple choice**

Bad distractors: A) Photosynthesis B) Gravity C) The moon D) France

Good distractors target common misconceptions. If students often confuse mitosis and meiosis, put both as options with subtle distinctions.

**3. Make short-answer questions specific**

"Explain photosynthesis" invites padding. "In one or two sentences, explain what a plant does with the glucose it produces" forces focus.

**4. Vary question types**

A mix of MCQ, true/false, fill-in-the-blank, and short answer keeps students engaged and tests different cognitive levels. QuizKraft can generate mixed-type worksheets from a single prompt.

**5. Test at the right difficulty level**

A grade-5 question on fractions should test concepts they've been taught — not pre-algebra they haven't seen. Over-hard questions frustrate; too-easy questions bore. Match the difficulty to where students actually are.

The best quiz isn't the hardest one. It's the one that tells you exactly what students know and don't know — and gives them a chance to fill the gaps.`,
  },
  {
    slug: "10-ways-teachers-saving-hours-ai",
    title: "10 ways teachers are saving hours with AI",
    excerpt:
      "From lesson planning to worksheet generation, AI is quietly eliminating the Sunday-evening prep grind for thousands of teachers. Here's how.",
    category: "AI in Education",
    readTime: "8 min read",
    date: "June 2026",
    publishedAt: "2026-06-15T00:00:00Z",
    body: `Sunday evening used to mean one thing for most teachers: prep. Worksheets to write, tests to format, rubrics to set up. AI tools are changing that — not by replacing teachers, but by handling the mechanical parts of the job so teachers can focus on the actual teaching.

Here are the ten areas where AI is making the biggest dent:

**1. Worksheet generation**

The most time-consuming prep task is now one of the fastest. Tools like QuizKraft let teachers describe a topic, choose a question type, and get a complete, printable worksheet in seconds.

**2. Quiz and test creation**

Same principle as worksheets — AI generates varied question formats (MCQ, short answer, true/false) and can mix types within a single assessment.

**3. Differentiated versions**

Need an easier version for struggling students and a harder one for advanced learners? Generate both in under a minute by adjusting the difficulty setting.

**4. Exit tickets**

A 3–5 question exit ticket used to take 15–20 minutes to write. Now it takes 30 seconds.

**5. Sub plans**

Emergency sub plans that include a complete activity are now a quick generate away — no more scrambling when you call in sick.

**6. Turning notes into quizzes**

Students can paste their own notes into a tool like QuizKraft and get a self-quiz that covers exactly what they studied — a huge win for study skills.

**7. Reading comprehension passages**

AI can generate reading passages at specific grade levels on any topic, paired with comprehension questions.

**8. Rubric generation**

Describe the assignment, and AI can generate a clear, criteria-based rubric. Saves 20–30 minutes per project.

**9. Parent communication drafts**

AI can draft progress update emails and newsletter copy in the teacher's voice, then the teacher edits and sends.

**10. Feedback on student writing**

AI can flag structural issues and surface common errors in student writing, giving teachers a faster starting point for feedback.

The common thread: AI handles the first draft. Teachers bring the judgment, the relationship, and the expertise that no tool can replicate. Used well, AI gives teachers back time to do more of what they actually went into teaching to do.`,
  },
  {
    slug: "turn-any-pdf-into-practice-quiz",
    title: "Turn any source material into a practice quiz in 60 seconds",
    excerpt:
      "Your textbook chapters, lecture slides, and notes are all latent quiz material. Here's how to convert them into active recall practice in under a minute.",
    category: "How-To",
    readTime: "4 min read",
    date: "May 2026",
    publishedAt: "2026-05-01T00:00:00Z",
    body: `You have a textbook chapter, a set of lecture slides, or a dense article. Your students need to study it. What's the fastest way to turn passive reading into active practice?

Paste the text into QuizKraft and generate a quiz from the material itself.

Here's the exact process:

**Step 1: Copy the text**

Open your document, select the relevant section — a chapter, a few key pages, or a full article — and copy the text.

**Step 2: Paste into QuizKraft**

On the generator page, click "Paste text / source material" (available on Pro) and paste what you copied. QuizKraft reads it and uses it as the basis for the questions.

**Step 3: Choose your settings**

Pick question types (multiple choice, short answer, or a mix), set the difficulty, and choose how many questions. For a study quiz, 5–10 questions is usually enough for a single session.

**Step 4: Generate**

Hit generate. In about 10 seconds, you have a quiz built directly from your source material — not generic questions about the topic, but questions that reference the specific concepts in the text.

**Step 5: Use the study loop**

Switch to quiz mode and work through the questions. Wrong answers come back for review until they're mastered. By the end of one session, students have actively engaged with the material at least twice.

This workflow works especially well for:

- Textbook chapter reviews before a test
- Turning lecture notes into a study tool
- Creating practice material from any article or reading assignment

The key insight: passive re-reading is one of the least effective study strategies. Active recall — trying to retrieve information before looking it up — is one of the most effective. Turning your material into a quiz forces active recall in about 60 seconds.`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
