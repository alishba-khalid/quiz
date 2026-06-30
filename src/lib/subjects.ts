export interface ExampleQuestion {
  type: "multiple-choice" | "true-false" | "short-answer" | "fill-in-the-blank";
  question: string;
  answer: string;
}

export interface SubjectData {
  slug: string;
  name: string;
  gradeRange: string;
  intro: string;
  exampleQuestions: ExampleQuestion[];
  gradeGuidance: string;
  faq: Array<{ q: string; a: string }>;
  relatedSlugs: string[];
}

export const quizSubjects: SubjectData[] = [
  {
    slug: "biology",
    name: "Biology",
    gradeRange: "Grades 7–12",
    intro:
      "Biology quizzes test more than memorization — they reveal whether students understand how living systems actually work. AI-generated biology questions perform best when they mix terminology identification (MCQ), process explanation (short answer), and conceptual true/false checks in a single assessment. That mix catches different types of misunderstanding.",
    exampleQuestions: [
      { type: "multiple-choice", question: "Which organelle is responsible for producing ATP through cellular respiration?", answer: "Mitochondria (not the nucleus, ribosome, or Golgi apparatus)" },
      { type: "short-answer", question: "Explain the difference between mitosis and meiosis in one sentence.", answer: "Mitosis produces two identical diploid cells for growth and repair; meiosis produces four genetically unique haploid cells for sexual reproduction." },
      { type: "true-false", question: "DNA replication occurs during the S (synthesis) phase of the cell cycle.", answer: "True" },
    ],
    gradeGuidance:
      "Grades 7–8: cells, ecosystems, and basic genetics. Grades 9–10: genetics, evolution, and anatomy. AP/advanced: molecular biology, biochemistry, and ecology. Set your grade level to calibrate vocabulary and concept depth.",
    faq: [
      { q: "What question types work best for biology quizzes?", a: "MCQ works well for terminology and classification. Short answer is best for explaining processes like photosynthesis or meiosis. True/false efficiently catches conceptual misconceptions. Mixing all three in one quiz covers the most ground." },
      { q: "Can I make biology quizzes for AP or college-level content?", a: "Yes. Set difficulty to Hard and specify the exact topic: 'AP Biology — cellular respiration and the electron transport chain' will give you appropriately rigorous questions." },
      { q: "How many questions make a good biology unit quiz?", a: "15–20 questions gives thorough coverage for a unit test. 5–10 works well for formative checks and exit tickets. Adjust based on how long you want the assessment to take." },
      { q: "Can the quiz cover lab procedures and lab safety?", a: "Yes. Include the lab or procedure name in your topic prompt: 'mitosis lab, microscope procedures, and slide preparation' will generate relevant questions." },
    ],
    relatedSlugs: ["chemistry", "earth-science", "vocabulary"],
  },
  {
    slug: "algebra",
    name: "Algebra",
    gradeRange: "Grades 6–10",
    intro:
      "Algebra quizzes test procedural fluency alongside conceptual understanding. The most revealing algebra assessments mix symbolic manipulation (fill-in-blank), word problems (short answer), and concept identification (MCQ) in a single quiz — because being able to solve an equation and being able to explain what that equation means are different skills worth testing separately.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Solve for x: 3x − 9 = 12. x = ____", answer: "x = 7" },
      { type: "multiple-choice", question: "Which of the following is NOT a solution to y = 2x + 1? A) (0, 1)  B) (1, 3)  C) (2, 4)  D) (3, 7)", answer: "C) (2, 4) — because 2(2) + 1 = 5, not 4" },
      { type: "short-answer", question: "A coffee shop charges $2.50 per pastry plus a $1.00 bag fee. Write an equation for total cost (C) for p pastries.", answer: "C = 2.50p + 1.00" },
    ],
    gradeGuidance:
      "Grades 6–7: ratios, proportions, and one-step expressions. Grade 8: two-step equations and linear functions. Grades 9–10: systems of equations, quadratics, and inequalities. Be specific about the sub-topic to get targeted questions.",
    faq: [
      { q: "Can it generate algebra word problems specifically?", a: "Yes. Include 'word problems' in your topic prompt — for example, 'linear equations word problems, Grade 8' — and the generator will weight toward applied problems rather than symbolic manipulation only." },
      { q: "Does it cover graphing linear equations?", a: "Short answer questions can ask students to identify slope and y-intercept from an equation, or to describe what a graph would look like. For physical graphing practice, pair the quiz with graphing paper." },
      { q: "Can it quiz both linear equations and quadratics?", a: "Yes. Specify which you want: 'solving quadratic equations by factoring' or 'linear vs. quadratic functions' for a comparison quiz." },
      { q: "What grade level is standard for algebra?", a: "Core Algebra 1 is typically grade 8–9. Pre-algebra concepts for grades 6–7. Algebra 2 and advanced topics for grades 10+. Specify the course name if your school uses non-standard sequencing." },
    ],
    relatedSlugs: ["geometry", "fractions", "physics"],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    gradeRange: "Grades 9–12",
    intro:
      "Chemistry quizzes span atomic structure, bonding, reactions, and stoichiometry. Effective chemistry questions require applying concepts — asking why a reaction occurs or what property explains an observation — rather than just naming elements or recalling formulas. The gap between knowing a definition and understanding a concept is widest in chemistry.",
    exampleQuestions: [
      { type: "multiple-choice", question: "Which type of bond involves the equal sharing of electron pairs between two atoms of the same element? A) Polar covalent  B) Ionic  C) Nonpolar covalent  D) Metallic", answer: "C) Nonpolar covalent" },
      { type: "short-answer", question: "Why do noble gases rarely form chemical bonds with other elements?", answer: "Noble gases have full valence electron shells (8 electrons, except helium with 2), so they have very low reactivity and no tendency to gain or lose electrons." },
      { type: "true-false", question: "The atomic mass of an element equals the number of protons plus the number of neutrons in its most common isotope.", answer: "True (approximately — technically it's the weighted average of all isotopes)" },
    ],
    gradeGuidance:
      "Grades 9–10: atoms, periodic table, basic bonding, and reaction types. Grades 11–12: thermodynamics, kinetics, and equilibrium. AP Chemistry requires quantitative problem-solving — set difficulty to Hard for that level.",
    faq: [
      { q: "Can it generate balancing chemical equations as quiz questions?", a: "Yes. Use short answer type and include 'balancing equations' in your topic: 'balancing combustion reactions, Grade 10 chemistry'." },
      { q: "Does it cover organic chemistry?", a: "Yes. Set your topic to 'organic chemistry — functional groups' or 'naming hydrocarbons' for targeted organic questions." },
      { q: "What's the best question mix for a chemistry test?", a: "MCQ for conceptual understanding and periodic trend identification; short answer for calculations and explanations; true/false for checking common misconceptions like 'all ionic compounds are soluble'." },
      { q: "Can it quiz lab safety and laboratory procedures?", a: "Yes. Include 'lab safety' or the specific experiment in your topic prompt." },
    ],
    relatedSlugs: ["biology", "physics", "earth-science"],
  },
  {
    slug: "us-history",
    name: "US History",
    gradeRange: "Grades 8–12",
    intro:
      "US History quizzes reveal whether students understand causation and consequence, not just chronology. AI-generated history questions perform best when they ask students to explain significance, compare perspectives, or connect events to broader themes — not just recall dates and names. A quiz that asks 'why' tells you far more than one that asks 'when.'",
    exampleQuestions: [
      { type: "multiple-choice", question: "Which constitutional principle was most directly established by Marbury v. Madison (1803)? A) Separation of powers  B) Judicial review  C) States' rights  D) Popular sovereignty", answer: "B) Judicial review" },
      { type: "short-answer", question: "Explain one economic cause of the Great Depression.", answer: "Overproduction in industry and agriculture led to falling prices and widespread layoffs — also acceptable: stock market speculation on margin, bank failures, or the Smoot-Hawley Tariff." },
      { type: "true-false", question: "The Civil Rights Act of 1964 prohibited racial discrimination in public accommodations and in employment.", answer: "True" },
    ],
    gradeGuidance:
      "Grade 8: US history survey, colonial to Reconstruction. Grades 10–11: full survey from founding to modern era. AP US History (grades 11–12): requires sourcing, contextualization, and argumentation — use Hard difficulty and include document-based prompts.",
    faq: [
      { q: "Can it make quizzes about specific eras rather than all of US history?", a: "Yes. Specify the era: 'Reconstruction era,' 'Progressive movement 1890–1920,' or 'Civil Rights Movement 1950–1968' for focused assessment." },
      { q: "Can it cover primary sources and document analysis?", a: "Yes. Include the document name: 'Federalist No. 51 — checks and balances' or 'Emancipation Proclamation — causes and context'." },
      { q: "Is it good for AP US History prep?", a: "Yes. Set difficulty to Hard and include specific themes: 'AP US History — Gilded Age, labor movements, and political machines.'" },
      { q: "What question types work best for history?", a: "MCQ for identifying events, figures, and legislation. Short answer for causation and significance. True/false for checking common historical misconceptions." },
    ],
    relatedSlugs: ["world-history", "grammar", "vocabulary"],
  },
  {
    slug: "grammar",
    name: "Grammar",
    gradeRange: "Grades 4–10",
    intro:
      "Grammar quizzes check students' ability to identify, apply, and correct language rules in context. Fill-in-the-blank and short answer questions tend to reveal grammar understanding better than multiple choice alone — they require application rather than just recognition, which is the skill that matters in actual writing.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Complete with the correct verb form: She ______ (run) three miles every morning before school.", answer: "runs" },
      { type: "multiple-choice", question: "Which sentence contains a dangling modifier? A) Running quickly to catch the bus, she barely made it.  B) Running quickly, the bus was barely missed.", answer: "B — 'running quickly' should modify a person, not the bus" },
      { type: "true-false", question: "A semicolon can be used to join two independent clauses without a coordinating conjunction.", answer: "True" },
    ],
    gradeGuidance:
      "Grades 4–5: basic parts of speech, capitalization, end punctuation. Grades 6–7: sentence types, clauses, and complex punctuation. Grades 8–10: modifiers, parallel structure, and style. Specify the exact rule or concept for focused practice.",
    faq: [
      { q: "Can it quiz specific grammar rules like comma usage?", a: "Yes. Include the rule in your topic: 'comma rules — introductory phrases, compound sentences, and Oxford comma usage.'" },
      { q: "Is it good for ESL or EFL students?", a: "Yes. Specify 'ESL grammar' and a simpler difficulty level. Topic prompts like 'subject-verb agreement for ESL learners' produce calibrated questions." },
      { q: "Can it make grammar quizzes for SAT or ACT Writing prep?", a: "Yes. Set grade to 'Grade 11–12' and topic to 'SAT grammar — sentence correction and expression of ideas.'" },
      { q: "Can I quiz verb tenses specifically?", a: "Yes. Specify 'present perfect vs. simple past' or 'irregular past tense verbs' for targeted verb tense quizzes." },
    ],
    relatedSlugs: ["vocabulary", "us-history", "world-history"],
  },
  {
    slug: "physics",
    name: "Physics",
    gradeRange: "Grades 9–12",
    intro:
      "Physics quizzes blend conceptual reasoning with quantitative problem-solving. The most useful physics questions ask students to identify which law applies, set up a calculation, or interpret a scenario — not just recall formulas. Real understanding shows in application: students who understand Newton's second law can use it in unfamiliar situations.",
    exampleQuestions: [
      { type: "multiple-choice", question: "A 5 kg object accelerates at 2 m/s². What net force is acting on it? A) 2.5 N  B) 10 N  C) 7 N  D) 0.4 N", answer: "B) 10 N — using F = ma = 5 × 2 = 10 N" },
      { type: "short-answer", question: "A car travels 150 km in 2 hours. Calculate its average speed and state the formula used.", answer: "Average speed = distance ÷ time = 150 km ÷ 2 h = 75 km/h. Formula: v = d/t" },
      { type: "true-false", question: "Newton's Third Law states that for every action there is an equal and opposite reaction.", answer: "True" },
    ],
    gradeGuidance:
      "Grades 9–10: kinematics, Newton's laws, energy, and waves. Grades 11–12: electricity, magnetism, and thermodynamics. AP Physics 1 (algebra-based) and AP Physics C (calculus-based) require Hard difficulty and specific topic prompts.",
    faq: [
      { q: "Can it generate calculation-based physics problems?", a: "Yes. Use short answer type — the AI generates the problem setup and expects a numerical or algebraic answer. Specify units and whether to show work." },
      { q: "Does it cover electricity, magnetism, and waves?", a: "Yes. Include the specific topic: 'electromagnetic waves and the electromagnetic spectrum' or 'Ohm's law and circuit analysis.'" },
      { q: "What's the difference between conceptual and calculus-based physics questions?", a: "Set difficulty to Easy or Medium for conceptual physics (no calculus). Set to Hard and include 'AP Physics C' for calculus-based problems involving integrals and derivatives." },
      { q: "Can it make physics quizzes for AP Physics 1 or C?", a: "Yes. Set grade to 'Grade 12 / AP' and specify the exam: 'AP Physics 1 — rotational motion and torque' or 'AP Physics C — electric fields and Gauss's Law.'" },
    ],
    relatedSlugs: ["chemistry", "algebra", "earth-science"],
  },
  {
    slug: "geometry",
    name: "Geometry",
    gradeRange: "Grades 7–10",
    intro:
      "Geometry quizzes test spatial reasoning, theorem application, and proof logic. Effective geometry assessments use short answer for calculations, MCQ for theorem identification, and true/false for property checks. Abstract proofs are a unique challenge best addressed through step-by-step short-answer questions that ask students to justify each move.",
    exampleQuestions: [
      { type: "short-answer", question: "A right triangle has legs of 6 cm and 8 cm. What is the length of the hypotenuse? Show your work.", answer: "c² = 6² + 8² = 36 + 64 = 100; c = √100 = 10 cm" },
      { type: "multiple-choice", question: "A quadrilateral with exactly one pair of parallel sides is called a: A) Rectangle  B) Trapezoid  C) Rhombus  D) Parallelogram", answer: "B) Trapezoid" },
      { type: "true-false", question: "All squares are rectangles, but not all rectangles are squares.", answer: "True — a square meets all the criteria of a rectangle (4 right angles), but a rectangle doesn't require equal sides." },
    ],
    gradeGuidance:
      "Grades 7–8: angles, basic shapes, perimeter, and area. Grades 9–10: congruence, similarity, coordinate geometry, and formal proofs. Grade 10+: circles, trigonometry, and solids.",
    faq: [
      { q: "Can it generate geometry proof questions?", a: "Yes. Short answer questions can ask students to outline proof steps, state the theorems used, or identify the given information and what needs to be proven." },
      { q: "Does it cover coordinate geometry?", a: "Yes. Include 'coordinate geometry' in your topic — distance formula, midpoint formula, slope, and equations of lines." },
      { q: "Can it make quizzes about 3D shapes and volume?", a: "Yes. Specify '3D geometry' or 'volume and surface area of prisms, cylinders, and cones.'" },
      { q: "Is it useful for SAT geometry prep?", a: "Yes. Set difficulty to Hard and topic to 'SAT geometry — triangles, circles, and coordinate geometry' for targeted practice." },
    ],
    relatedSlugs: ["algebra", "physics", "fractions"],
  },
  {
    slug: "spanish",
    name: "Spanish",
    gradeRange: "Grades 6–12",
    intro:
      "Spanish quizzes cover vocabulary, verb conjugation, grammar rules, and reading comprehension. Fill-in-the-blank is particularly effective for conjugation practice, while MCQ works well for vocabulary and reading. Short answer allows for free production — the strongest indicator of actual language acquisition, since recognition is much easier than recall.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Ella ______ (hablar) español muy bien. [She speaks Spanish very well.]", answer: "habla (third-person singular, present indicative)" },
      { type: "multiple-choice", question: "Which sentence correctly translates 'I used to eat breakfast at 7 AM'? A) Yo como desayuno a las 7.  B) Yo comí desayuno a las 7.  C) Yo comía desayuno a las 7.  D) Yo comeré desayuno a las 7.", answer: "C) Yo comía — the imperfect tense expresses habitual past action" },
      { type: "true-false", question: "In Spanish, adjectives must agree in gender and number with the nouns they modify.", answer: "True — 'el libro rojo' (masculine) vs. 'la casa roja' (feminine)" },
    ],
    gradeGuidance:
      "Spanish 1 (grades 6–8): vocabulary, present tense, and basic conversation. Spanish 2–3 (grades 9–10): preterite, imperfect, and subjunctive. AP Spanish (grades 11–12): advanced grammar, literature, and composition.",
    faq: [
      { q: "Can it generate Spanish quizzes entirely in Spanish?", a: "Yes. Specify 'all questions and answers in Spanish' in your topic prompt for full-immersion assessment." },
      { q: "Can it quiz specific verb tenses like preterite vs. imperfect?", a: "Yes. Include the contrast in your topic: 'preterite vs. imperfect — past tense distinction, Spanish 2.'" },
      { q: "Is it good for AP Spanish prep?", a: "Yes. Set grade to 'Grade 12 / AP' and topic to 'AP Spanish grammar' or specific literary texts you're studying." },
      { q: "Can I quiz Spanish vocabulary by category?", a: "Yes. Specify 'Spanish vocabulary — food and cooking' or 'Spanish body parts vocabulary' for thematic vocabulary quizzes." },
    ],
    relatedSlugs: ["grammar", "vocabulary", "world-history"],
  },
  {
    slug: "world-history",
    name: "World History",
    gradeRange: "Grades 9–12",
    intro:
      "World History quizzes span civilizations, time periods, and geographic regions. The best questions connect events to broader themes — trade, empire, cultural exchange, resistance — rather than testing isolated dates. AI-generated world history questions excel at asking students to explain relationships and draw comparisons across periods.",
    exampleQuestions: [
      { type: "multiple-choice", question: "Which agreement ended World War I and imposed heavy reparations on Germany? A) Treaty of Westphalia  B) Congress of Vienna  C) Treaty of Versailles  D) Potsdam Declaration", answer: "C) Treaty of Versailles (1919)" },
      { type: "short-answer", question: "Explain one way the Silk Road facilitated cultural exchange between East and West.", answer: "The Silk Road spread religions (Buddhism, Islam, Christianity), technologies (papermaking, gunpowder), and goods across Eurasia, creating lasting cultural and economic connections between distant civilizations." },
      { type: "true-false", question: "The Black Death of the 14th century reduced Europe's population by an estimated one-third.", answer: "True — approximately 30–50% of Europe's population died between 1347 and 1351." },
    ],
    gradeGuidance:
      "Grades 9–10: World History survey from ancient civilizations to the 20th century. Grades 11–12: AP World History emphasizes thematic analysis, comparison across periods and regions, and document-based questions.",
    faq: [
      { q: "Can it cover specific civilizations like Ancient Rome or the Ottoman Empire?", a: "Yes. Specify the civilization and time period: 'Ancient Rome — Republic to Empire, political institutions.'" },
      { q: "Is it useful for AP World History?", a: "Yes. Set difficulty to Hard and include thematic prompts: 'AP World History — industrialization, its global spread, and social consequences.'" },
      { q: "Can it cover the 20th century and the World Wars?", a: "Yes. Specify 'World War I causes and consequences' or 'Cold War, decolonization, and the Third World.'" },
      { q: "What question types work best for world history?", a: "MCQ for identifying key events, figures, and turning points. Short answer for causation, comparison, and significance. True/false for checking common misconceptions." },
    ],
    relatedSlugs: ["us-history", "grammar", "vocabulary"],
  },
  {
    slug: "vocabulary",
    name: "Vocabulary",
    gradeRange: "Grades 3–10",
    intro:
      "Vocabulary quizzes build word knowledge through context, definition, and usage. The most effective assessments require students to demonstrate understanding in context — not just match definitions to words. MCQ using context clues, fill-in-blank sentence completion, and short answer usage prompts all achieve this. Recognizing a definition is much easier than using the word correctly.",
    exampleQuestions: [
      { type: "multiple-choice", question: "Choose the word that best completes the sentence: 'The scientist's ______ discovery changed medical research forever.' A) mundane  B) groundbreaking  C) tedious  D) familiar", answer: "B) groundbreaking — means innovative and significant" },
      { type: "fill-in-the-blank", question: "A word that means the same as another word is called a ______.", answer: "synonym" },
      { type: "short-answer", question: "Write a sentence using the word 'persevere' that shows you understand what it means.", answer: "[Student-generated. Should include the idea of continuing despite difficulty or obstacles.]" },
    ],
    gradeGuidance:
      "Grades 3–4: high-frequency words and simple definition matching. Grades 5–7: Tier 2 academic vocabulary and context clue strategies. Grades 8–10: SAT/ACT vocabulary, discipline-specific terms, and word family analysis.",
    faq: [
      { q: "Can I make vocabulary quizzes for a specific reading or unit?", a: "Yes. List the words in your topic prompt: 'vocabulary for Chapters 1–3 of The Outsiders: greaser, rumble, reluctant, sophisticated.'" },
      { q: "Can it quiz SAT or ACT vocabulary?", a: "Yes. Specify 'SAT vocabulary words — high-frequency Tier 2 academic words' for targeted test prep." },
      { q: "Does it include word roots and etymology?", a: "Yes. Include 'word roots' in your topic: 'Latin and Greek roots — bio, geo, phon, graph.'" },
      { q: "Is it good for ELL or ESL vocabulary building?", a: "Yes. Set a simpler difficulty level and specify 'academic English vocabulary for ELL students, Grade 5.'" },
    ],
    relatedSlugs: ["grammar", "spanish", "us-history"],
  },
  {
    slug: "earth-science",
    name: "Earth Science",
    gradeRange: "Grades 6–9",
    intro:
      "Earth Science quizzes cover geology, meteorology, oceanography, and astronomy. The best questions test whether students can explain processes — how the rock cycle works, why tectonic plates move, what causes the seasons — rather than just name them. Process-explanation questions separate students who understand from those who've only memorized.",
    exampleQuestions: [
      { type: "multiple-choice", question: "Which type of rock forms when magma cools and solidifies below Earth's surface? A) Sedimentary  B) Metamorphic  C) Intrusive igneous  D) Extrusive igneous", answer: "C) Intrusive igneous (extrusive forms above the surface from lava)" },
      { type: "short-answer", question: "Explain what causes the seasons on Earth. Is it Earth's distance from the sun or something else?", answer: "The seasons are caused by Earth's axial tilt (23.5°), not its distance from the sun. This tilt causes different hemispheres to receive more direct sunlight at different times of year." },
      { type: "true-false", question: "The inner core of the Earth is liquid, while the outer core is solid.", answer: "False — the inner core is solid (compressed iron and nickel); the outer core is liquid." },
    ],
    gradeGuidance:
      "Standards vary by state: rocks and minerals in grade 6, weather in grade 7, and space science in grade 8 is a common sequence. High school Earth Science or Environmental Science covers all topics at a deeper level. Specify the topic to match your curriculum.",
    faq: [
      { q: "Can it quiz astronomy and space science?", a: "Yes. Include 'astronomy' or 'solar system — planets, moons, and orbital mechanics.'" },
      { q: "Does it cover weather and climate?", a: "Yes. Specify 'weather systems and fronts' or 'climate change — causes and consequences' for focused questions." },
      { q: "Can it quiz plate tectonics and earthquakes?", a: "Yes. Include 'plate tectonics — convergent, divergent, and transform boundaries.'" },
      { q: "What grade level is Earth Science typically taught?", a: "Grades 6–9 in most US states for introductory content. High school Earth Science or Environmental Science offers a deeper treatment, often in grades 10–12." },
    ],
    relatedSlugs: ["biology", "chemistry", "physics"],
  },
  {
    slug: "fractions",
    name: "Fractions",
    gradeRange: "Grades 3–6",
    intro:
      "Fractions quizzes test one of the most conceptually demanding areas of elementary math. Effective fraction assessments mix visual interpretation, equivalent fraction identification, and operation practice to build both conceptual and procedural understanding — not just memorized procedures that break down when the numbers change.",
    exampleQuestions: [
      { type: "multiple-choice", question: "Which of the following fractions is equivalent to 2/4? A) 1/3  B) 1/2  C) 3/4  D) 2/3", answer: "B) 1/2 — 2/4 simplifies to 1/2 by dividing both numerator and denominator by 2" },
      { type: "fill-in-the-blank", question: "3/4 − 1/4 = ______", answer: "2/4, which simplifies to 1/2" },
      { type: "short-answer", question: "Maria ate 1/3 of a pizza and her brother ate 1/4. How much pizza did they eat altogether? Show your work.", answer: "1/3 + 1/4 = 4/12 + 3/12 = 7/12 of the pizza" },
    ],
    gradeGuidance:
      "Grade 3: halves, thirds, and fourths; identifying and comparing unit fractions. Grade 4: equivalent fractions and ordering. Grade 5: adding and subtracting unlike denominators, multiplying fractions. Grade 6: dividing fractions and fractions of a quantity.",
    faq: [
      { q: "Can it make fraction word problems?", a: "Yes. Include 'fraction word problems' in your topic — or be more specific: 'adding fractions with unlike denominators — word problems, Grade 5.'" },
      { q: "What fraction concepts does it cover?", a: "Equivalent fractions, comparing and ordering, adding and subtracting (like and unlike denominators), multiplying and dividing, mixed numbers, and improper fractions." },
      { q: "Is it good for students who are struggling with fractions?", a: "Yes. Set difficulty to Easy and be specific about the concept: 'adding fractions with like denominators only, no simplifying required.'" },
      { q: "Can it quiz fractions in real-world context?", a: "Yes. Specify the context in your prompt: 'fractions in recipes and measurement, Grade 4.'" },
    ],
    relatedSlugs: ["algebra", "geometry", "vocabulary"],
  },
];

export const worksheetSubjects: SubjectData[] = [
  {
    slug: "math",
    name: "Math",
    gradeRange: "Grades K–8",
    intro:
      "Math worksheets are the backbone of computational fluency practice. Effective math worksheets balance timed fact practice with applied problem-solving — building procedural speed through repetition while ensuring students can also apply what they know in real contexts. The best worksheets mix computation and word problems in a single sheet.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "23 × 4 = ______", answer: "92" },
      { type: "short-answer", question: "A farmer has 48 eggs and packs them into cartons of 6. How many full cartons can he fill? Show your work.", answer: "48 ÷ 6 = 8 full cartons" },
      { type: "multiple-choice", question: "Which number is prime? A) 9  B) 15  C) 17  D) 21", answer: "C) 17 — 9 = 3×3, 15 = 3×5, 21 = 3×7; 17 has no factors other than 1 and itself" },
    ],
    gradeGuidance:
      "Grades K–2: number sense, counting, and single-digit operations. Grades 3–5: multiplication, division, and fractions. Grades 6–8: ratios, percents, decimals, and pre-algebra. Specify grade level to calibrate difficulty precisely.",
    faq: [
      { q: "Can I generate a math worksheet for a specific topic like multiplication tables?", a: "Yes. Specify exactly: 'multiplication tables 1–12' or 'long division with two-digit divisors and remainders.'" },
      { q: "Does it include both computation and word problems?", a: "Yes. Use mixed question types (fill-in-blank for computation, short answer for word problems) to get both procedural and applied practice on the same sheet." },
      { q: "Is it good for standardized test prep?", a: "Yes. Specify 'Grade 4 math — fractions, multiplication, and division' at appropriate difficulty for your state standards." },
      { q: "Can it make a worksheet covering an entire unit?", a: "Yes. List the unit topics: 'Grade 5 fractions unit — equivalent fractions, adding unlike denominators, multiplying fractions by whole numbers.'" },
    ],
    relatedSlugs: ["algebra", "geometry", "spelling"],
  },
  {
    slug: "reading-comprehension",
    name: "Reading Comprehension",
    gradeRange: "Grades 2–8",
    intro:
      "Reading comprehension worksheets develop the skills of extracting meaning, identifying text structure, and making inferences. The most effective comprehension practice balances literal questions (who, what, when) with inferential ones (why, how, what does this suggest) and analytical ones (what is the author's purpose?) to build the full range of reading habits.",
    exampleQuestions: [
      { type: "short-answer", question: "In 1–2 sentences, describe the main idea of the passage you just read.", answer: "[Passage-dependent — student identifies the central topic and the author's main point about that topic]" },
      { type: "multiple-choice", question: "Based on context clues, which word best describes the author's tone in this passage? A) Humorous  B) Alarmed  C) Informative  D) Sarcastic", answer: "[Passage-dependent — students match textual evidence to tone]" },
      { type: "short-answer", question: "What inference can you make about the main character based on their actions? Use at least one piece of evidence from the text.", answer: "[Passage-dependent — student makes a logical inference and supports it with textual evidence]" },
    ],
    gradeGuidance:
      "Grades 2–3: story elements, literal comprehension, and sequence. Grades 4–5: main idea, author's purpose, and inference. Grades 6–8: text structure, theme, evidence-based responses, and comparison of multiple texts.",
    faq: [
      { q: "Can I make comprehension questions for a specific book or passage?", a: "Yes. Use source material input (Pro) and paste the passage — or specify the book: 'reading comprehension questions for Charlotte's Web, Chapter 3, Grade 3.'" },
      { q: "Does it generate the reading passage as well?", a: "For topic-based generation, it creates questions applicable to a topic. For questions based on a specific passage, use source material input (Pro) — paste the text and get questions from that exact content." },
      { q: "What question types work best for reading comprehension?", a: "Short answer for analysis, inference, and evidence-based responses. MCQ for tone, vocabulary in context, and literal comprehension checks." },
      { q: "Can I target specific reading skills like cause and effect or making inferences?", a: "Yes. Specify the skill: 'cause and effect questions for fiction, Grade 5' or 'inference questions based on character actions.'" },
    ],
    relatedSlugs: ["vocabulary", "grammar", "spelling"],
  },
  {
    slug: "biology",
    name: "Biology",
    gradeRange: "Grades 7–12",
    intro:
      "Biology worksheets give students structured practice processing complex concepts through application. Effective worksheets mix vocabulary application (fill-in-blank), cause-and-effect analysis (short answer), and conceptual checks (MCQ) to reinforce both terminology and understanding. Worksheets are particularly useful before labs, after lectures, and as unit review.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Photosynthesis occurs in the ______, using sunlight to convert carbon dioxide and water into glucose and oxygen.", answer: "chloroplast" },
      { type: "short-answer", question: "Describe what happens to a red blood cell placed in a hypertonic solution. Include the direction of water movement and the result.", answer: "Water moves out of the cell by osmosis (from low solute concentration inside to high solute outside), causing the cell to shrink — a process called crenation." },
      { type: "multiple-choice", question: "During which phase of mitosis do chromosomes align along the cell's equatorial plate? A) Prophase  B) Metaphase  C) Anaphase  D) Telophase", answer: "B) Metaphase" },
    ],
    gradeGuidance:
      "Grades 7–8: cells, ecosystems, and basic genetics. Grades 9–10: genetics, evolution, and body systems. AP Biology (grades 11–12): molecular biology, biochemistry, ecology, and evolution at a college-introductory level.",
    faq: [
      { q: "Can it make biology worksheets for anatomy and physiology?", a: "Yes. Specify 'human anatomy — circulatory system' or 'physiology — how the nervous system sends signals.'" },
      { q: "Does it include vocabulary practice alongside content questions?", a: "Yes. Include 'include vocabulary definitions' in your topic, or mix fill-in-blank (for terms) with short answer (for processes)." },
      { q: "What's the best question format for a biology review worksheet?", a: "MCQ for terminology and classification; short answer for explaining processes like osmosis or meiosis; fill-in-blank for key terms and diagram labels." },
      { q: "Can it make AP Biology worksheets?", a: "Yes. Set grade to 'Grade 12 / AP' and specify the AP unit: 'AP Biology Unit 3 — cellular energetics, ATP, and enzyme function.'" },
    ],
    relatedSlugs: ["chemistry", "vocabulary", "grammar"],
  },
  {
    slug: "algebra",
    name: "Algebra",
    gradeRange: "Grades 6–10",
    intro:
      "Algebra worksheets provide the repetition needed to build procedural fluency. The most useful worksheets progress from structured examples to independent problems — giving scaffolded practice before asking students to work without support. A mix of equation solving, expression simplification, and word problems covers both skills and understanding.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Simplify: 4x + 7 − 2x + 3 = ______", answer: "2x + 10 (combine like terms: 4x − 2x = 2x; 7 + 3 = 10)" },
      { type: "short-answer", question: "Write a system of two equations representing: 'Two numbers add up to 15 and their difference is 3.' Then solve the system.", answer: "x + y = 15 and x − y = 3; adding the equations: 2x = 18, x = 9, y = 6" },
      { type: "multiple-choice", question: "What is the slope of the line passing through (2, 3) and (4, 7)? A) 1  B) 2  C) 3  D) 4", answer: "B) 2 — slope = (7−3)/(4−2) = 4/2 = 2" },
    ],
    gradeGuidance:
      "Grades 6–7: expressions and one-step equations. Grade 8: two-step equations and linear functions. Grades 9–10: systems of equations, quadratics, and inequalities. Specify the exact concept for targeted worksheet practice.",
    faq: [
      { q: "Can I make a worksheet focused on one skill like solving two-step equations?", a: "Yes. Specify exactly: 'solving two-step linear equations, Grade 8 — include at least 5 practice problems and 2 word problems.'" },
      { q: "Does it include algebra word problems?", a: "Yes. Include 'word problems' in your topic prompt to weight the worksheet toward applied problems." },
      { q: "Can it make intervention worksheets for students who are behind?", a: "Yes. Set difficulty to Easy and narrow the topic: 'one-step equations with positive whole numbers only, no negatives.'" },
      { q: "What about graphing linear equations?", a: "Short answer prompts can ask students to identify slope and y-intercept; pair the worksheet with graphing paper for the visual component." },
    ],
    relatedSlugs: ["math", "geometry", "physics"],
  },
  {
    slug: "spelling",
    name: "Spelling",
    gradeRange: "Grades K–6",
    intro:
      "Spelling worksheets reinforce word patterns, phonics rules, and high-frequency words through structured practice. The most effective worksheets build pattern awareness rather than rote memorization — helping students recognize word families, prefixes, suffixes, and phonics rules that transfer to new words they haven't seen before.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Choose the correct spelling: The ______ (whether / weather) was cold and rainy.", answer: "weather (whether = introduces a choice; weather = atmospheric conditions)" },
      { type: "short-answer", question: "Write three more words that follow the '-ight' pattern: light, night, ______, ______, ______.", answer: "Possible answers: fight, right, sight, might, tight, bright, flight, slight" },
      { type: "multiple-choice", question: "Which word is spelled correctly? A) recieve  B) receive  C) recive  D) receave", answer: "B) receive — remember 'i before e except after c'" },
    ],
    gradeGuidance:
      "Grades K–1: high-frequency words (Dolch/Fry), CVC patterns, and beginning blends. Grades 2–3: digraphs, long vowel patterns, and compound words. Grades 4–6: multisyllabic words, affixes, and tricky patterns (ei/ie, double consonants).",
    faq: [
      { q: "Can I make a spelling worksheet for a specific word list?", a: "Yes. List the words in your topic: 'spelling worksheet for these words: necessary, definitely, rhythm, occurrence, separate, misspell.'" },
      { q: "Does it include homophone practice?", a: "Yes. Include 'homophones' in your topic: 'there/their/they're, your/you're, to/too/two, Grade 3.'" },
      { q: "Can it make worksheets for a specific phonics pattern?", a: "Yes. Specify the pattern: 'long-a spelling patterns — ai (rain), ay (day), a_e (make), Grade 2.'" },
      { q: "Is it good for spelling bee preparation?", a: "Yes. Specify 'Grade 4 spelling bee words' or paste a specific word list and use source material input (Pro)." },
    ],
    relatedSlugs: ["grammar", "vocabulary", "reading-comprehension"],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    gradeRange: "Grades 9–12",
    intro:
      "Chemistry worksheets build the systematic habits that exams and lab work demand — unit analysis, reaction prediction, stoichiometric reasoning, and periodic trend interpretation. Structured practice sheets help students develop methodical approaches to multi-step problems before they apply them under timed assessment conditions.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "An element with atomic number 8 is ______. It has ______ valence electrons and belongs to Group ______ on the periodic table.", answer: "oxygen; 6 valence electrons; Group 16 (or Group VIA)" },
      { type: "short-answer", question: "Balance the equation: _H₂ + _O₂ → _H₂O. Explain how you determined the coefficients.", answer: "2H₂ + O₂ → 2H₂O. Start with oxygen (2 atoms on right → 1 O₂ on left), then balance hydrogen (4 H on left → 2 H₂)." },
      { type: "multiple-choice", question: "Which statement about periodic trends is correct? A) Atomic radius increases across a period  B) Electronegativity decreases down a group  C) Ionization energy increases across a period  D) Metallic character increases across a period", answer: "C) Ionization energy increases across a period (more protons pull electrons tighter)" },
    ],
    gradeGuidance:
      "Grades 9–10: atoms, periodic table, bonding, and basic reaction types. Grades 11–12: thermodynamics, kinetics, and equilibrium. AP Chemistry requires quantitative reasoning — use Hard difficulty and specify the AP unit.",
    faq: [
      { q: "Can it make stoichiometry worksheets?", a: "Yes. Specify 'stoichiometry — mole-to-mole and mole-to-gram calculations, Grade 10.' Short answer questions work best for multi-step calculations." },
      { q: "Does it cover periodic table trends?", a: "Yes. Include 'periodic table trends — atomic radius, ionization energy, and electronegativity' in your topic." },
      { q: "Can I make an acids and bases worksheet?", a: "Yes. Include 'acids and bases — pH calculations, neutralization reactions, and buffer systems.'" },
      { q: "What's the best question mix for a chemistry review worksheet?", a: "MCQ for conceptual checks and trend identification; short answer for calculations and reaction explanations; fill-in-blank for formulas, element names, and definitions." },
    ],
    relatedSlugs: ["biology", "physics", "algebra"],
  },
  {
    slug: "world-history",
    name: "World History",
    gradeRange: "Grades 9–12",
    intro:
      "World History worksheets develop the analytical thinking required for essay writing and standardized testing: document analysis, evidence-based reasoning, cross-civilization comparison, and identification of historical patterns. The most effective worksheets pair factual content with analytical short-answer prompts that require students to think, not just recall.",
    exampleQuestions: [
      { type: "multiple-choice", question: "Which economic system dominated medieval European society, organizing land and labor through a hierarchy of lords and serfs? A) Mercantilism  B) Feudalism  C) Capitalism  D) Guild system", answer: "B) Feudalism" },
      { type: "short-answer", question: "Compare the causes of the French Revolution to one other major political revolution. Identify at least two similarities in the underlying causes.", answer: "[Student-generated comparison — possible answers: economic grievances, inequality, weak governance, Enlightenment ideas]" },
      { type: "fill-in-the-blank", question: "The Renaissance began in ______ during the 14th century and was characterized by a revival of ______ (Greek and Roman) learning and art.", answer: "Italy; classical" },
    ],
    gradeGuidance:
      "Grades 9–10: World History survey, ancient to modern era. AP World History (grades 11–12): emphasis on thematic analysis, comparison across periods and regions, and document-based questions. DBQ prep benefits from short-answer practice worksheets.",
    faq: [
      { q: "Can I make worksheets analyzing primary sources?", a: "Yes. Include the source name: 'Magna Carta — analysis worksheet' or paste the source text and use source material input (Pro)." },
      { q: "Does it cover European history specifically?", a: "Yes. Specify 'European history — Age of Exploration and its consequences, Grades 9–10.'" },
      { q: "Can it make AP World History worksheets?", a: "Yes. Set grade to 'Grade 12 / AP' and use AP-style prompts: 'AP World History — comparing causes of World War I and World War II.'" },
      { q: "What question types are most useful for history worksheets?", a: "Short answer for analysis and comparison (the most important skill). MCQ for key facts. Fill-in-blank for vocabulary and chronology." },
    ],
    relatedSlugs: ["us-history", "grammar", "vocabulary"],
  },
  {
    slug: "grammar",
    name: "Grammar",
    gradeRange: "Grades 4–10",
    intro:
      "Grammar worksheets provide targeted practice with sentence structure, parts of speech, punctuation, and usage. The most effective worksheets teach rules in context — presenting examples from real-sounding sentences rather than isolated rules — so students see how grammar functions in actual writing rather than as an abstract system.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Identify the subject and predicate: 'The excited students cheered loudly during the assembly.' Subject: ______ Predicate: ______", answer: "Subject: The excited students | Predicate: cheered loudly during the assembly" },
      { type: "multiple-choice", question: "Which sentence uses the apostrophe correctly? A) The dogs' bowl was empty.  B) The dog's' bowl was empty.  C) The dogs bowl was empty.  D) The dog's' bowls were empty.", answer: "A) The dogs' bowl — plural possessive: dogs + ' (apostrophe after the s)" },
      { type: "short-answer", question: "Rewrite this run-on sentence correctly: 'She ran to the store she forgot her wallet.' Provide two different ways to correct it.", answer: "Option 1: She ran to the store. She forgot her wallet. Option 2: She ran to the store, but she forgot her wallet." },
    ],
    gradeGuidance:
      "Grades 4–5: nouns, verbs, adjectives, and end punctuation. Grades 6–7: sentence types, clauses, and complex punctuation. Grades 8–10: parallel structure, modifiers, and style. Specify the exact rule for targeted practice.",
    faq: [
      { q: "Can it make grammar worksheets for a specific standard or skill?", a: "Yes. Specify: 'comma rules for introductory phrases, Grade 6' or 'parallel structure in lists and sentences, Grade 9.'" },
      { q: "Does it cover punctuation specifically?", a: "Yes. Include 'punctuation' and the specific mark: 'semicolons and colons — when and how to use them.'" },
      { q: "Is it useful for SAT Writing prep?", a: "Yes. Set grade to 'Grade 11' and topic to 'SAT grammar — sentence correction, wordiness, and agreement errors.'" },
      { q: "Can it make grammar worksheets for middle school ELA?", a: "Yes. Specify grade level and concept: 'Grade 7 — subject-verb agreement, pronoun-antecedent agreement, and comma splices.'" },
    ],
    relatedSlugs: ["reading-comprehension", "vocabulary", "spelling"],
  },
  {
    slug: "physics",
    name: "Physics",
    gradeRange: "Grades 9–12",
    intro:
      "Physics worksheets build the systematic problem-solving habits that exams require: unit analysis, formula selection, variable identification, and calculation. Structured practice sheets develop methodical approaches to multi-step problems — so that when students face unfamiliar problems on tests, they have a reliable process rather than just recalled procedures.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Newton's second law: F = ______. An object with mass 4 kg accelerating at 3 m/s² experiences a net force of ______ N.", answer: "ma; 12 N" },
      { type: "short-answer", question: "A roller coaster starts from rest at a height of 20 m. Using conservation of energy, calculate its speed at the bottom. (Assume no friction; g = 10 m/s²)", answer: "PE = KE: mgh = ½mv²; v = √(2gh) = √(2 × 10 × 20) = √400 = 20 m/s" },
      { type: "multiple-choice", question: "Which correctly describes gravitational potential energy? A) Energy of motion  B) Energy stored due to position in a gravitational field  C) Energy transferred by heat  D) Energy of electromagnetic radiation", answer: "B) Energy stored due to position in a gravitational field" },
    ],
    gradeGuidance:
      "Grades 9–10: kinematics, Newton's laws, work, and energy. Grades 11–12: electricity, magnetism, waves, and thermodynamics. AP Physics 1 (algebra-based) or AP Physics C (calculus-based) require Hard difficulty and specific unit prompts.",
    faq: [
      { q: "Can it make worksheets for specific topics like optics or thermodynamics?", a: "Yes. Include the topic: 'optics — reflection, refraction, and Snell's Law' or 'thermodynamics — heat transfer and the laws of thermodynamics.'" },
      { q: "Does it generate multi-step calculation problems?", a: "Yes. Use short answer type for multi-step problems. Specify the level: 'two-step kinematics problems with constant acceleration.'" },
      { q: "Can it make AP Physics worksheets?", a: "Yes. Set grade to 'Grade 12 / AP' and specify: 'AP Physics 1 — rotational kinematics and torque' or 'AP Physics C — electrostatics and Gauss's Law.'" },
      { q: "Is it good for physics lab pre- or post-lab worksheets?", a: "Yes. Specify 'projectile motion lab — pre-lab questions' or 'Ohm's Law lab — analysis and conclusion questions.'" },
    ],
    relatedSlugs: ["chemistry", "algebra", "math"],
  },
  {
    slug: "geometry",
    name: "Geometry",
    gradeRange: "Grades 7–10",
    intro:
      "Geometry worksheets reinforce theorems, formulas, and spatial reasoning through practice problems that build from identification to application to proof. The most useful worksheets progress from identifying properties (MCQ), to applying formulas (short answer), to justifying proof steps — covering all levels of geometric understanding.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "The area of a trapezoid is A = ______ × (b₁ + b₂) × h, where b₁ and b₂ are the parallel bases and h is the height.", answer: "1/2 (or 0.5)" },
      { type: "short-answer", question: "Explain why the sum of interior angles of a triangle must equal 180°. Reference at least one geometry theorem or property in your explanation.", answer: "Draw a line parallel to one side through the opposite vertex. The alternate interior angles (transversal property) equal the two base angles, and the three angles form a straight line (180°) — so the interior angles of the triangle must sum to 180°." },
      { type: "multiple-choice", question: "Two angles are supplementary. One angle measures 65°. What is the measure of the other? A) 25°  B) 35°  C) 115°  D) 125°", answer: "C) 115° — supplementary angles sum to 180°; 180° − 65° = 115°" },
    ],
    gradeGuidance:
      "Grades 7–8: angles, area, and perimeter of basic shapes. Grades 9–10: congruence, similarity, coordinate geometry, and proofs. Grade 10+: circles, trigonometry (sin, cos, tan), and volume of solids.",
    faq: [
      { q: "Can it make worksheets that include formal proof practice?", a: "Yes. Use short answer type and specify 'geometric proofs — two-column proof format, congruent triangles.'" },
      { q: "Does it cover coordinate geometry?", a: "Yes. Include 'coordinate geometry' — distance formula, midpoint formula, and slope calculations." },
      { q: "Can I make worksheets about circles and arc lengths?", a: "Yes. Specify 'circles — arcs, central angles, inscribed angles, and sector area.'" },
      { q: "Is it useful for a Geometry final exam review?", a: "Yes. Include all the key topics: 'Geometry review — congruent triangles, similar figures, circles, and coordinate geometry.'" },
    ],
    relatedSlugs: ["algebra", "math", "physics"],
  },
  {
    slug: "vocabulary",
    name: "Vocabulary",
    gradeRange: "Grades 3–10",
    intro:
      "Vocabulary worksheets go beyond definitions to teach words in context, relationship to other words, and effective usage. The best vocabulary practice presents target words in sentences, requires students to use them correctly, and builds word family awareness — because deep vocabulary knowledge is what transfers across reading, writing, and every other subject.",
    exampleQuestions: [
      { type: "multiple-choice", question: "Based on the context clue, what does 'meticulous' most likely mean? 'The meticulous scientist recorded every detail in tiny, careful handwriting.' A) Careless  B) Extremely careful and precise  C) Quickly done  D) Enthusiastic", answer: "B) Extremely careful and precise" },
      { type: "fill-in-the-blank", question: "An ______ is a word that means the opposite of another word. 'Hot' and 'cold' are examples.", answer: "antonym" },
      { type: "short-answer", question: "Write an original sentence using the word 'reluctant' that shows you understand its meaning. Underline the word.", answer: "[Student-generated. Should convey the idea of being unwilling or hesitant to do something.]" },
    ],
    gradeGuidance:
      "Grades 3–4: high-frequency words and simple context clues. Grades 5–7: Tier 2 academic vocabulary and word family analysis. Grades 8–10: SAT/ACT vocabulary, discipline-specific terms, and etymology.",
    faq: [
      { q: "Can I make vocabulary worksheets for a specific reading assignment?", a: "Yes. List the target words: 'vocabulary worksheet for Lord of the Flies chapters 1–3: conch, civilized, indignation, specious, solemn.'" },
      { q: "Does it include context clue practice?", a: "Yes. Include 'context clues' in your topic: 'context clue strategies — definition, example, contrast, and inference clues.'" },
      { q: "Can it make worksheets with word roots and affixes?", a: "Yes. Specify 'Latin and Greek roots — bio, geo, phon, graph, micro, tele' for root-based vocabulary practice." },
      { q: "What question types work best for vocabulary worksheets?", a: "MCQ for context clues and definition matching; fill-in-blank for sentence completion; short answer for usage, word families, and etymology." },
    ],
    relatedSlugs: ["reading-comprehension", "spelling", "grammar"],
  },
  {
    slug: "us-history",
    name: "US History",
    gradeRange: "Grades 8–12",
    intro:
      "US History worksheets develop historical thinking through document analysis, chronological reasoning, cause-and-effect prompts, and evidence-based comparison. Structured worksheet practice prepares students for both multiple-choice standardized questions and extended essay responses — which require not just facts, but facts organized into an argument.",
    exampleQuestions: [
      { type: "multiple-choice", question: "Which legislation gave the federal government authority to regulate child labor and set maximum working hours in the US? A) Social Security Act  B) Fair Labor Standards Act  C) Sherman Antitrust Act  D) Wagner Act", answer: "B) Fair Labor Standards Act (1938)" },
      { type: "short-answer", question: "Explain one way that Reconstruction (1865–1877) failed to achieve lasting equality for formerly enslaved people. Use a specific law, event, or Supreme Court case as evidence.", answer: "[Student-generated. Possible examples: Black Codes, failure to redistribute land, Compromise of 1877, Plessy v. Ferguson, KKK violence and lack of federal enforcement]" },
      { type: "fill-in-the-blank", question: "The Supreme Court case ______ v. Board of Education (1954) declared racial segregation in public schools unconstitutional, reversing ______ v. Ferguson.", answer: "Brown; Plessy" },
    ],
    gradeGuidance:
      "Grade 8: US history survey, colonial era to Reconstruction. Grades 10–11: full survey, founding through modern era. AP US History (grades 11–12): requires Document-Based Questions (DBQ), Long Essay Questions (LEQ), and Short Answer Questions (SAQ) — short answer worksheets are the best practice.",
    faq: [
      { q: "Can I make a US History worksheet focused on a specific era?", a: "Yes. Specify: 'New Deal policies and their impact on the Great Depression' or 'Civil Rights Movement — key events, legislation, and figures 1955–1968.'" },
      { q: "Does it help with DBQ or document-based writing practice?", a: "Yes. Use short answer type and specify: 'AP US History DBQ practice — Reconstruction era, analyzing primary sources and developing an argument.'" },
      { q: "Can it cover primary sources like the Constitution or key speeches?", a: "Yes. Include the document: 'questions about the Gettysburg Address — purpose, audience, and rhetorical strategies.'" },
      { q: "What's the best format for a US History unit review worksheet?", a: "MCQ for key events and legislation; short answer for causation and significance; fill-in-blank for key terms, dates, and names." },
    ],
    relatedSlugs: ["world-history", "grammar", "vocabulary"],
  },
];

export function getQuizSubject(slug: string): SubjectData | undefined {
  return quizSubjects.find((s) => s.slug === slug);
}

export function getWorksheetSubject(slug: string): SubjectData | undefined {
  return worksheetSubjects.find((s) => s.slug === slug);
}
