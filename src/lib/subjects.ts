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
  topics: string[];
  guide: string;
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
    topics: ["Cell structure & organelles", "Cellular respiration & photosynthesis", "Genetics, heredity & Punnett squares", "DNA, RNA & protein synthesis", "Evolution & natural selection", "Ecosystems, food webs & energy flow", "Human body systems"],
    guide:
      "Biology quizzes fail most often when they test vocabulary recall instead of biological reasoning. A student who can define \"osmosis\" but can't predict what happens to a cell in salt water hasn't learned the concept — they've memorized a flashcard. The subjects that trip students up most are the ones with easily confused pairs: mitosis vs. meiosis, diffusion vs. active transport, dominant vs. recessive alleles, prokaryotic vs. eukaryotic cells. A quiz that only asks students to identify these terms in isolation won't catch the confusion; a quiz that asks them to apply the terms to a scenario will. Genetics is a particular pain point because it layers vocabulary (allele, genotype, phenotype) on top of probability (Punnett squares, ratios), so weak questions test one skill while strong questions test both together. Cellular respiration and photosynthesis are also frequently reversed by students who mix up which process consumes oxygen and which produces it. QuizKraft's biology quizzes mix multiple choice for terminology, short answer for explaining processes like meiosis or osmosis, and true/false for catching the specific misconceptions above — so a quiz actually tells you whether a student understands biology, not just whether they can recite it.",
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
    topics: ["Linear equations & inequalities", "Systems of equations", "Factoring & expanding expressions", "Quadratic equations & the quadratic formula", "Functions, slope & graphing", "Exponents & polynomials", "Word problems & real-world modeling"],
    guide:
      "The hardest part of algebra to quiz well isn't computation — it's translation. Students can often solve 2x + 5 = 11 without difficulty, but freeze when the same equation is hidden inside a word problem about ages or distances. That's the real skill algebra assessment should test: can a student translate a situation into an equation, not just manipulate symbols someone else already wrote down. Factoring is the other major pain point — students learn the mechanical steps without understanding why factoring works or when to use it versus the quadratic formula. A quiz that only asks \"factor this expression\" rewards memorized procedure; one that asks a student to explain why a quadratic has two solutions, or to choose the fastest method for a given equation, tests actual understanding. Systems of equations introduce another common trap: students solve for one variable correctly but substitute incorrectly, so short-answer questions that require showing work catch errors that multiple choice hides. QuizKraft's algebra quizzes mix fill-in-the-blank for procedural fluency with short-answer word problems that require translation — because being able to solve an equation and being able to build one from a real situation are genuinely different skills.",
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
    topics: ["Atomic structure & the periodic table", "Ionic, covalent & metallic bonding", "Balancing chemical equations", "Stoichiometry & mole calculations", "Acids, bases & pH", "Reaction types & rates", "Periodic trends"],
    guide:
      "Chemistry quizzes tend to fail in one of two directions: either they test pure memorization (name the element with atomic number 8) or they jump straight to multi-step stoichiometry without checking whether the underlying concept is solid. The gap between knowing a definition and understanding a concept is unusually wide in chemistry, because so much of it is invisible — nobody has watched an electron move between atoms, so students are reasoning about a model, not an observation. Bonding is the classic pain point: students memorize \"ionic bonds transfer electrons, covalent bonds share them\" without any intuition for why electronegativity differences drive that behavior, so they guess on unfamiliar compounds instead of reasoning it out. Periodic trends — atomic radius, ionization energy, electronegativity — are frequently tested as pure lookup facts rather than as patterns students can predict from atomic structure. A well-built chemistry quiz mixes multiple choice for trend prediction, short answer for explaining why a reaction occurs or why a compound is polar, and true/false for common misconceptions like \"all metals conduct electricity equally well.\" That mix is what actually distinguishes a student who understands the periodic table from one who memorized last week's worksheet.",
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
    topics: ["Colonial America & the Revolution", "The Constitution & founding principles", "Westward expansion & Manifest Destiny", "Civil War & Reconstruction", "Industrialization & the Progressive Era", "The Great Depression & New Deal", "Civil Rights Movement", "Cold War & modern America"],
    guide:
      "The single biggest weakness in US History quizzes is testing dates and names instead of causation. \"In what year was the Emancipation Proclamation issued\" tells you almost nothing about whether a student understands the Civil War; \"why did Lincoln wait until 1863 to issue it\" tells you a great deal. Students genuinely struggle with two things in this subject: keeping overlapping timelines straight, and connecting an event's causes to its consequences rather than treating history as a list of unconnected facts. The Constitution and founding era present a different challenge — students can often name the three branches of government but can't explain why the framers built in checks and balances, which is the actual point of studying it. Reconstruction and the Civil Rights Movement are frequently tested too shallowly, reduced to \"what year did X happen\" when the more revealing questions are about why change was slow, contested, or incomplete. A strong US History quiz uses multiple choice for identifying key legislation and turning points, short answer for causation and significance, and true/false for checking specific, common misconceptions. That combination reveals whether a student can think historically, not just recall a timeline.",
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
    topics: ["Parts of speech", "Subject-verb agreement", "Sentence structure & clause types", "Punctuation rules (commas, semicolons, apostrophes)", "Verb tenses & conjugation", "Modifiers & parallel structure", "Common usage errors"],
    guide:
      "Grammar is unusual among school subjects because recognition and application are almost entirely different skills — a student can pick the correctly punctuated sentence on a multiple choice quiz and still write comma splices in their own paragraph five minutes later. That gap is the central pain point, and it's why fill-in-the-blank and short-answer questions reveal far more than pure multiple choice. Apostrophe usage and comma rules are the most commonly missed areas at every grade level, especially plural possessives (\"the dogs' bowl\" vs. \"the dog's bowl\") and comma splices joining two independent clauses without a conjunction. Modifiers are a subtler trap: students don't notice a dangling modifier is wrong because the sentence \"sounds fine\" out loud, so quizzes need to isolate the specific error rather than asking students to generally spot a mistake in a wall of text. Verb tense consistency is another frequent failure point, particularly in narrative writing where students drift between past and present tense without noticing. A grammar quiz that mixes multiple choice for identifying correct usage, fill-in-the-blank for applying a rule in context, and short-answer for correcting a broken sentence tests both recognition and production — the two skills that actually matter for a student's own writing.",
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
    topics: ["Kinematics & motion graphs", "Newton's laws of motion", "Work, energy & power", "Momentum & collisions", "Electricity & circuits", "Waves, sound & light", "Thermodynamics"],
    guide:
      "Physics quizzes are prone to a specific failure mode: testing formula recall (F = ma) without testing whether a student can identify which formula applies to a new, unfamiliar situation. That's the actual skill that separates students who understand physics from students who've memorized a formula sheet. Newton's laws are especially vulnerable to this — students can state all three laws perfectly and still get a multi-body problem wrong because they don't know how to identify the forces acting on each object. Momentum and energy conservation are frequently confused because both involve conservation principles but apply to different quantities, so a quiz question that requires a student to choose which conservation law applies catches that confusion directly. Circuits present a different pain point: students often memorize that \"series circuits share current, parallel circuits share voltage\" as a rule without any model of why, so unfamiliar circuit diagrams break that memorized rule instantly. A physics quiz that mixes multiple choice for conceptual reasoning, short answer for multi-step calculations that require showing work, and true/false for common misconceptions like \"heavier objects fall faster\" gives a much clearer picture of understanding than a formula-matching quiz ever could.",
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
    topics: ["Angles, lines & basic shapes", "Triangle congruence & similarity", "The Pythagorean theorem", "Circles: arcs, chords & angles", "Area, perimeter & volume", "Coordinate geometry", "Formal proofs"],
    guide:
      "Geometry quizzes have a unique challenge that algebra and arithmetic don't: proof and justification, not just calculation. A student can correctly compute that a triangle's area is 24 square units and still have no idea why the area formula works, which formal geometry classes are specifically trying to build. The Pythagorean theorem is the clearest example of a concept that gets reduced to \"plug into a² + b² = c²\" without any grasp of what it actually states about right triangles — which is fine for computing a hypotenuse but fails the moment a question asks students to recognize when the theorem applies at all. Congruence and similarity are routinely confused because both involve comparing shapes, but one preserves size and the other doesn't; quiz questions that only ask \"are these congruent\" without asking students to identify which specific theorem (SSS, SAS, ASA) justifies the claim miss the point of the unit. Circle theorems — central angles, inscribed angles, arc measures — are memorized as disconnected rules unless a quiz forces students to apply more than one in the same problem. A geometry quiz that combines short-answer justification, multiple choice for property identification, and true/false for common shape misconceptions actually tests spatial reasoning and proof logic, not just formula plugging.",
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
    topics: ["Present tense conjugation", "Preterite vs. imperfect (past tense)", "Ser vs. estar", "Vocabulary by theme (food, family, travel)", "Gender & number agreement", "Question words & basic conversation", "Subjunctive mood (advanced)"],
    guide:
      "Language quizzes fail when they only test recognition — can a student pick the right word from a list — instead of production, which is the actual skill of speaking or writing a language. Recognition is dramatically easier than recall, so a multiple-choice-only Spanish quiz will overstate what a student can actually do in conversation. The preterite/imperfect distinction is the single biggest pain point in intermediate Spanish because English doesn't force this distinction the way Spanish does — students need to judge whether a past action was a single completed event or an ongoing/habitual one, which is a conceptual judgment, not a memorization task. Ser vs. estar creates a similar problem: both mean \"to be\" in English, so students default to whichever one they saw more recently rather than reasoning about permanence versus temporary state. Gender and number agreement is mechanically simple but the error that appears constantly in free writing, so it needs to be tested in production, not just recognition. A Spanish quiz that mixes fill-in-the-blank for conjugation practice, multiple choice for vocabulary and reading comprehension, and short answer for free sentence production tests whether a student can actually generate correct Spanish, not just recognize it when someone else writes it.",
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
    topics: ["Ancient civilizations (Egypt, Greece, Rome)", "Middle Ages & feudalism", "The Renaissance & Age of Exploration", "Enlightenment & political revolutions", "Imperialism & colonization", "World War I & World War II", "The Cold War & decolonization"],
    guide:
      "World History covers more ground than almost any other subject, which creates its own pain point: students end up with a shallow, disconnected list of facts from a dozen civilizations instead of an understanding of the recurring themes — trade, empire, religion, resistance — that connect them. A quiz that asks \"name the causes of World War I\" tests recall; a quiz that asks a student to compare the causes of World War I to another conflict tests the thematic thinking the subject is actually trying to build. The Renaissance and Enlightenment are frequently taught as isolated \"idea eras\" without connecting them to the political revolutions they caused, so students can define humanism but not explain why it eventually undermined absolute monarchy. Imperialism is another area where surface-level quizzes miss the point, testing which countries colonized which territories without asking why, or what the lasting consequences were. A world history quiz that blends multiple choice for identifying key events and figures, short answer for causation and cross-era comparison, and true/false for common misconceptions gives a far more accurate picture of historical understanding than a name-that-date quiz.",
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
    topics: ["Context clues & inference", "Synonyms & antonyms", "Word roots, prefixes & suffixes", "Multiple-meaning words", "Academic (Tier 2) vocabulary", "Figurative language & idioms"],
    guide:
      "Vocabulary quizzes have a well-documented failure mode: definition matching massively overstates what students actually know, because recognizing a definition is far easier than using a word correctly in a new sentence. A student can match \"meticulous\" to \"very careful\" on a quiz and still never use the word correctly in their own writing — which means the quiz measured the wrong skill. Context-clue questions are the better test, because they require students to infer meaning the way they actually will when they hit an unfamiliar word in real reading, rather than recalling a memorized definition. Word roots and affixes are a genuinely high-leverage area that's frequently under-tested: a student who knows that \"bio\" means life and \"-logy\" means study of can decode dozens of unfamiliar words they've never seen, but that transferable skill rarely shows up on vocabulary quizzes that only test individually memorized words. Multiple-meaning words (like \"novel,\" \"light,\" or \"current\") are a specific trap because students learn one meaning and assume it applies everywhere, so a quiz that shifts the same word across different sentence contexts catches a gap that single-definition quizzes miss entirely. A strong vocabulary quiz mixes multiple choice using context clues, fill-in-the-blank for sentence completion, and short answer requiring students to write an original sentence — because writing a correct sentence with a word is the real test of whether they know it.",
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
    topics: ["Rock cycle & plate tectonics", "Weather, climate & the atmosphere", "The water cycle", "Astronomy & the solar system", "Earthquakes & volcanoes", "Natural resources & sustainability"],
    guide:
      "Earth Science quizzes are especially prone to testing labels instead of processes — can a student name the three rock types, versus can they explain how one rock type transforms into another through heat, pressure, or erosion. The rock cycle, water cycle, and plate tectonics are all fundamentally process diagrams, and a quiz that only asks students to identify a stage in isolation misses whether they understand how the whole cycle connects. Plate tectonics has a specific common misconception worth targeting directly: students often think earthquakes and volcanoes are randomly distributed, when in fact their locations are highly predictable once you understand plate boundaries. Weather and climate are frequently and incorrectly used interchangeably by students, so a quiz question that requires distinguishing a short-term weather event from a long-term climate pattern targets a real conceptual gap, not a trivia detail. Astronomy suffers from a similar issue with the seasons: many students believe the seasons are caused by Earth's distance from the sun rather than its axial tilt, a misconception worth testing explicitly. A well-built Earth Science quiz mixes multiple choice for classification, short answer for explaining a process end-to-end, and true/false aimed squarely at the misconceptions above.",
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
    topics: ["Understanding fractions as parts of a whole", "Equivalent fractions & simplifying", "Comparing & ordering fractions", "Adding & subtracting (like & unlike denominators)", "Multiplying & dividing fractions", "Mixed numbers & improper fractions", "Fractions in real-world word problems"],
    guide:
      "Fractions are widely recognized as the single hardest topic in elementary math, and the reason shows up clearly in poorly designed quizzes: procedural fluency and conceptual understanding are tested as if they're the same skill, when they're not. A student can correctly find a common denominator through memorized steps while still not understanding that 3/4 is bigger than 1/2, and a quiz that never asks a comparison or visual-reasoning question will never catch that gap. Unlike denominators are the most common point of failure — students often just add numerators and denominators straight across (1/2 + 1/3 = 2/5) because they haven't internalized why a common denominator is necessary in the first place. Multiplying and dividing fractions introduce the opposite confusion: because the mechanical steps don't match addition/subtraction, students who've only practiced adding fractions often misapply that same procedure to multiplication problems. Word problems are where all of this gets tested at once, because students first have to recognize which operation a real-world situation calls for before they can execute it correctly. A fractions quiz that mixes fill-in-the-blank for procedural practice, multiple choice for equivalence and comparison, and short-answer word problems targets both the mechanics and the conceptual understanding that so often lag behind them.",
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
{
    slug: "literature",
    name: "Literature",
    gradeRange: "Grades 6–12",
    intro: "Literature worksheets and quizzes analyze text structure, themes, characters, and figurative language. Good questions require students to cite evidence and make connections, rather than just recall plot points.",
    topics: [
      "Theme and main ideas",
      "Character analysis and development",
      "Plot structure and conflict",
      "Setting and atmosphere",
      "Figurative language and symbolism",
      "Point of view and narrator bias"
    ],
    guide: "Literature assessment fails when it tests trivia like character names or minor events. The real focus should be on deep reading, analytical reasoning, and evidence extraction. Middle school focuses on plot elements and basic figurative devices. High school shifts toward complex themes, narrator reliability, and historical context. Strong questions use multiple choice for structural elements, short answer for explaining themes or analyzing quotes, and true/false for clearing up common reading misconceptions.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "Which type of conflict is represented by a character struggling against societal expectations?",
        answer: "Man vs. Society"
      },
      {
        type: "short-answer",
        question: "Explain the difference between tone and mood in literary analysis.",
        answer: "Tone is the author's attitude toward the subject, while mood is the emotional atmosphere created for the reader."
      },
      {
        type: "true-false",
        question: "Symbolism is when an object represents an idea beyond its literal meaning.",
        answer: "True"
      }
    ],
    gradeGuidance: "Middle school: plot elements, character traits, and basic figurative language. High school: complex themes, narrator reliability, and historical context.",
    faq: [
      {
        q: "Can I generate questions for a specific book?",
        a: "Yes. Include the book title and chapter in your prompt, e.g., 'To Kill a Mockingbird Chapter 3, Grade 9.'"
      },
      {
        q: "What's the best question mix for a literature quiz?",
        a: "MCQ for terminology and structure; short answer for theme analysis and quotes; true/false for factual and conceptual reading checks."
      },
      {
        q: "Does it cover poetic devices and poetry?",
        a: "Yes. Specify the poem or poetic device in your topic, e.g., 'alliteration, metaphor, and stanza structure in Edgar Allan Poe's poetry.'"
      }
    ],
    relatedSlugs: ["grammar", "vocabulary", "reading-comprehension"]
  },
{
    slug: "environmental-science",
    name: "Environmental Science",
    gradeRange: "Grades 9–12",
    intro: "Environmental Science assessments connect human activity with ecosystems, climate change, and sustainability issues. Strong questions analyze human impacts and solutions, not just recall terminology.",
    topics: [
      "Ecosystem structure and energy flow",
      "Biodiversity and conservation",
      "Renewable and non-renewable energy",
      "Water and air pollution",
      "Climate change and greenhouse effect",
      "Sustainable resource management"
    ],
    guide: "Students often confuse ozone depletion with global warming. Calibrating questions to check this distinction ensures they grasp the chemical and environmental differences. Ecology and resource management questions work best when they push students to think about trade-offs, like the economic vs. environmental impacts of clean energy.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "Which of the following is a primary greenhouse gas?",
        answer: "Carbon dioxide"
      },
      {
        type: "short-answer",
        question: "Describe the concept of 'tragedy of the commons' with a real-world example.",
        answer: "The overuse and depletion of shared resources (like overfishing in international waters) because individuals act in self-interest rather than group interest."
      },
      {
        type: "true-false",
        question: "Bioaccumulation refers to the increasing concentration of a toxin in organisms at higher trophic levels.",
        answer: "True"
      }
    ],
    gradeGuidance: "High school: basic ecology and pollution. AP Environmental: biogeochemical cycles, population dynamics, and environmental legislation.",
    faq: [
      {
        q: "Is this suitable for AP Environmental Science review?",
        a: "Yes. Set the grade level to AP / Grade 12 and include specific topics like 'APES Unit 5 — agriculture and land use.'"
      },
      {
        q: "Can it generate questions about specific laws like the Clean Air Act?",
        a: "Yes. Include the specific legislation in your prompt, e.g., 'Clean Water Act and Safe Drinking Water Act comparison.'"
      }
    ],
    relatedSlugs: ["biology", "chemistry", "earth-science"]
  },
{
    slug: "economics",
    name: "Economics",
    gradeRange: "Grades 10–12",
    intro: "Economics assessments test micro and macroeconomic principles, market systems, supply and demand, and financial literacy. Revealing questions require applying principles to real-world scenarios rather than matching definitions.",
    topics: [
      "Supply and demand",
      "Market structures (monopoly, competition)",
      "Inflation and unemployment",
      "Monetary and fiscal policy",
      "Global trade and tariffs",
      "Personal finance and budgeting"
    ],
    guide: "Supply and demand shifts are a common source of confusion. Worksheets should test the difference between a change in demand versus a change in quantity demanded. Macroeconomic policies also benefit from scenario questions, like predicting how interest rate changes affect investment and inflation.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "If supply decreases and demand remains constant, what happens to equilibrium price and quantity?",
        answer: "Price increases, quantity decreases"
      },
      {
        type: "short-answer",
        question: "Explain the difference between monetary policy and fiscal policy.",
        answer: "Monetary policy is controlled by the central bank (adjusting interest rates, money supply), while fiscal policy is controlled by the government (adjusting taxes, spending)."
      },
      {
        type: "true-false",
        question: "Opportunity cost represents the value of the next best alternative given up when making a choice.",
        answer: "True"
      }
    ],
    gradeGuidance: "Grades 10–12: basic economics, supply/demand, personal finance. AP Micro/Macro: cost curves, market failure, and aggregate demand models.",
    faq: [
      {
        q: "Does the economics generator support graph analysis?",
        a: "Short answer questions can ask students to describe shifts in cost curves or supply and demand diagrams. Pair worksheets with graph paper for best results."
      },
      {
        q: "Can it quiz personal finance topics?",
        a: "Yes. Specify topics like 'budgeting, interest rates, credit cards, and investments' in your prompt."
      }
    ],
    relatedSlugs: ["algebra", "civics", "us-history"]
  },
{
    slug: "civics",
    name: "Civics",
    gradeRange: "Grades 8–12",
    intro: "Civics assessments test principles of government, the US Constitution, the three branches of government, civil rights, and citizen participation. Effective questions prompt students to explain systems and rights.",
    topics: [
      "Principles of democracy",
      "The US Constitution and Bill of Rights",
      "Three branches of government",
      "Federalism and separation of powers",
      "Elections and political parties",
      "Civil rights and liberties"
    ],
    guide: "Checks and balances are often memorized as a list. Strong questions challenge students to analyze how one branch can block or check another in specific scenarios. Civil rights historical context also benefits from questions matching Supreme Court rulings to societal developments.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "Which branch of government has the power to declare laws unconstitutional?",
        answer: "Judicial branch"
      },
      {
        type: "short-answer",
        question: "Explain the purpose of the Bill of Rights in the US Constitution.",
        answer: "To protect individual liberties and limit government power by explicitly stating rights that cannot be infringed upon."
      },
      {
        type: "true-false",
        question: "Federalism is a system where power is divided between national and state governments.",
        answer: "True"
      }
    ],
    gradeGuidance: "Middle school: basic branches, local government, citizenship. High school: Constitution, federalism, Supreme Court cases.",
    faq: [
      {
        q: "Can I quiz students on specific Supreme Court cases?",
        a: "Yes. Include the case name in your topic, e.g., 'Marbury v. Madison or Brown v. Board of Education.'"
      },
      {
        q: "Does it support citizenship exam preparation?",
        a: "Yes. Set the topic to 'US citizenship test study questions' to cover core government structure and history."
      }
    ],
    relatedSlugs: ["us-history", "world-history", "literature"]
  },
{
    slug: "art-history",
    name: "Art History",
    gradeRange: "Grades 9–12",
    intro: "Art History worksheets and quizzes trace artistic movements, analysis of visual media, and historical context. Successful questions connect art to historical developments, rather than just identifying painters.",
    topics: [
      "Ancient and classical art",
      "Renaissance and Baroque art",
      "Impressionism and Post-Impressionism",
      "Modern art movements (Cubism, Surrealism)",
      "Non-Western art traditions",
      "Visual analysis and terminology"
    ],
    guide: "Students often focus only on visual attributes. The best questions ask them to connect art styles to historical events, such as how the Black Death influenced late medieval art, or how industrialization drove Modernism. MCQ works well for stylistic terms, and short answer is ideal for visual analysis.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "Which artistic movement is characterized by a focus on light, visible brushstrokes, and ordinary subject matter?",
        answer: "Impressionism"
      },
      {
        type: "short-answer",
        question: "Explain how linear perspective changed painting during the Italian Renaissance.",
        answer: "It introduced a mathematical system for creating the illusion of 3D depth on a flat 2D surface, making scenes appear realistic and spacious."
      },
      {
        type: "true-false",
        question: "Surrealism was heavily influenced by Sigmund Freud's theories on the subconscious mind.",
        answer: "True"
      }
    ],
    gradeGuidance: "High school survey: major movements, visual vocabulary. AP Art History: contextual analysis, formal attributes of the 250 required works.",
    faq: [
      {
        q: "Is this suitable for AP Art History preparation?",
        a: "Yes. Use Grade 12 / AP level and specify visual analysis topics, e.g., 'AP Art History — comparison of Classical Greek and Roman sculpture.'"
      },
      {
        q: "How can students analyze visual attributes without images on screen?",
        a: "Questions can describe formal elements (like composition, medium, and color use) or refer to famous works (like Michelangelo's David) that students are studying in class."
      }
    ],
    relatedSlugs: ["world-history", "us-history", "literature"]
  },
{
    slug: "computer-science",
    name: "Computer Science",
    gradeRange: "Grades 8–12",
    intro: "Computer Science worksheets and quizzes test programming logic, algorithm design, data structures, and computer networks. Coding questions check logical progression and syntax rules.",
    topics: [
      "Basic programming logic (loops, conditionals)",
      "Variables and data types",
      "Algorithms and sorting",
      "Object-oriented programming",
      "Web development basics (HTML/CSS/JS)",
      "Cybersecurity and digital ethics"
    ],
    guide: "Tracing loops is a core skill. Quizzes should ask students to predict the final output of a code block to verify they can run algorithms mentally. For AP level, object-oriented concepts like inheritance and polymorphism are primary focus areas.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "Which data structure operates on a First-In, First-Out (FIFO) principle?",
        answer: "Queue"
      },
      {
        type: "short-answer",
        question: "Describe the difference between a compiler and an interpreter.",
        answer: "A compiler translates the entire source code into machine code at once before execution, while an interpreter translates and executes code line by line."
      },
      {
        type: "true-false",
        question: "In programming, a syntax error is caught at runtime, while a logical error is caught during compilation.",
        answer: "False"
      }
    ],
    gradeGuidance: "Middle school: drag-and-drop programming, basic HTML. High school: Python/Java basics. AP CS A: object-oriented design and recursion.",
    faq: [
      {
        q: "What languages does it support for syntax questions?",
        a: "Specify the language in your topic: 'Python loops, Java class structure, or Javascript DOM manipulation.'"
      },
      {
        q: "Can it create questions for AP Computer Science Principles?",
        a: "Yes. Specify the topic, e.g., 'AP CSP — binary numbers, networks, and routing protocols.'"
      }
    ],
    relatedSlugs: ["algebra", "math", "physics"]
  },
{
    slug: "french",
    name: "French",
    gradeRange: "Grades 6–12",
    intro: "French assessments cover verb conjugation, reading comprehension, vocabulary, and grammar rules. Practice should require sentence building and contextual reading to measure language acquisition.",
    topics: [
      "Present tense conjugation",
      "Passé composé vs. imparfait",
      "Vocabulary by theme (family, food, school)",
      "Adjective agreement and placement",
      "Direct and indirect object pronouns",
      "Subjunctive mood"
    ],
    guide: "The difference between passé composé and imparfait is the biggest hurdle for students. Worksheets should test whether a past action was completed or ongoing. Fill-in-the-blank conjugation and short-answer translations are the most effective formats for testing grammar and production.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "Which auxiliary verb is used to conjugate 'aller' in the passé composé?",
        answer: "Être"
      },
      {
        type: "short-answer",
        question: "Translate to French: 'I would like a croissant, please.'",
        answer: "Je voudrais un croissant, s'il vous plaît."
      },
      {
        type: "true-false",
        question: "In French, most adjectives are placed after the noun they modify.",
        answer: "True"
      }
    ],
    gradeGuidance: "French 1: basic vocabulary, present tense. French 2–3: past tenses, pronouns. French 4 / AP: subjunctive, literature, and composition.",
    faq: [
      {
        q: "Can it generate quizzes completely in French?",
        a: "Yes. Include 'questions and explanations completely in French' in your prompt for immersion classrooms."
      },
      {
        q: "Does it support accent characters?",
        a: "Yes, all standard French letters and accents (é, è, ç, à, etc.) are correctly generated and supported."
      }
    ],
    relatedSlugs: ["spanish", "grammar", "vocabulary"]
  },
{
    slug: "geography",
    name: "Geography",
    gradeRange: "Grades 6–12",
    intro: "Geography assessments cover map analysis, physical landforms, human geography, and global systems. Good questions analyze how human activities interact with physical environments.",
    topics: [
      "Map reading and map projections",
      "Physical systems (rivers, mountains, climate zones)",
      "Human migration and population density",
      "Cultural geography and globalization",
      "Natural hazards and disasters",
      "Geopolitics and border disputes"
    ],
    guide: "Students often confuse map projections. The best questions ask them to analyze the distortion of Mercator vs. Peters projections. Physical geography matches well with climate cycles, while human geography shifts toward urban models and resource patterns.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "Which line of latitude splits the Earth into Northern and Southern Hemispheres?",
        answer: "The Equator"
      },
      {
        type: "short-answer",
        question: "Explain the difference between weather and climate from a geographic perspective.",
        answer: "Weather refers to short-term atmospheric conditions, while climate is the long-term average weather pattern of a region over 30+ years."
      },
      {
        type: "true-false",
        question: "The Ring of Fire is a major area in the basin of the Pacific Ocean where many earthquakes and volcanic eruptions occur.",
        answer: "True"
      }
    ],
    gradeGuidance: "Middle school: continents, countries, capital cities. High school: human geography, resource distribution, environmental impact.",
    faq: [
      {
        q: "Does this cover physical and human geography?",
        a: "Yes. You can specify either: e.g., 'physical geography — tectonic landforms' or 'human geography — population migration patterns.'"
      },
      {
        q: "Is it aligned with AP Human Geography standards?",
        a: "Yes. Set grade to AP / Grade 12 and prompt for topics like 'Demographic Transition Model or von Thünen model.'"
      }
    ],
    relatedSlugs: ["earth-science", "world-history", "us-history"]
  },
{
    slug: "astronomy",
    name: "Astronomy",
    gradeRange: "Grades 8–12",
    intro: "Astronomy assessments explore celestial bodies, stellar lifecycle, cosmology, and observational mechanics. Worksheets test the physics of the universe and gravitational models.",
    topics: [
      "Planets and orbital mechanics",
      "Stellar evolution (main sequence to black holes)",
      "Galaxies and cosmic structures",
      "The Big Bang theory and cosmology",
      "Observational astronomy and telescopes",
      "Space exploration history"
    ],
    guide: "Students often confuse mass with weight. Worksheets should ask students to calculate the difference in weight for a constant mass on other planets. Stellar lifecycles are also key — checking if students understand what triggers red giants vs. supernovas.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "What is the primary source of energy for stars during their main sequence phase?",
        answer: "Nuclear fusion"
      },
      {
        type: "short-answer",
        question: "Describe Kepler's first law of planetary motion.",
        answer: "All planets move in elliptical orbits with the Sun at one of the two focal points."
      },
      {
        type: "true-false",
        question: "A light-year is a unit of time representing the time it takes light to travel to the nearest star.",
        answer: "False"
      }
    ],
    gradeGuidance: "Grades 8–9: planets, moon phases, gravity. Grades 10–12: astrophysics, nuclear fusion, stellar evolution, and cosmological theories.",
    faq: [
      {
        q: "Can it generate calculations based on gravity or light?",
        a: "Yes. Include math prompts, e.g., 'calculating gravitational force using Newton's law of universal gravitation.'"
      },
      {
        q: "Does it cover moon phases and eclipses?",
        a: "Yes. Specify 'phases of the moon and solar vs. lunar eclipses' in your topic prompt."
      }
    ],
    relatedSlugs: ["physics", "earth-science", "chemistry"]
  },
{
    slug: "creative-writing",
    name: "Creative Writing",
    gradeRange: "Grades 6–12",
    intro: "Creative Writing worksheets and quizzes focus on literary techniques, narrative arcs, stylistic elements, and editing. Practice guides writers to build rich descriptions and dialogue.",
    topics: [
      "Show, don't tell writing techniques",
      "Developing character voice",
      "Structuring narrative arcs",
      "Dialogue punctuation and pacing",
      "Sensory details and imagery",
      "Poetic devices (meter, rhyme, stanza)"
    ],
    guide: "Students write flat narratives. Exercises should require taking a telling sentence ('He was sad') and rewriting it using sensory details and actions. Dialogue punctuation rules are also a primary mechanic tested in ELA classes.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "Which literary device involves a direct comparison of two unlike things without using 'like' or 'as'?",
        answer: "Metaphor"
      },
      {
        type: "short-answer",
        question: "Punctuate the following dialogue correctly: 'I don't think we should go in there whispered Sarah.'",
        answer: "\"I don't think we should go in there,\" whispered Sarah."
      },
      {
        type: "true-false",
        question: "A protagonist must always be a morally good character in a story.",
        answer: "False"
      }
    ],
    gradeGuidance: "Middle school: story parts, descriptive words. High school: show vs. tell, dialogue, figurative structures, poetry formats.",
    faq: [
      {
        q: "Can it generate creative writing prompts?",
        a: "Yes. Specify 'writing prompts' in the question count, or ask for exercises that guide story starting."
      },
      {
        q: "Does it teach poetry forms?",
        a: "Yes. Specify 'haiku structure, sonnets, or free verse elements' in the topic."
      }
    ],
    relatedSlugs: ["literature", "grammar", "vocabulary"]
  },
{
    slug: "statistics",
    name: "Statistics",
    gradeRange: "Grades 9–12",
    intro: "Statistics worksheets and quizzes test data representation, probability rules, distribution models, and hypothesis testing. Good questions prompt reasoning behind data conclusions.",
    topics: [
      "Measures of central tendency (mean, median, mode)",
      "Probability rules and Venn diagrams",
      "Normal distribution and z-scores",
      "Sampling methods and bias",
      "Hypothesis testing and p-values",
      "Correlation vs. causation"
    ],
    guide: "Students confuse correlation with causation. Worksheets should present real-world scatter plots and prompt students to critique causative claims. At AP level, z-scores, p-values, and statistical significance are core concepts.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "If a distribution is highly skewed to the right, which measure of central tendency is typically largest?",
        answer: "The mean"
      },
      {
        type: "short-answer",
        question: "Explain the difference between a sample and a population in statistics.",
        answer: "A population is the entire group you want to draw conclusions about, while a sample is the specific group you collect data from."
      },
      {
        type: "true-false",
        question: "A p-value of 0.03 indicates that there is a 3% probability that the null hypothesis is true.",
        answer: "False"
      }
    ],
    gradeGuidance: "Grades 9–10: charts, mean/median/mode, simple probability. AP Statistics: hypothesis tests, normal models, sampling distributions, regressions.",
    faq: [
      {
        q: "Is this aligned with AP Statistics?",
        a: "Yes. Set grade to Grade 12 / AP and specify: 'AP Statistics — Type I and Type II errors' or 'chi-square goodness of fit test.'"
      },
      {
        q: "Does it cover probability rules?",
        a: "Yes. Specify 'addition and multiplication rules of probability, or conditional probability.'"
      }
    ],
    relatedSlugs: ["algebra", "math", "physics"]
  },
{
    slug: "sociology",
    name: "Sociology",
    gradeRange: "Grades 10–12",
    intro: "Sociology assessments explore social structures, cultural paradigms, inequality, and socialization processes. Revealing questions require analyzing systemic patterns.",
    topics: [
      "Social institutions (family, education, religion)",
      "Culture and norms",
      "Socialization and identity",
      "Social stratification and inequality",
      "Deviance and social control",
      "Sociological research methods"
    ],
    guide: "Students often confuse individual bias with systemic structure. Questions should guide them to analyze how institutions shape group behaviors. Functionalist vs. conflict perspectives are ideal frameworks for comparative questions.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "Which sociological perspective views society as a system of interrelated parts working together to promote stability?",
        answer: "Structural Functionalism"
      },
      {
        type: "short-answer",
        question: "Explain the difference between a primary group and a secondary group.",
        answer: "Primary groups are small, close-knit, and personal (like family); secondary groups are larger, temporary, and goal-oriented (like coworkers)."
      },
      {
        type: "true-false",
        question: "Ethnocentrism is the practice of judging another culture by the standards of one's own culture.",
        answer: "True"
      }
    ],
    gradeGuidance: "Grades 10–12: basic sociological concepts, socialization, culture, deviance, and social stratification.",
    faq: [
      {
        q: "Does it cover the main sociological theories?",
        a: "Yes. Specify 'Functionalism, Conflict Theory, and Symbolic Interactionism' for theoretical comparison questions."
      },
      {
        q: "Can it quiz sociological research methods?",
        a: "Yes. Topic prompts like 'quantitative vs. qualitative methods, surveys, and ethics in research' generate focused questions."
      }
    ],
    relatedSlugs: ["us-history", "world-history", "civics"]
  },
  {
    slug: "pre-algebra",
    name: "Pre-Algebra",
    gradeRange: "Grades 6–8",
    intro: "Pre-algebra assessments bridge basic arithmetic and algebraic reasoning, focusing on integers, variables, and simple equations.",
    topics: [
      "Integers & absolute value",
      "Order of operations (PEMDAS)",
      "Solving one-step equations",
      "Ratios, rates & proportions",
      "Coordinate plane basics",
      "Simplifying algebraic expressions"
    ],
    guide: "Students frequently struggle with negative numbers and the order of operations. Pre-algebra worksheets should focus on building step-by-step logic, helping students visualize variables as placeholders before they move on to complex algebra.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "What is the value of -5 + 8? A) -13 B) -3 C) 3 D) 13",
        answer: "C) 3"
      },
      {
        type: "short-answer",
        question: "Solve for x: x - 7 = -12. Show your work.",
        answer: "x = -5 (add 7 to both sides)"
      },
      {
        type: "true-false",
        question: "The absolute value of a number is always positive or zero.",
        answer: "True"
      }
    ],
    gradeGuidance: "Grades 6–7: order of operations, decimals, and negative integers. Grade 8: solving one-step equations and introduction to variables.",
    faq: [
      {
        q: "Does it cover negative numbers?",
        a: "Yes, integers and operations with negative numbers are standard in Pre-Algebra prompts."
      },
      {
        q: "Can I generate word problems?",
        a: "Yes. Specify 'pre-algebra word problems' in your topic to generate contextual exercises."
      }
    ],
    relatedSlugs: ["algebra", "math", "geometry"]
  },
  {
    slug: "ancient-history",
    name: "Ancient History",
    gradeRange: "Grades 6–10",
    intro: "Ancient History assessments cover early human civilizations, Mesopotamia, Ancient Egypt, Greece, Rome, and Mesoamerica. Revealing questions compare systems of governance, culture, and trade.",
    topics: [
      "Mesopotamia & early empires",
      "Ancient Egyptian civilization & pyramids",
      "Classical Greece & democracy",
      "The Roman Empire & Republic",
      "Early civilizations of Mesoamerica",
      "Ancient silk road & trade networks"
    ],
    guide: "Focus on comparing ancient civilizations rather than memorizing individual dynasties or names. Strong questions analyze how geography shaped development, governance styles, and how early legal codes like Hammurabi's Code established social order.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "Which ancient civilization is credited with the development of direct democracy? A) Rome B) Egypt C) Athens D) Sparta",
        answer: "C) Athens"
      },
      {
        type: "short-answer",
        question: "Explain the historical significance of the Code of Hammurabi.",
        answer: "It was one of the earliest and most complete written legal codes, establishing the principle of written laws and lex talionis (an eye for an eye)."
      },
      {
        type: "true-false",
        question: "The Roman Republic was ruled by an absolute emperor from its very beginning.",
        answer: "False (it was a republic ruled by a senate before becoming an empire)"
      }
    ],
    gradeGuidance: "Middle school: major achievements, mythology, daily life. High school: comparative governance, trade networks, and primary source analysis.",
    faq: [
      {
        q: "Can I generate quizzes on ancient myths?",
        a: "Yes, include mythology in your topic: e.g., 'Greek and Roman mythology comparison'."
      },
      {
        q: "Does it cover non-Western ancient history?",
        a: "Yes. Specify 'Ancient China — Han Dynasty' or 'Ancient Indus Valley Civilization' for focused coverage."
      }
    ],
    relatedSlugs: ["world-history", "us-history", "literature"]
  },
  {
    slug: "calculus",
    name: "Calculus",
    gradeRange: "Grades 11–12 / AP",
    intro: "Calculus assessments test limits, derivatives, integrals, and their applications. Advanced questions focus on rates of change and accumulation models.",
    topics: [
      "Limits & continuity",
      "Differentiation & derivatives",
      "Applications of derivatives (optimization, related rates)",
      "Integration & antiderivatives",
      "Fundamental Theorem of Calculus",
      "AP Calculus AB/BC review"
    ],
    guide: "Limits and derivative definitions are the core focus of early calculus. Assessments should test conceptual understanding of rates of change alongside mechanical differentiation. Use short-answer questions to track multi-step limits and integration procedures.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "What is the derivative of f(x) = 3x² - 5x + 2? A) 6x B) 6x - 5 C) 3x - 5 D) 6x - 5x",
        answer: "B) 6x - 5"
      },
      {
        type: "short-answer",
        question: "Evaluate the limit of (x² - 4)/(x - 2) as x approaches 2.",
        answer: "Limit is 4 (factor the numerator to (x-2)(x+2), simplify to x+2, and substitute x=2)"
      },
      {
        type: "true-false",
        question: "If a function is continuous at a point, it must also be differentiable at that point.",
        answer: "False (e.g., f(x) = |x| is continuous at x=0 but not differentiable)"
      }
    ],
    gradeGuidance: "Grade 11: pre-calculus and limits introduction. Grade 12 / AP Calculus AB: derivatives and basic integration. AP Calculus BC: parametric, polar, and infinite series.",
    faq: [
      {
        q: "Is this aligned with AP Calculus?",
        a: "Yes. Specify 'AP Calculus AB' or 'AP Calculus BC' in your topic prompt for targeted review questions."
      },
      {
        q: "Does it cover optimization word problems?",
        a: "Yes. Include 'optimization problems' in your topic prompt to get applied word problems."
      }
    ],
    relatedSlugs: ["physics", "algebra", "statistics"]
  },
  {
    slug: "organic-chemistry",
    name: "Organic Chemistry",
    gradeRange: "Grades 11–12 / College",
    intro: "Organic Chemistry assessments cover carbon compounds, functional groups, nomenclature, isomerism, and basic reaction mechanisms.",
    topics: [
      "Nomenclature of hydrocarbons (alkanes, alkenes)",
      "Functional groups (alcohols, ketones, carboxylic acids)",
      "Isomerism & stereochemistry",
      "Nucleophilic substitution & elimination",
      "Spectroscopy basics (IR, NMR)",
      "Organic synthesis pathways"
    ],
    guide: "Nomenclature rules are procedural. Strong worksheets focus on drawing structures from names and classifying functional groups. Reaction prediction questions help students develop mechanical reasoning for organic synthesis.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "Which functional group is characterized by a carbon-oxygen double bond (C=O) bonded to at least one hydrogen atom? A) Alcohol B) Ketone C) Aldehyde D) Carboxylic acid",
        answer: "C) Aldehyde"
      },
      {
        type: "short-answer",
        question: "Explain the difference between structural isomers and stereoisomers.",
        answer: "Structural isomers have the same formula but different atom connectivities; stereoisomers have the same connectivities but different 3D spatial arrangements."
      },
      {
        type: "true-false",
        question: "Alkenes are unsaturated hydrocarbons containing at least one carbon-carbon triple bond.",
        answer: "False (alkenes contain a double bond; alkynes contain a triple bond)"
      }
    ],
    gradeGuidance: "High school chemistry: basic functional groups. AP Chemistry/Elective: IUPAC naming rules, structural isomers. College intro: full reaction mechanisms.",
    faq: [
      {
        q: "Can it generate IUPAC naming questions?",
        a: "Yes. Use topics like 'IUPAC nomenclature of branched alkanes' to get targeted naming problems."
      },
      {
        q: "Does it cover reaction mechanisms?",
        a: "Yes. Include 'reaction mechanisms — SN1 and SN2 pathways' for advanced chemistry worksheets."
      }
    ],
    relatedSlugs: ["chemistry", "biology", "physics"]
  },
  {
    slug: "physical-science",
    name: "Physical Science",
    gradeRange: "Grades 8–10",
    intro: "Physical Science assessments bridge introductory chemistry and physics, exploring matter, energy, forces, and motion.",
    topics: [
      "Properties of matter & phase changes",
      "Periodic table & chemical bonding",
      "Newton's laws of motion",
      "Work, energy & simple machines",
      "Electricity & magnetism basics",
      "Waves, light & sound properties"
    ],
    guide: "Physical Science serves as a foundational course. Keep questions balanced between conceptual explanations (e.g., how heat transfers) and basic calculation problems (e.g., calculating speed or density). Focus on removing complex calculus or advanced algebra barriers.",
    exampleQuestions: [
      {
        type: "multiple-choice",
        question: "Which type of heat transfer occurs through direct contact between two objects? A) Convection B) Radiation C) Conduction D) Induction",
        answer: "C) Conduction"
      },
      {
        type: "short-answer",
        question: "A block has a mass of 50 grams and a volume of 10 cubic centimeters. Calculate its density.",
        answer: "Density = Mass ÷ Volume = 50 g ÷ 10 cm³ = 5 g/cm³"
      },
      {
        type: "true-false",
        question: "Sound waves can travel through a vacuum, such as outer space.",
        answer: "False (sound waves require a medium like air or water to propagate)"
      }
    ],
    gradeGuidance: "Middle school: states of matter, basic forces, waves. High school intro: density, periodic trends, energy formulas.",
    faq: [
      {
        q: "Does it cover basic density calculations?",
        a: "Yes. Specify 'density calculation practice problems' to get math-based questions."
      },
      {
        q: "What's the best question mix for Physical Science?",
        a: "MCQ for conceptual matching, fill-in-blank for vocabulary, and short-answer for simple computations."
      }
    ],
    relatedSlugs: ["earth-science", "physics", "chemistry"]
  }
];

export const worksheetSubjects: SubjectData[] = [
  {
    slug: "math",
    name: "Math",
    gradeRange: "Grades K–8",
    intro:
      "Math worksheets are the backbone of computational fluency practice. Effective math worksheets balance timed fact practice with applied problem-solving — building procedural speed through repetition while ensuring students can also apply what they know in real contexts. The best worksheets mix computation and word problems in a single sheet.",
    topics: ["Number sense & place value", "Addition, subtraction, multiplication & division", "Fractions, decimals & percents", "Ratios & proportions", "Pre-algebra & simple equations", "Word problems & applied math"],
    guide:
      "Math worksheets exist to build two different things at once — computational speed through repetition, and applied reasoning through word problems — and the most common mistake is a worksheet that only does one. A page of 30 identical multiplication problems builds fluency but not judgment; a page of word problems without any computation practice tests reasoning a student may not have the mechanical speed to execute under time pressure. The pain point shows up clearest in multi-step word problems, where a student who can multiply and divide correctly in isolation still struggles to determine which operation a situation actually calls for. Long division and multi-digit multiplication remain the two skills most likely to break down under worksheet practice, usually because a single misaligned column or forgotten regrouping step cascades into a wrong answer even when the student understands the concept. Ratios and percents are a frequent trouble spot in upper elementary and middle school because they require translating between three interchangeable representations (fraction, decimal, percent) that don't feel equivalent to students yet. The most effective math worksheets deliberately mix pure computation drills with a smaller number of applied word problems on the same page, so students build speed and judgment in the same sitting rather than treating them as unrelated skills.",
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
    topics: ["Main idea & summarizing", "Making inferences", "Author's purpose & tone", "Sequencing & story structure", "Cause & effect", "Comparing multiple texts", "Vocabulary in context"],
    guide:
      "Reading comprehension worksheets frequently over-index on literal recall — \"what happened first\" — because those questions are easy to write and easy to grade, while the harder, more valuable skill is inference: what does the text imply but never state directly. Students who read fluently can often still struggle badly with inference, because it requires holding multiple pieces of textual evidence in mind and drawing a conclusion the author never spells out. Author's purpose and tone present a similar challenge, because students tend to default to the most common answer (\"to inform\") without actually weighing the specific word choices and structure of the passage in front of them. A well-built comprehension worksheet forces students to point to specific textual evidence for every inference or tone question, rather than allowing a vague gut-feeling answer to pass. Cause-and-effect questions are deceptively hard in nonfiction and historical texts because multiple causes often interact, and a worksheet that only accepts one \"correct\" cause trains students to oversimplify. The most useful comprehension worksheets balance a majority of literal and structural questions with a smaller set of inference and evidence-based questions on the very same passage, so students build the full range of reading skills rather than only the easiest ones to test.",
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
    topics: ["Cell structure & function", "Photosynthesis & respiration", "Genetics & heredity", "Classification & taxonomy", "Human body systems", "Ecosystems & food chains"],
    guide:
      "Biology worksheets are most useful as structured practice before a lab, after a lecture, or as unit review — but they only work if they go beyond vocabulary matching into applying that vocabulary to a process or scenario. A worksheet that asks students to define \"osmosis\" in isolation builds weaker understanding than one that asks them to predict what happens to a specific cell in a specific solution, because the second version forces the vocabulary to actually do work. Cell biology and genetics are the two areas where worksheets most often stay too shallow, listing organelles or genetic terms for students to label rather than asking them to trace a process. Classification worksheets suffer from a related issue: memorizing the taxonomic hierarchy in order is a low-value task compared to using classification criteria to sort an unfamiliar organism, which is the actual skill taxonomy is meant to teach. Human body systems worksheets work best when they connect structure to function explicitly — not just naming the parts of the digestive system, but explaining what each part does and why the sequence matters. The most effective biology worksheets mix fill-in-the-blank for vocabulary, short-answer for process explanation, and multiple choice for conceptual checks, matching the same mix a real biology exam will use.",
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
    topics: ["One- and two-step equations", "Simplifying expressions & combining like terms", "Systems of equations", "Slope & linear graphing", "Factoring & quadratics", "Word problems & equation writing"],
    guide:
      "Algebra worksheets exist to build the repetition that turns a taught procedure into an automatic skill, but the biggest design mistake is scaffolding that disappears too fast. A worksheet that jumps from a fully-worked example straight to independent problems skips the guided-practice step where most of the actual learning happens. Combining like terms and distributing are the two mechanical skills most likely to have small, silent errors that compound into a wrong final answer even when the student understands the underlying concept, so worksheets that ask students to show their work catch these errors in a way that answer-only worksheets never will. Systems of equations introduce a second common failure point: students frequently solve correctly for one variable and then substitute incorrectly into the second equation, an error that only shows up if the worksheet requires full work rather than a final answer. Word problems are where algebra worksheets add the most value, because translating a real scenario into an equation is a different skill from solving an equation someone else already wrote. The most effective algebra worksheets progress from scaffolded examples to independent equation-solving to word problems in that order, on the same page, rather than treating each as a separate assignment.",
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
    topics: ["High-frequency sight words", "Phonics patterns (long vowels, digraphs, blends)", "Homophones", "Prefixes & suffixes", "Irregular & tricky spellings", "Proofreading & self-correction"],
    guide:
      "Spelling worksheets work best when they teach pattern recognition rather than rote memorization of individual words, because pattern recognition transfers to words a student has never seen before while memorization only helps with the exact word list studied. A worksheet built around the \"-ight\" family (light, night, fight, bright) teaches a rule that generalizes; a worksheet that just lists ten unrelated words to memorize for Friday's test does not. Homophones are a persistent pain point at every elementary grade level — there/their/they're, to/too/two — because these errors survive well past the grade where the rule was first taught, precisely because spell-check doesn't catch them. Irregular spellings need a different worksheet strategy entirely: repetition and memory tricks rather than pattern logic, since there's no rule to derive them from. Prefixes and suffixes are underused in spelling worksheets relative to their value, because a student who reliably knows that \"-tion\" turns a verb into a noun can correctly spell hundreds of words they've never explicitly studied. The most effective spelling worksheets combine a pattern-based section, a homophone or irregular-word section, and a short proofreading exercise where students find and fix planted errors in context — because recognizing a misspelling in your own writing is the actual skill spelling instruction is building toward.",
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
    topics: ["Atomic structure & periodic table basics", "Bonding: ionic, covalent & metallic", "Balancing equations & reaction types", "Stoichiometry & mole conversions", "Acids, bases & pH", "Periodic trends"],
    guide:
      "Chemistry worksheets are where students build the systematic, step-by-step habits that timed exams later demand — unit conversions, dimensional analysis, balancing by inspection — and the biggest design flaw is a worksheet that gives away the method instead of making students identify it themselves. If every problem on a stoichiometry worksheet is already labeled \"mole-to-mole\" or \"mole-to-gram,\" students practice execution but never practice the harder skill of recognizing which type of conversion a problem requires. Balancing equations worksheets have a similar issue when they only include equations that balance cleanly with small whole numbers; students need some exposure to trickier ratios so the skill generalizes. Periodic trends are frequently reduced to a memorized direction without any worksheet practice applying that trend to compare two specific, unfamiliar elements — which is the actual skill being tested on most chemistry exams. Acid-base worksheets tend to stop at pH calculation without connecting it back to the underlying particle-level model of what makes a solution acidic or basic, leaving students able to calculate but not explain. The most effective chemistry worksheets mix a calculation-heavy section requiring full shown work, a trend-comparison section using unfamiliar element pairs, and a short-answer section asking students to explain the reasoning behind a reaction or property.",
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
    topics: ["Ancient & classical civilizations", "Medieval Europe & feudalism", "Renaissance, Reformation & exploration", "Revolutions (French, Industrial, political)", "Imperialism & global conflict", "20th-century world wars & their aftermath"],
    guide:
      "World History worksheets are meant to build the analytical habits — document analysis, comparison across civilizations, cause-and-effect reasoning — that essay-based and document-based exams later require, but many worksheets never get past basic recall because comparison questions are harder to write than fact-recall questions. A worksheet that only asks students to identify events in isolation trains a skill that DBQ and long-essay formats don't actually test; a worksheet that asks students to compare the causes of two revolutions trains the transferable skill those exam formats require. Primary source analysis is chronically under-practiced on worksheets relative to its exam weight, because most worksheets summarize the source's content instead of asking students to read the actual document and extract its purpose, audience, and point of view. The sheer geographic and chronological breadth of world history also means students frequently confuse overlapping eras and empires, so worksheets that explicitly contrast two similar-but-different civilizations or time periods address a real and common point of confusion. The most effective world history worksheets combine short-answer causation and comparison questions with at least one primary-source excerpt for students to analyze directly.",
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
    topics: ["Parts of speech & sentence basics", "Subject-verb agreement", "Punctuation (commas, apostrophes, semicolons)", "Sentence types & combining clauses", "Verb tense consistency", "Common usage & style errors"],
    guide:
      "Grammar worksheets are most effective when they present rules embedded in realistic sentences rather than as isolated, abstract rules to memorize — a student who can state the comma rule for introductory phrases but can't apply it while writing their own paragraph hasn't actually learned anything useful. Fill-in-the-blank and sentence-correction formats reveal far more than multiple choice here, because correcting or completing a sentence requires production, while multiple choice only requires recognition. Comma usage and apostrophes remain the most commonly missed areas across every grade band, particularly plural possessives and comma splices joining two complete sentences without a conjunction. Run-on sentences and sentence fragments are a persistent middle- and high-school problem that's best addressed with worksheets asking students to rewrite a broken sentence multiple different correct ways, since there's rarely only one fix. Verb tense consistency is a subtler error that students often can't hear in their own writing, so a worksheet that presents a short passage with tense shifts planted in it more closely matches the kind of error students actually make. The most useful grammar worksheets mix identification, fill-in-the-blank application, and sentence-level correction so students both recognize and can produce correct grammar.",
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
    topics: ["Kinematics & motion", "Newton's laws & force problems", "Work, energy & power", "Momentum & collisions", "Circuits & Ohm's law", "Waves & optics"],
    guide:
      "Physics worksheets build the systematic problem-solving process — identify the knowns, choose the right formula, check units, solve — that students need to have automatic by exam time, and the most common worksheet flaw is skipping straight to plug-and-chug problems before that process is established. A worksheet that gives students a diagram and asks them to first identify which forces are acting, before calculating anything, builds the conceptual step that a formula-only worksheet skips entirely. Multi-step problems are where physics worksheets add the most value, because they force students to combine multiple concepts in sequence rather than applying one formula in isolation. Circuit worksheets have a specific common failure: students memorize \"series circuits share current, parallel circuits share voltage\" as a rule and apply it blindly to unfamiliar circuit diagrams without a mental model of why, so worksheets that vary the diagram layout test whether the rule was actually understood. Energy conservation problems are similarly prone to rule-memorization over reasoning, since students often don't recognize when a conservation-of-energy approach is faster than a kinematics approach for the same problem. The most effective physics worksheets sequence from conceptual identification, to single-formula practice, to multi-step combined problems.",
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
    topics: ["Angles, lines & basic shapes", "Congruence & similarity", "Area, perimeter & volume formulas", "The Pythagorean theorem", "Coordinate geometry", "Circles & arc relationships", "Two-column proofs"],
    guide:
      "Geometry worksheets have to build two different skills side by side: formula application and justification, and most worksheets lean heavily toward the first because it's far easier to grade. That imbalance leaves students who can compute correctly but freeze the moment a question asks them to prove or explain. The Pythagorean theorem is the clearest example of a formula that gets reduced to plug-and-solve practice without ever testing whether students recognize when it applies — a worksheet that mixes \"find the hypotenuse\" problems with \"is this triangle a right triangle\" recognition problems tests both the calculation and the underlying understanding. Congruence and similarity are frequently confused because both involve comparing two shapes, and a worksheet that only asks \"are these congruent, yes or no\" misses the actual point of the unit, which is identifying which specific theorem justifies the claim. Formal two-column proofs are the single hardest geometry skill to build through worksheets, and they work best when scaffolded — a worksheet that gives students some of the proof steps and asks them to fill in the missing justifications teaches the proof-writing process far more effectively than a blank page and a diagram. The most effective geometry worksheets combine calculation practice, shape-property identification, and at least one scaffolded proof.",
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
    topics: ["Context clues", "Synonyms & antonyms", "Word roots, prefixes & suffixes", "Multiple-meaning words", "Using words correctly in original sentences", "Academic (Tier 2) vocabulary"],
    guide:
      "Vocabulary worksheets built around definition-matching alone create a well-known illusion of mastery — a student can correctly draw a line from \"meticulous\" to \"very careful\" and still never produce the word correctly in their own writing, because recognizing a definition and generating correct usage are genuinely different skills. The single highest-value addition to any vocabulary worksheet is a section requiring students to write an original sentence with the target word, because that's the only format that actually tests production rather than recognition. Context-clue worksheets are the next most valuable format, since they mirror what students actually do when they hit an unfamiliar word in real reading. Word roots and affixes deserve more worksheet time than they typically get, because a student who reliably knows that \"bio\" means life and \"phon\" means sound can decode dozens of unfamiliar words independently. Multiple-meaning words are a specific and often-overlooked trap, since students learn one meaning and default to it everywhere, so a worksheet that uses the same word across genuinely different sentence contexts catches a gap that single-definition practice misses. The most effective vocabulary worksheets layer context-clue inference, root/affix decoding, and original-sentence production on the same page.",
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
    topics: ["Colonial era & the American Revolution", "The Constitution & founding government", "Westward expansion", "Civil War & Reconstruction", "Industrialization & immigration", "The Great Depression & New Deal", "Civil Rights Movement", "Cold War America"],
    guide:
      "US History worksheets build the document-analysis and evidence-based writing skills that DBQ and short-answer exam formats specifically require, but they only work if they move past simple fact-recall into asking students to use evidence to support a claim. A worksheet that asks \"what year was the Fair Labor Standards Act passed\" tests recall a search engine could answer instantly; a worksheet that asks students to use that law as evidence for a broader claim about the New Deal's goals builds the actual historical-argument skill the exam will test. Reconstruction and the Civil Rights Movement are the two units most likely to be tested too shallowly on worksheets, reduced to \"name three amendments\" style questions that skip the more revealing question of why change was contested, incomplete, or slow. Primary source excerpts are underused on US History worksheets relative to how central they are to actual assessments, and a worksheet that pairs a short primary source with an analysis question builds exactly the skill a DBQ requires in miniature. The most effective US History worksheets combine a fact-based section, a short primary-source excerpt with analysis questions, and a causation or significance short-answer prompt.",
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
  {
    slug: "literature",
    name: "Literature",
    gradeRange: "Grades 6–12",
    intro:
      "Literature worksheets give students a structured place to slow down and work with a text — tracking evidence, annotating passages, and building an argument one step at a time. The best ones guide close reading before asking for interpretation, so students practice finding support before they're asked to defend a claim.",
    topics: ["Theme and main ideas", "Character analysis and development", "Plot structure and conflict", "Setting and atmosphere", "Figurative language and symbolism", "Point of view and narrator bias"],
    guide:
      "A literature worksheet is not a quiz with more lines. Its job is to scaffold the reading process itself: notice, gather evidence, then interpret. Worksheets that open with \"What is the theme of the novel?\" skip the steps where students actually learn to read closely, and the answers that come back are vague because students had nothing concrete to build from. A stronger sequence starts with a short passage and asks students to quote two lines that reveal a character's motivation, then explain what each quote shows, and only then asks for a claim about the character. Graphic-organizer-style prompts work well on paper: a three-column evidence chart (quote, page, what it shows) or a plot diagram students fill in chapter by chapter. Literary devices are best practiced in context — \"find one example of foreshadowing in Chapter 3 and explain what it hints at\" teaches far more than a matching list of device definitions. For homework, pair one passage-based section with one short written response, so the worksheet builds the evidence students then use in the paragraph. QuizKraft's literature worksheets follow that order and include an answer key with model responses, which makes them usable as guided reading packets, discussion prep, or sub-day work.",
    exampleQuestions: [
      { type: "short-answer", question: "Quote one line from the passage that shows how the narrator feels about leaving home, then explain in one sentence what the line reveals.", answer: "Answers vary. Strong responses quote a specific line and explain the feeling it shows (e.g. reluctance, relief) rather than summarizing the plot." },
      { type: "fill-in-the-blank", question: "When an author gives hints about events that will happen later in the story, the technique is called ________.", answer: "Foreshadowing" },
      { type: "short-answer", question: "Complete the evidence chart: write one claim about the main character's biggest change, and list two pieces of text evidence that support it.", answer: "Answers vary. A complete response states a clear claim and gives two quotes or specific events, each with a page or paragraph reference." },
    ],
    gradeGuidance:
      "Grades 6–8: character traits, plot structure, and finding evidence in short passages. Grades 9–10: theme, figurative language, and evidence-based paragraphs. Grades 11–12: author's purpose, literary criticism lenses, and comparative analysis across texts. Name the book and chapter to anchor the worksheet in the text your class is reading.",
    faq: [
      { q: "Can I make a worksheet for a specific novel or short story?", a: "Yes. Name the text and the section: 'To Kill a Mockingbird, Chapters 9–11 — Scout's view of her father' produces evidence and analysis prompts tied to those chapters." },
      { q: "Can it work as a reading guide students complete while they read?", a: "Yes. Ask for chapter-by-chapter questions, and set the question types to short answer and fill-in-the-blank so students record evidence as they go." },
      { q: "Does the answer key include model answers for open-ended questions?", a: "Yes. Short-answer items include a model response that shows what a complete answer contains, which helps with consistent grading and peer review." },
      { q: "Can I use it for a literary devices practice sheet?", a: "Yes. Specify the devices and a text, such as 'metaphor, symbolism and irony in The Giver', so students practice identifying devices in context rather than from definitions alone." },
    ],
    relatedSlugs: ["grammar", "vocabulary", "reading-comprehension"],
  },
  {
    slug: "environmental-science",
    name: "Environmental Science",
    gradeRange: "Grades 9–12",
    intro:
      "Environmental science worksheets turn big systems — water cycles, food webs, energy flow — into practice students can work through on paper. The strongest ones combine diagram labeling, data interpretation, and short explanations, so students practice reading real environmental data instead of only memorizing terms.",
    topics: ["Ecosystem structure and energy flow", "Biodiversity and conservation", "Renewable and non-renewable energy", "Water and air pollution", "Climate change and greenhouse effect", "Sustainable resource management"],
    guide:
      "Environmental science is a data-heavy subject, and worksheets are where students should practice handling that data before they're assessed on it. A worksheet that only asks students to define \"biodiversity\" or \"carbon footprint\" misses the skills the course actually depends on: reading a graph of CO₂ levels over time, calculating the energy lost between trophic levels, or comparing two land-use scenarios. Good environmental science worksheets mix three kinds of work. First, labeling and diagram work — the carbon cycle, the nitrogen cycle, an energy pyramid — where students place processes in the right order. Second, short data tasks: a small table of species counts or rainfall totals followed by questions that ask what the data shows and what might explain it. Third, applied reasoning, such as \"a factory begins releasing warm water into a river; predict two effects on the ecosystem.\" The 10% rule for energy transfer is a reliable source of practice problems, because students often know the rule but misapply it across several levels. Worksheets also work well for case studies — a local watershed, a deforestation example — where students can practice cause-and-effect chains. QuizKraft builds environmental science worksheets in this mixed format, with an answer key that shows the reasoning, so they work as homework, lab follow-ups, or review packets.",
    exampleQuestions: [
      { type: "short-answer", question: "Producers in a food chain store 10,000 kcal of energy. Using the 10% rule, how much energy reaches the secondary consumers? Show your work.", answer: "100 kcal — 10,000 × 0.10 = 1,000 kcal for primary consumers; 1,000 × 0.10 = 100 kcal for secondary consumers." },
      { type: "fill-in-the-blank", question: "In the carbon cycle, plants remove carbon dioxide from the atmosphere through the process of ________.", answer: "Photosynthesis" },
      { type: "short-answer", question: "A factory starts releasing warm water into a river. Predict two effects on the river ecosystem and explain each.", answer: "Example: dissolved oxygen drops because warm water holds less oxygen, stressing fish; some temperature-sensitive species decline or move away, changing the food web." },
    ],
    gradeGuidance:
      "Grades 9–10: ecosystems, cycles of matter, and human impact basics. Grades 11–12 / APES: energy calculations, population dynamics, pollution data, and policy case studies. Include 'data table' or 'graph' in your topic to weight the worksheet toward data interpretation.",
    faq: [
      { q: "Can worksheets include data tables for students to interpret?", a: "Yes. Ask for it directly, e.g. 'water quality data table for a local stream — interpret dissolved oxygen and temperature', and the questions will be built around the data." },
      { q: "Does it work for AP Environmental Science practice?", a: "Yes. Set difficulty to Hard and name the unit, such as 'APES Unit 3 — population growth and carrying capacity calculations'." },
      { q: "Can I make a worksheet to follow up a lab or field trip?", a: "Yes. Describe what students did, for example 'leaf litter sampling lab — biodiversity index and observations', and the worksheet will ask students to analyze that activity." },
      { q: "Can it cover a local environmental issue?", a: "Yes. Name the issue and place, and the worksheet will ask cause-and-effect and trade-off questions about it. Check local facts against your own sources before handing it out." },
    ],
    relatedSlugs: ["biology", "chemistry", "earth-science"],
  },
  {
    slug: "economics",
    name: "Economics",
    gradeRange: "Grades 10–12",
    intro:
      "Economics worksheets give students practice with the tools of the subject — supply and demand graphs, cost calculations, and real-world scenarios. Working through problems step by step on paper is how students move from knowing a definition to actually using an economic model.",
    topics: ["Supply and demand", "Market structures (monopoly, competition)", "Inflation and unemployment", "Monetary and fiscal policy", "Global trade and tariffs", "Personal finance and budgeting"],
    guide:
      "Economics is a modeling subject, so worksheets should make students use the models, not just name them. The most common gap is students who can recite \"when price rises, quantity demanded falls\" but cannot shift a curve correctly when a scenario changes. Good economics worksheets give a short scenario — a frost destroys part of the orange crop, a new tax is placed on sugary drinks — and ask students to decide which curve shifts, in which direction, and what happens to equilibrium price and quantity. That sequence (identify the curve, shift it, read the new equilibrium) is the core skill, and repeating it across several scenarios on one page builds fluency. Calculations are the second pillar: opportunity cost, price elasticity, marginal cost, and simple GDP components all produce clean practice problems with checkable answers. A third useful section is real-world application, where students connect a news-style example to a concept such as inflation or comparative advantage. Students frequently confuse a change in demand (a shift of the whole curve) with a change in quantity demanded (a movement along it), so worksheets that include both types of question side by side expose that confusion early. QuizKraft's economics worksheets mix scenario, calculation, and application questions, with an answer key that explains each shift and calculation.",
    exampleQuestions: [
      { type: "short-answer", question: "A frost destroys a large part of this year's orange crop. Which curve shifts, in which direction, and what happens to the equilibrium price of oranges?", answer: "Supply shifts left (decreases), so the equilibrium price rises and the equilibrium quantity falls." },
      { type: "fill-in-the-blank", question: "The value of the next-best alternative you give up when making a choice is called the ________.", answer: "Opportunity cost" },
      { type: "short-answer", question: "The price of a concert ticket rises from $40 to $50 and the quantity sold falls from 1,000 to 900. Using simple percentage changes, calculate the price elasticity of demand and state whether demand is elastic or inelastic.", answer: "Quantity falls 10% and price rises 25%, so elasticity = 10% ÷ 25% = 0.4. Demand is inelastic (less than 1)." },
    ],
    gradeGuidance:
      "Grades 10–11: scarcity, opportunity cost, supply and demand, and market structures. Grade 12 / AP Micro and Macro: elasticity, cost curves, GDP, inflation, and monetary policy. Name the unit, for example 'AP Macro — fiscal policy and the multiplier', for targeted practice.",
    faq: [
      { q: "Can worksheets include supply and demand graphing practice?", a: "Yes. Ask for 'supply and demand shift scenarios' and the worksheet will describe events and ask students to identify and explain each shift. Students can sketch the graphs in the space provided." },
      { q: "Can it generate calculation practice like elasticity or GDP?", a: "Yes. Name the calculation, such as 'price elasticity of demand — 6 practice problems', and the answer key will show each step." },
      { q: "Does it work for personal finance units?", a: "Yes. Topics like budgeting, interest, credit and taxes work well; include the grade level so the numbers and scenarios fit your students." },
      { q: "Can I make worksheets for AP Economics review?", a: "Yes. Set difficulty to Hard and name the AP unit for practice that mirrors the free-response style of reasoning." },
    ],
    relatedSlugs: ["algebra", "civics", "us-history"],
  },
  {
    slug: "civics",
    name: "Civics",
    gradeRange: "Grades 8–12",
    intro:
      "Civics worksheets help students practice how government actually works — reading founding documents, tracing how a bill becomes law, and applying constitutional principles to real situations. Structured practice on paper turns abstract ideas like federalism and checks and balances into skills students can use.",
    topics: ["Principles of democracy", "The US Constitution and Bill of Rights", "Three branches of government", "Federalism and separation of powers", "Elections and political parties", "Civil rights and liberties"],
    guide:
      "Civics content is full of structures and processes, and worksheets are the natural place to practice them in order. A common weak worksheet is a vocabulary list — define \"veto,\" define \"amendment\" — that students complete without ever understanding how the pieces fit together. Stronger civics worksheets ask students to trace a process: put the steps of how a bill becomes law in order, or follow a case from a lower court to the Supreme Court. Primary-source sections work well on paper; a short excerpt from the Constitution or the Bill of Rights followed by \"which right does this protect, and what is one real situation where it applies?\" builds both reading and reasoning. Scenario questions are the most valuable part: \"the President signs an executive order that a state disagrees with — which branch or process could check it?\" asks students to apply checks and balances rather than recite them. Students often mix up the powers of the federal and state governments, so a sorting task (federal, state, or shared) is a reliable worksheet format. For local relevance, worksheets can also cover how to register to vote or how a local council makes decisions. QuizKraft's civics worksheets mix process, primary-source and scenario questions, with an answer key that cites the relevant article or amendment.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "The power of the President to reject a bill passed by Congress is called a ________, and Congress can override it with a ________ vote in both houses.", answer: "Veto; two-thirds" },
      { type: "short-answer", question: "Sort each power as federal, state, or shared: printing money, issuing driver's licenses, collecting taxes, declaring war.", answer: "Printing money — federal; issuing driver's licenses — state; collecting taxes — shared; declaring war — federal." },
      { type: "short-answer", question: "Read the First Amendment. Name two freedoms it protects and describe one real situation where one of them would apply.", answer: "Any two of: religion, speech, press, assembly, petition. Example: students organizing a peaceful protest are exercising freedom of assembly." },
    ],
    gradeGuidance:
      "Grade 8: the Constitution, the three branches, and the Bill of Rights. Grades 9–10: federalism, elections, and civil rights. Grades 11–12 / AP Government: Supreme Court cases, policy-making, and political participation. Name a specific document or case to anchor the worksheet.",
    faq: [
      { q: "Can worksheets be based on a specific founding document?", a: "Yes. Name the document and section, such as 'Constitution Article I — powers of Congress', and the worksheet will include excerpt-based questions." },
      { q: "Can it cover landmark Supreme Court cases?", a: "Yes. Name the case, for example 'Marbury v. Madison and judicial review', and students will practice explaining the case and its impact." },
      { q: "Does it work for state or local government units?", a: "Yes. Include your state or city in the topic. Double-check local details against official sources, as structures vary by place." },
      { q: "Can I make a worksheet that prepares students for a citizenship-style test?", a: "Yes. Ask for 'civics test review — branches, rights and responsibilities', and set the question types to multiple choice and fill-in-the-blank." },
    ],
    relatedSlugs: ["us-history", "world-history", "literature"],
  },
  {
    slug: "art-history",
    name: "Art History",
    gradeRange: "Grades 9–12",
    intro:
      "Art history worksheets give students a structured way to look closely at artworks — describing, analyzing and placing a work in its period before jumping to interpretation. Guided observation on paper builds the visual analysis skills that a slideshow alone rarely does.",
    topics: ["Ancient and classical art", "Renaissance and Baroque art", "Impressionism and Post-Impressionism", "Modern art movements (Cubism, Surrealism)", "Non-Western art traditions", "Visual analysis and terminology"],
    guide:
      "The core skill in art history is looking carefully, and worksheets are where that looking gets structured. A worksheet that only asks \"which period is this painting from?\" rewards memorizing slides, not understanding art. A stronger approach follows the classic sequence: describe what you see (subject, colors, composition), analyze how the artist made choices (perspective, light, brushwork), and only then interpret meaning and context. Worksheets can build this into a repeatable organizer that students fill in for every artwork in a unit. Comparison tasks are especially effective on paper — placing a Renaissance portrait next to a Baroque one and asking students to name two visual differences teaches period characteristics far better than a list of dates. Vocabulary such as chiaroscuro, contrapposto or impasto sticks when students must find it in a specific work rather than define it. Context sections can connect a work to its time: patronage, religion, politics or new technology. Students often confuse styles from adjacent periods, so side-by-side comparisons expose those mix-ups early. QuizKraft's art history worksheets include observation, comparison and context prompts, with an answer key that models strong visual analysis. Pair the worksheet with the images you show in class, since the worksheet itself does not include artwork images.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "The technique of using strong contrasts between light and dark to create a sense of volume, used heavily by Caravaggio, is called ________.", answer: "Chiaroscuro" },
      { type: "short-answer", question: "Compare Leonardo's Mona Lisa with a Baroque portrait of your choice. Name two visual differences in lighting or composition.", answer: "Answers vary. Strong responses note, for example, the soft, even sfumato light of the Mona Lisa versus dramatic directional light in Baroque work, and a calm, balanced pose versus a more dynamic one." },
      { type: "short-answer", question: "Using the describe–analyze–interpret organizer, write one sentence for each step about the artwork shown in class.", answer: "Answers vary. A complete response describes visible elements, explains one artistic choice, and offers an interpretation supported by those observations." },
    ],
    gradeGuidance:
      "Grades 9–10: major periods, key artists, and basic visual vocabulary. Grades 11–12 / AP Art History: formal analysis, context and patronage, and cross-cultural comparison. Name the period or specific works you're teaching so the questions match your slides.",
    faq: [
      { q: "Do the worksheets include images of the artworks?", a: "No. The worksheets contain the questions and prompts; pair them with the images you show in class or in your slides." },
      { q: "Can I make a worksheet for a specific artwork or artist?", a: "Yes. Name the work, such as 'The School of Athens by Raphael', and the worksheet will include observation and context questions about it." },
      { q: "Can it support AP Art History practice?", a: "Yes. Name the content area and set difficulty to Hard for questions that ask about form, function, content and context." },
      { q: "Can it cover non-Western art traditions?", a: "Yes. Specify the tradition and period, for example 'Mughal miniature painting' or 'West African sculpture', for culturally specific prompts." },
    ],
    relatedSlugs: ["world-history", "us-history", "literature"],
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    gradeRange: "Grades 8–12",
    intro:
      "Computer science worksheets let students practice computational thinking away from the keyboard — tracing code by hand, predicting output, and writing short algorithms. Paper practice exposes misunderstandings that running code can hide, because students can't just guess and re-run.",
    topics: ["Basic programming logic (loops, conditionals)", "Variables and data types", "Algorithms and sorting", "Object-oriented programming", "Web development basics (HTML/CSS/JS)", "Cybersecurity and digital ethics"],
    guide:
      "Tracing code by hand is one of the most effective computer science exercises, and worksheets are the natural place for it. When students run code on a computer, they can tweak values until the output looks right without understanding why; on paper they have to follow each line, track each variable, and predict the result. Good computer science worksheets build around three kinds of tasks. First, tracing: a short loop or conditional with a trace table where students record variable values at each step. Second, prediction and debugging: show code with a bug and ask students to find and explain it — off-by-one errors in loops and confusing = with == are reliable choices. Third, writing: pseudocode or a short function that solves a defined problem, such as counting the even numbers in a list. Unplugged topics also work well on paper, including binary conversion, Boolean logic and simple sorting steps. Loops are the most common sticking point, especially how many times a loop runs and what the counter's final value is, so trace tables for loops deserve repeated practice. QuizKraft's computer science worksheets can target a specific language or stay language-neutral with pseudocode, and the answer key walks through each trace step.",
    exampleQuestions: [
      { type: "short-answer", question: "Trace this code and give the final value of total:\ntotal = 0\nfor i in range(1, 5):\n    total = total + i", answer: "10 — i takes the values 1, 2, 3, 4, so total = 1 + 2 + 3 + 4 = 10." },
      { type: "fill-in-the-blank", question: "The binary number 1011 equals ________ in decimal.", answer: "11 (8 + 0 + 2 + 1)" },
      { type: "short-answer", question: "Write pseudocode for a function that counts how many even numbers are in a list.", answer: "Example: set count to 0; for each number in the list, if number mod 2 equals 0, add 1 to count; return count." },
    ],
    gradeGuidance:
      "Grades 8–9: algorithms, binary, Boolean logic, and block-based or simple Python. Grades 10–11: loops, conditionals, functions, and lists. Grade 12 / AP CSA or CSP: object-oriented concepts, recursion, and algorithm efficiency. Name the language (Python, Java, JavaScript) to match your course.",
    faq: [
      { q: "Can worksheets use a specific programming language?", a: "Yes. Name it in the topic, for example 'Java for loops and arrays — AP CSA', and the code samples will use that language." },
      { q: "Can it make code-tracing worksheets?", a: "Yes. Ask for 'trace table practice' with a topic like nested loops, and students will get code with step-by-step tracing questions." },
      { q: "Does it work for unplugged computer science lessons?", a: "Yes. Binary, Boolean logic, sorting algorithms and pseudocode all work well as paper-only worksheets." },
      { q: "Can I make debugging practice worksheets?", a: "Yes. Ask for 'find the bug' practice on a topic, and the worksheet will include faulty code with the error and fix explained in the answer key." },
    ],
    relatedSlugs: ["algebra", "math", "physics"],
  },
  {
    slug: "french",
    name: "French",
    gradeRange: "Grades 6–12",
    intro:
      "French worksheets give students the repeated, structured practice that language learning depends on — conjugation drills, vocabulary in context, and short translation and writing tasks. A good worksheet moves from controlled practice to freer use of the language on the same page.",
    topics: ["Present tense conjugation", "Passé composé vs. imparfait", "Vocabulary by theme (family, food, school)", "Adjective agreement and placement", "Direct and indirect object pronouns", "Subjunctive mood"],
    guide:
      "Language learning needs volume, and worksheets supply it in a form students can complete at their own pace. The best French worksheets follow a progression from controlled to open practice. They start with focused drills — conjugating -er, -ir and -re verbs, or matching vocabulary to images or definitions — where there is one right answer. Then come sentence-level tasks, such as completing sentences with the correct verb form or translating short phrases. They finish with a small production task: write three sentences about your weekend using the passé composé. That progression keeps weaker students supported while still pushing everyone toward real use. Grammar points that cause the most errors deserve their own targeted worksheets: gender and article agreement, the choice between avoir and être in the passé composé, and adjective placement. Worksheets also work well for reading practice, using a short paragraph in French followed by comprehension questions. Students often apply English word order directly, so sentence-ordering tasks are a useful check. QuizKraft's French worksheets match the grammar point and vocabulary theme you name, with an answer key for self-checking, which makes them suitable for homework, stations or extra practice.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Complete with the correct present-tense form of finir: Nous ________ nos devoirs avant le dîner.", answer: "finissons" },
      { type: "fill-in-the-blank", question: "Passé composé: Hier, elle ________ (aller) au cinéma.", answer: "est allée (aller uses être, and the past participle agrees with the feminine subject)" },
      { type: "short-answer", question: "Translate into French: 'I have a small black cat.'", answer: "J'ai un petit chat noir." },
    ],
    gradeGuidance:
      "Grades 6–8 / French I: greetings, numbers, -er verbs, and basic vocabulary themes. Grades 9–10 / French II–III: passé composé, imparfait, and reflexive verbs. Grades 11–12 / AP French: subjunctive, complex sentences, and reading comprehension. Name the grammar point and vocabulary theme together for the most focused practice.",
    faq: [
      { q: "Can I make a conjugation drill worksheet?", a: "Yes. Name the tense and verb group, for example 'passé composé with avoir and être — 15 practice sentences'." },
      { q: "Can worksheets be themed around a vocabulary unit?", a: "Yes. Combine the theme and grammar point, such as 'food and restaurant vocabulary with partitive articles'." },
      { q: "Does it include reading comprehension in French?", a: "Yes. Ask for a short French passage with comprehension questions, and set the grade so the vocabulary fits your class." },
      { q: "Can instructions be in English for beginners?", a: "Yes. Mention 'instructions in English' in the topic for French I classes." },
    ],
    relatedSlugs: ["spanish", "grammar", "vocabulary"],
  },
  {
    slug: "geography",
    name: "Geography",
    gradeRange: "Grades 6–12",
    intro:
      "Geography worksheets give students hands-on practice with maps, coordinates, climate data and the connections between people and places. Working through labeling, data and cause-and-effect tasks on paper builds spatial thinking that reading alone doesn't.",
    topics: ["Map reading and map projections", "Physical systems (rivers, mountains, climate zones)", "Human migration and population density", "Cultural geography and globalization", "Natural hazards and disasters", "Geopolitics and border disputes"],
    guide:
      "Geography is a spatial subject, and worksheets should give students something to locate, read or compare rather than just terms to define. Map skills are the foundation: latitude and longitude, scale, cardinal directions and map types. A worksheet that asks students to find the coordinates of five cities, or to estimate the distance between two points using a scale bar, practices skills students will use for the rest of the course. Climate and data tasks are the second strand — a climograph or a small table of rainfall and temperature, followed by questions about which climate zone it represents and why. The third strand is human geography: population density, migration, and how physical features shape where people live. These work best as cause-and-effect questions, such as \"why do so many major cities sit on rivers or coasts?\" Students commonly confuse latitude with longitude, and weather with climate, so worksheets that put those pairs side by side catch the confusion early. Regional worksheets can combine all three strands for a single country or continent. QuizKraft's geography worksheets include map-skill, data and reasoning questions, with an answer key; pair them with a printed map or atlas for the labeling sections.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Lines of ________ run east–west and measure distance north or south of the Equator.", answer: "Latitude" },
      { type: "short-answer", question: "A city has hot temperatures all year and more than 2,000 mm of rain spread across every month. Which climate zone is it most likely in, and why?", answer: "Tropical rainforest (tropical wet) — consistently high temperatures and heavy rainfall in every month are its defining features." },
      { type: "short-answer", question: "Give two reasons why many large cities developed along rivers.", answer: "Examples: fresh water for drinking and farming, transport and trade routes, fertile soil from flooding." },
    ],
    gradeGuidance:
      "Grades 6–7: map skills, continents and oceans, and landforms. Grades 8–9: climate zones, regions, and population. Grades 10–12 / AP Human Geography: migration, urbanization, and economic geography. Name a region or skill, such as 'latitude and longitude practice', for focused worksheets.",
    faq: [
      { q: "Do the worksheets include printed maps?", a: "No. The worksheets contain questions and tasks; pair map-labeling sections with a printed map, atlas page, or online map." },
      { q: "Can I make a map skills worksheet?", a: "Yes. Ask for 'latitude, longitude and scale practice' at your grade level for coordinate and distance problems." },
      { q: "Can it focus on one country or region?", a: "Yes. Name it, for example 'physical and human geography of Japan', for region-specific questions." },
      { q: "Does it support AP Human Geography?", a: "Yes. Name the unit and set difficulty to Hard for model-based questions like the demographic transition model." },
    ],
    relatedSlugs: ["earth-science", "world-history", "us-history"],
  },
  {
    slug: "astronomy",
    name: "Astronomy",
    gradeRange: "Grades 8–12",
    intro:
      "Astronomy worksheets help students practice the models behind the night sky — moon phases, seasons, scale and the life cycle of stars. Diagram tasks and simple calculations on paper make abstract space concepts concrete enough to reason about.",
    topics: ["Planets and orbital mechanics", "Stellar evolution (main sequence to black holes)", "Galaxies and cosmic structures", "The Big Bang theory and cosmology", "Observational astronomy and telescopes", "Space exploration history"],
    guide:
      "Astronomy is full of models that students think they understand until they have to draw or explain them. The classic example is the seasons: many students believe seasons happen because Earth is closer to the Sun in summer, and a worksheet that asks them to draw Earth's tilted axis at two points in its orbit exposes that misconception immediately. Good astronomy worksheets lean on diagrams and sequences. Students can order moon phases, label a diagram of a solar eclipse versus a lunar eclipse, or arrange the stages of a star's life cycle. Scale is another strong worksheet topic, because the distances are so large that students need to work with them: converting astronomical units, or comparing the Sun's diameter to Earth's. Simple calculations, like light travel time from the Sun to Earth (about 8 minutes), turn facts into reasoning. Reading data from tables of planet properties — mass, distance, orbital period — lets students spot patterns such as farther planets taking longer to orbit. Moon phases deserve repeated practice because students often think they are caused by Earth's shadow. QuizKraft's astronomy worksheets combine diagram, sequencing, scale and data tasks, with an answer key that explains the model behind each answer.",
    exampleQuestions: [
      { type: "short-answer", question: "Explain what causes Earth's seasons. Your answer should mention Earth's axis.", answer: "Earth's axis is tilted about 23.5°. As Earth orbits the Sun, each hemisphere is tilted toward the Sun for part of the year, getting more direct sunlight and longer days (summer), and away from it for another part (winter). Distance from the Sun is not the cause." },
      { type: "fill-in-the-blank", question: "The moon phase that comes right after a new moon, when a small sliver on the right side is lit (as seen from the Northern Hemisphere), is called a waxing ________.", answer: "Crescent" },
      { type: "short-answer", question: "Put these stages of a Sun-like star's life in order: white dwarf, main sequence, red giant, nebula.", answer: "Nebula → main sequence → red giant → white dwarf" },
    ],
    gradeGuidance:
      "Grades 8–9: the solar system, moon phases, seasons, and eclipses. Grades 10–12: stellar life cycles, the electromagnetic spectrum, and scale of the universe. Name a specific model, such as 'moon phases and tides', for diagram-heavy practice.",
    faq: [
      { q: "Can worksheets include diagram tasks?", a: "Yes. Ask for 'label the diagram' style questions on topics like eclipses or the seasons; students sketch or label in the space provided." },
      { q: "Can it cover moon phases specifically?", a: "Yes. Ask for 'moon phases sequencing and causes' to get ordering, naming and explanation questions." },
      { q: "Does it include scale and distance calculations?", a: "Yes. Name the skill, for example 'astronomical units and light-year conversions', and the answer key shows each step." },
      { q: "Is it suitable for an Earth and space science unit?", a: "Yes. Set the grade level to match your class and name the unit topics you're covering." },
    ],
    relatedSlugs: ["physics", "earth-science", "chemistry"],
  },
  {
    slug: "creative-writing",
    name: "Creative Writing",
    gradeRange: "Grades 6–12",
    intro:
      "Creative writing worksheets give students prompts, structure and targeted craft practice — so a blank page becomes a series of manageable steps. Short exercises on dialogue, sensory detail or story structure build the skills students then bring to longer pieces.",
    topics: ["Show, don't tell writing techniques", "Developing character voice", "Structuring narrative arcs", "Dialogue punctuation and pacing", "Sensory details and imagery", "Poetic devices (meter, rhyme, stanza)"],
    guide:
      "The hardest part of creative writing for most students is starting, and worksheets solve that by breaking a story into smaller, focused tasks. Instead of \"write a short story,\" a strong worksheet might ask students to describe a setting using three senses, then write four lines of dialogue that reveal a conflict, then plan a beginning, middle and end on a story map. Each task practices one craft skill, and together they build toward a full piece. Craft-focused exercises are where worksheets add the most value: rewriting a flat sentence with stronger verbs, turning \"telling\" into \"showing\" (\"she was angry\" becomes a description of her actions), or experimenting with point of view by retelling a scene from another character's perspective. Poetry exercises also work well on paper, such as writing an image-based haiku or finding and replacing clichés. Structured planning tools — character profiles, plot mountains, conflict charts — help students who struggle to organize their ideas. Students often over-explain emotions instead of showing them, so show-don't-tell exercises are worth repeating. QuizKraft's creative writing worksheets combine prompts, craft exercises and planning organizers, with an answer key that offers model responses for teachers to share as examples.",
    exampleQuestions: [
      { type: "short-answer", question: "Rewrite this sentence to show the emotion instead of telling it: 'Maya was nervous before her speech.'", answer: "Example: Maya's hands shook as she smoothed her notes for the third time, and she couldn't stop tapping her foot." },
      { type: "short-answer", question: "Describe a busy school cafeteria using at least three different senses.", answer: "Answers vary. Strong responses include specific sounds, smells and sights (and possibly touch or taste) rather than general words like 'loud' or 'nice'." },
      { type: "fill-in-the-blank", question: "The struggle between opposing forces that drives a story's plot is called the ________.", answer: "Conflict" },
    ],
    gradeGuidance:
      "Grades 6–8: story structure, sensory detail, and dialogue basics. Grades 9–10: point of view, voice, and show-don't-tell revision. Grades 11–12: style, poetic forms, and workshop-style revision. Name the genre or craft skill, such as 'writing suspense', for focused exercises.",
    faq: [
      { q: "Can I make a worksheet of story prompts?", a: "Yes. Ask for prompts in a genre, such as 'mystery story starters for Grade 7', and set the question type to short answer." },
      { q: "Can it focus on one craft skill like dialogue?", a: "Yes. Name the skill, for example 'writing realistic dialogue with correct punctuation', for targeted exercises." },
      { q: "Does it include planning organizers?", a: "Yes. Ask for 'character profile and plot planning' to get structured prompts students can fill in before drafting." },
      { q: "Can I use it for poetry writing?", a: "Yes. Name the form, such as haiku, free verse or sonnet, for form-specific exercises and examples." },
    ],
    relatedSlugs: ["literature", "grammar", "vocabulary"],
  },
  {
    slug: "statistics",
    name: "Statistics",
    gradeRange: "Grades 9–12",
    intro:
      "Statistics worksheets give students the repeated calculation and interpretation practice the subject requires — finding measures of center and spread, reading graphs, and drawing conclusions from data. Each problem should end with an interpretation, not just a number.",
    topics: ["Measures of central tendency (mean, median, mode)", "Probability rules and Venn diagrams", "Normal distribution and z-scores", "Sampling methods and bias", "Hypothesis testing and p-values", "Correlation vs. causation"],
    guide:
      "Statistics students can often compute a mean or a standard deviation correctly and still not know what it tells them, so the best statistics worksheets pair every calculation with an interpretation. A problem that asks for the mean of a data set should also ask what it means in context, and whether the median would be a better measure if there's an outlier. That habit — calculate, then interpret in context — is the core skill of the course. Good worksheets mix several kinds of practice. Descriptive statistics come first: mean, median, mode, range and interquartile range, using small data sets students can handle by hand. Graph reading comes next: box plots, histograms and scatterplots, with questions about shape, center, spread and unusual values. Probability problems, such as two-way tables and simple compound events, give clean practice with checkable answers. For older students, sampling and study design questions ask students to spot bias or identify an experiment versus an observational study. Students frequently confuse correlation with causation, so scenario questions that test that distinction are worth including. QuizKraft's statistics worksheets use realistic data sets and include an answer key with full working and a model interpretation for each problem.",
    exampleQuestions: [
      { type: "short-answer", question: "Find the mean and median of this data set: 3, 5, 5, 6, 21. Which better describes a typical value, and why?", answer: "Mean = 40 ÷ 5 = 8; median = 5. The median is better because the outlier 21 pulls the mean up." },
      { type: "short-answer", question: "A study finds that students who eat breakfast have higher test scores. Does this prove breakfast causes higher scores? Explain.", answer: "No. It is an observational association; other factors (such as sleep or family routines) could explain both. Only a randomized experiment could support a causal claim." },
      { type: "fill-in-the-blank", question: "The range of the middle 50% of a data set, found by subtracting Q1 from Q3, is called the ________.", answer: "Interquartile range (IQR)" },
    ],
    gradeGuidance:
      "Grades 9–10: measures of center and spread, data displays, and basic probability. Grades 11–12 / AP Statistics: sampling and study design, normal distributions, and inference basics. Name the skill, such as 'box plots and IQR', for focused practice.",
    faq: [
      { q: "Do the worksheets include data sets?", a: "Yes. Problems include small data sets students can work with by hand, sized to your grade level." },
      { q: "Can it focus on interpreting graphs?", a: "Yes. Ask for 'interpreting box plots and histograms' for questions about shape, center, spread and outliers." },
      { q: "Does it support AP Statistics practice?", a: "Yes. Name the unit, such as 'sampling methods and bias', and set difficulty to Hard for free-response-style reasoning." },
      { q: "Does the answer key show working?", a: "Yes. Calculation answers include the steps, and interpretation questions include a model answer in context." },
    ],
    relatedSlugs: ["algebra", "math", "physics"],
  },
  {
    slug: "sociology",
    name: "Sociology",
    gradeRange: "Grades 10–12",
    intro:
      "Sociology worksheets help students practice applying sociological concepts to real social situations — norms, socialization, institutions and inequality. Scenario analysis and short responses on paper build the 'sociological imagination' that definitions alone can't.",
    topics: ["Social institutions (family, education, religion)", "Culture and norms", "Socialization and identity", "Social stratification and inequality", "Deviance and social control", "Sociological research methods"],
    guide:
      "Sociology asks students to see personal experiences as part of larger social patterns, and worksheets are where that perspective gets practiced. A worksheet that only asks students to define \"norm\" or \"socialization\" stays at the vocabulary level. Stronger sociology worksheets present a short scenario and ask students to analyze it with a concept: a new student adjusting to a school's unwritten rules (norms and socialization), a family's changing roles over three generations (institutions and social change), or unequal access to a resource (stratification). Theory application is a second useful strand — asking how a functionalist, a conflict theorist and a symbolic interactionist would each explain the same situation, such as education or sports. Research-methods questions work well on paper too: identifying whether a study is a survey, an experiment or participant observation, and naming one strength and limitation of each. Data interpretation, using a simple table of census-style figures, helps students connect concepts to evidence. Students often apply concepts too personally or anecdotally, so worksheets that ask them to connect an example to a broader pattern are especially valuable. QuizKraft's sociology worksheets combine scenario, theory and methods questions, with an answer key that models strong analytical responses.",
    exampleQuestions: [
      { type: "short-answer", question: "A new student notices that everyone at lunch sits in the same groups every day, though no rule says they must. Which sociological concept does this illustrate? Explain.", answer: "Informal norms (unwritten social expectations) — students follow them through socialization, even without formal rules." },
      { type: "short-answer", question: "How would a conflict theorist explain differences in school funding between neighborhoods?", answer: "A conflict theorist would see it as a result of inequality in power and resources, where wealthier groups secure better resources and reproduce their advantage." },
      { type: "fill-in-the-blank", question: "The process by which people learn the norms, values and behaviors of their society is called ________.", answer: "Socialization" },
    ],
    gradeGuidance:
      "Grades 10–11: culture, norms, socialization, and groups. Grade 12 / college intro: stratification, institutions, social change, and research methods. Name a concept or theory, such as 'functionalism vs. conflict theory', for focused practice.",
    faq: [
      { q: "Can worksheets use real-world scenarios?", a: "Yes. Ask for 'scenario analysis' on a concept like deviance or socialization, and students will apply the concept to short cases." },
      { q: "Can it compare sociological theories?", a: "Yes. Ask for 'compare functionalist, conflict and symbolic interactionist views of education' for theory-application practice." },
      { q: "Does it cover research methods?", a: "Yes. Name the methods topic, such as 'surveys vs. participant observation', for questions on strengths and limitations." },
      { q: "Is it suitable for an intro college course?", a: "Yes. Set the grade level to College and difficulty to Hard." },
    ],
    relatedSlugs: ["us-history", "world-history", "civics"],
  },
  {
    slug: "pre-algebra",
    name: "Pre-Algebra",
    gradeRange: "Grades 6–8",
    intro:
      "Pre-algebra worksheets build the fluency students need before algebra — integers, fractions, order of operations, ratios and one-step equations. The most effective ones give plenty of scaffolded practice, moving from worked examples to independent problems on the same page.",
    topics: ["Integers & absolute value", "Order of operations (PEMDAS)", "Solving one-step equations", "Ratios, rates & proportions", "Coordinate plane basics", "Simplifying algebraic expressions"],
    guide:
      "Pre-algebra is a fluency year, and worksheets are the main tool for building it. The skills — integer operations, fractions and decimals, order of operations, ratios, and simple equations — are each straightforward on their own, but students need enough repetition that they stop making small errors before algebra layers new ideas on top. The best pre-algebra worksheets are carefully sequenced. They open with one or two worked examples, follow with several guided problems of the same type, and end with independent problems and one or two word problems. Mixing problem types too early overwhelms students who are still building confidence; keeping one skill per section, then a short mixed review at the end, works better. Integer rules cause the most persistent errors, especially subtracting negatives, so they deserve focused practice with a quick reference box at the top of the page. Order of operations problems should include cases where left-to-right matters, such as 12 ÷ 3 × 2. Students often skip writing steps, so worksheets that require showing work make it much easier to find where an answer went wrong. QuizKraft's pre-algebra worksheets follow this scaffolded structure, with an answer key that shows each step, which makes them practical for homework, intervention and review.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Evaluate: 8 + 12 ÷ 4 × 2 = ______", answer: "14 — division and multiplication left to right: 12 ÷ 4 = 3, 3 × 2 = 6; then 8 + 6 = 14" },
      { type: "fill-in-the-blank", question: "−7 − (−10) = ______", answer: "3 — subtracting a negative is the same as adding: −7 + 10 = 3" },
      { type: "short-answer", question: "Solve and check: x + 9 = 4", answer: "x = −5; check: −5 + 9 = 4 ✓" },
    ],
    gradeGuidance:
      "Grade 6: ratios, fractions and decimals, and expressions. Grade 7: integers, proportions, and one- and two-step equations. Grade 8: exponents, square roots, and linear relationships. Name one skill, such as 'adding and subtracting integers', for focused fluency practice.",
    faq: [
      { q: "Can I make a worksheet focused on one skill?", a: "Yes. Name it precisely, for example 'order of operations with exponents — 15 problems', for targeted practice." },
      { q: "Can worksheets include a mixed review section?", a: "Yes. Ask for 'mixed review of integers, fractions and one-step equations' for a cumulative practice page." },
      { q: "Can it make intervention worksheets?", a: "Yes. Set difficulty to Easy and narrow the topic, such as 'adding integers with a number line, small numbers only'." },
      { q: "Does the answer key show steps?", a: "Yes. Every answer includes the steps, so students can check where they went wrong." },
    ],
    relatedSlugs: ["algebra", "math", "geometry"],
  },
  {
    slug: "ancient-history",
    name: "Ancient History",
    gradeRange: "Grades 6–10",
    intro:
      "Ancient history worksheets help students organize civilizations, timelines and primary sources into something they can work with — comparing societies, sequencing events, and reading evidence from the past. Structured practice turns a long list of names and dates into connected understanding.",
    topics: ["Mesopotamia & early empires", "Ancient Egyptian civilization & pyramids", "Classical Greece & democracy", "The Roman Empire & Republic", "Early civilizations of Mesoamerica", "Ancient silk road & trade networks"],
    guide:
      "Ancient history units cover many civilizations quickly, and students often end up with a blur of pharaohs, emperors and city-states. Worksheets are the tool that sorts that blur into structure. Comparison charts are especially effective: a table comparing Egypt, Mesopotamia, Greece and Rome across government, religion, achievements and geography lets students see patterns and differences side by side. Timeline tasks build chronology, which ancient history makes tricky because of BCE dating — students need practice understanding that 500 BCE comes before 200 BCE. Primary and secondary sources work well on paper: a short excerpt from Hammurabi's Code or a description of Athenian democracy, followed by questions about what it reveals and what it leaves out. Cause-and-effect questions connect geography to history, such as why the Nile's flooding made Egyptian agriculture possible. Map tasks show how empires expanded and why trade routes mattered. Students commonly mix up the features of Athenian democracy and the Roman Republic, so a direct comparison is worth including. QuizKraft's ancient history worksheets combine comparison, timeline, source and map-based questions, with an answer key that explains the historical reasoning; pair map sections with a printed map.",
    exampleQuestions: [
      { type: "short-answer", question: "Put these in chronological order: the founding of the Roman Republic (509 BCE), the building of the Great Pyramid of Giza (c. 2560 BCE), the death of Alexander the Great (323 BCE).", answer: "Great Pyramid (c. 2560 BCE) → Roman Republic founded (509 BCE) → death of Alexander the Great (323 BCE). With BCE dates, larger numbers are earlier." },
      { type: "short-answer", question: "Explain how the yearly flooding of the Nile helped Egyptian civilization develop.", answer: "The floods left fertile silt on the riverbanks, allowing reliable farming and food surpluses, which supported a large population, specialized jobs and a central government." },
      { type: "fill-in-the-blank", question: "In Athenian democracy, eligible ________ voted directly on laws in the Assembly, while the Roman Republic relied on elected representatives such as senators and consuls.", answer: "Citizens (adult male citizens)" },
    ],
    gradeGuidance:
      "Grade 6: early humans, Mesopotamia, and Egypt. Grade 7: Greece, Rome, India and China. Grades 8–10: comparative civilizations, primary sources, and legacy of the ancient world. Name the civilization and theme, such as 'Roman Republic government', for focused practice.",
    faq: [
      { q: "Can I make a comparison chart worksheet?", a: "Yes. Ask for 'compare Egypt, Mesopotamia and the Indus Valley — government, religion, achievements' to get structured comparison prompts." },
      { q: "Can worksheets include primary sources?", a: "Yes. Name a source, such as 'Hammurabi's Code excerpt', and students will get source-reading questions. Verify excerpts against your textbook if exact wording matters." },
      { q: "Does it help with BCE/CE timelines?", a: "Yes. Ask for 'BCE and CE timeline practice' to give students ordering and date-calculation questions." },
      { q: "Can it cover civilizations outside the Mediterranean?", a: "Yes. Name the civilization, for example 'Han Dynasty China' or 'ancient Maya', for region-specific worksheets." },
    ],
    relatedSlugs: ["world-history", "us-history", "literature"],
  },
  {
    slug: "calculus",
    name: "Calculus",
    gradeRange: "Grades 11–12 / AP",
    intro:
      "Calculus worksheets give students the volume of practice that limits, derivatives and integrals require — with problems sequenced from basic rule application to multi-step applications. Showing full work on paper is where most calculus learning, and most error-catching, happens.",
    topics: ["Limits & continuity", "Differentiation & derivatives", "Applications of derivatives (optimization, related rates)", "Integration & antiderivatives", "Fundamental Theorem of Calculus", "AP Calculus AB/BC review"],
    guide:
      "Calculus is learned through practice volume, and worksheets supply that volume in a structured way. The most effective calculus worksheets are sequenced: a few direct rule-application problems first (power rule, product rule, basic antiderivatives), then problems that combine rules, then applied problems such as related rates, optimization or area under a curve. Jumping straight to applications before the rules are automatic leads to students getting lost in the algebra rather than the calculus. The chain rule is the most common source of errors — students forget to multiply by the derivative of the inner function — so it deserves dedicated practice with a range of inner functions. In integration, the constant of integration and correct bounds in definite integrals are frequent small errors that a worked answer key helps students catch. Worksheets should also include some conceptual questions, like interpreting the derivative as a rate of change in context, because AP-style questions test meaning as well as computation. Graphical analysis tasks, such as identifying where a function is increasing from its derivative's sign, practice a skill that pure computation drills miss. QuizKraft's calculus worksheets follow this progression and include an answer key with full step-by-step solutions.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Differentiate: d/dx [(3x² + 1)⁴] = ______", answer: "24x(3x² + 1)³ — chain rule: 4(3x² + 1)³ × 6x" },
      { type: "fill-in-the-blank", question: "Evaluate: ∫₀² 3x² dx = ______", answer: "8 — antiderivative x³, evaluated 2³ − 0³ = 8" },
      { type: "short-answer", question: "The position of a particle is s(t) = t³ − 6t² + 9t. Find when the particle is at rest.", answer: "v(t) = 3t² − 12t + 9 = 3(t − 1)(t − 3) = 0, so t = 1 and t = 3." },
    ],
    gradeGuidance:
      "Grade 11 / AP Calculus AB: limits, derivatives, basic integrals, and applications. Grade 12 / AP Calculus BC: series, parametric and polar functions, and advanced integration. Name the rule or application, such as 'related rates — ladder and cone problems', for focused practice.",
    faq: [
      { q: "Does the answer key include full solutions?", a: "Yes. Each problem includes step-by-step working, so students can find exactly where an error happened." },
      { q: "Can I make a worksheet on one rule like the chain rule?", a: "Yes. Name it, for example 'chain rule practice — 12 problems with trig and exponential inner functions'." },
      { q: "Can it generate AP-style free-response practice?", a: "Yes. Set difficulty to Hard and name the topic, such as 'AP Calculus AB — accumulation functions and rate problems'." },
      { q: "Can worksheets include graphical analysis?", a: "Yes. Ask for 'derivative graph analysis — increasing, decreasing and concavity' for interpretation questions." },
    ],
    relatedSlugs: ["physics", "algebra", "statistics"],
  },
  {
    slug: "organic-chemistry",
    name: "Organic Chemistry",
    gradeRange: "Grades 11–12 / College",
    intro:
      "Organic chemistry worksheets give students repeated practice with the core skills of the subject — naming compounds, drawing structures, identifying functional groups and predicting reaction products. Working problems by hand is how students learn to see patterns across reactions.",
    topics: ["Nomenclature of hydrocarbons (alkanes, alkenes)", "Functional groups (alcohols, ketones, carboxylic acids)", "Isomerism & stereochemistry", "Nucleophilic substitution & elimination", "Spectroscopy basics (IR, NMR)", "Organic synthesis pathways"],
    guide:
      "Organic chemistry is a pattern-recognition subject, and worksheets are where students build those patterns through repetition. The foundation is nomenclature and structure: naming compounds from structures and drawing structures from names, using IUPAC rules for chain length, numbering and substituents. Students who aren't fluent here struggle with everything that follows, so early worksheets should give plenty of practice with a mix of alkanes, alkenes, alcohols and other common functional groups. Functional group identification is the next layer — given a molecule, circle and name every functional group present. Reaction worksheets then ask students to predict products or identify reagents, and the most effective ones group reactions by type (substitution, elimination, addition) so students see how conditions change the outcome. Mechanism practice, using curved arrows to show electron movement, is where many students struggle most, because it requires understanding nucleophiles and electrophiles rather than memorizing products. Isomer questions also work well on paper, such as drawing all structural isomers of a small molecule. Students frequently miscount carbons or number the chain from the wrong end, so naming practice should include a reminder of numbering rules. QuizKraft's organic chemistry worksheets cover nomenclature, functional groups, reactions and isomers, with an answer key that explains each name and product; students draw structures in the space provided.",
    exampleQuestions: [
      { type: "fill-in-the-blank", question: "Give the IUPAC name for CH₃CH₂CH₂OH.", answer: "Propan-1-ol (1-propanol)" },
      { type: "short-answer", question: "Name the functional groups present in a molecule that contains a –COOH group and an –NH₂ group.", answer: "Carboxylic acid (–COOH) and amine (–NH₂), as found in amino acids." },
      { type: "short-answer", question: "Predict the major product when ethene reacts with HBr, and name the reaction type.", answer: "Bromoethane (CH₃CH₂Br); electrophilic addition." },
    ],
    gradeGuidance:
      "Grades 11–12: hydrocarbons, functional groups, and basic naming. College organic I: nomenclature, stereochemistry, substitution and elimination. College organic II: carbonyl chemistry, aromatic reactions, and synthesis. Name the reaction type or functional group for focused practice.",
    faq: [
      { q: "Can students draw structures on the worksheet?", a: "Yes. Structure questions leave space for drawing; the answer key describes the expected structure and name." },
      { q: "Can I make a nomenclature practice worksheet?", a: "Yes. Ask for 'IUPAC naming — alkanes, alkenes and alcohols, 15 problems' for focused naming practice." },
      { q: "Does it cover reaction mechanisms?", a: "Yes. Name the mechanism, such as 'SN1 vs SN2 — predict the mechanism and product', for mechanism-focused practice." },
      { q: "Is it suitable for college organic chemistry?", a: "Yes. Set the grade level to College and difficulty to Hard." },
    ],
    relatedSlugs: ["chemistry", "biology", "physics"],
  },
  {
    slug: "physical-science",
    name: "Physical Science",
    gradeRange: "Grades 8–10",
    intro:
      "Physical science worksheets give students practice with the foundations of physics and chemistry — motion, forces, energy, matter and simple calculations. Pairing formula problems with real-world explanations helps students connect equations to what actually happens around them.",
    topics: ["Properties of matter & phase changes", "Periodic table & chemical bonding", "Newton's laws of motion", "Work, energy & simple machines", "Electricity & magnetism basics", "Waves, light & sound properties"],
    guide:
      "Physical science introduces students to quantitative science, and worksheets are where they practice turning a word problem into a calculation. The most effective physical science worksheets teach a consistent problem-solving routine: list the known values with units, choose the right formula, substitute, and solve with units. Speed, density, force (F = ma), and work problems are ideal for this, because the formulas are simple and the routine becomes automatic with repetition. Units deserve particular attention — students often drop them or mix grams with kilograms — so worksheets that require units in every answer build good habits early. The chemistry side of the course also benefits from structured practice: reading the periodic table, counting atoms in a formula, classifying physical versus chemical changes, and balancing simple equations. Conceptual questions, such as explaining why a heavy and a light object fall at the same rate without air resistance, check that students understand the ideas behind the numbers. Students frequently confuse mass and weight, and speed and velocity, so side-by-side comparison questions are worth including. QuizKraft's physical science worksheets mix calculation, classification and explanation questions, with an answer key that shows each step and unit, which makes them good for homework, lab follow-ups and test review.",
    exampleQuestions: [
      { type: "short-answer", question: "A cyclist travels 30 km in 1.5 hours. What is the average speed? Include units.", answer: "20 km/h — speed = distance ÷ time = 30 km ÷ 1.5 h" },
      { type: "fill-in-the-blank", question: "A block has a mass of 60 g and a volume of 20 cm³. Its density is ______.", answer: "3 g/cm³ — density = mass ÷ volume = 60 ÷ 20" },
      { type: "short-answer", question: "Classify each as a physical or chemical change: ice melting, iron rusting, paper being cut, wood burning.", answer: "Ice melting — physical; iron rusting — chemical; paper being cut — physical; wood burning — chemical." },
    ],
    gradeGuidance:
      "Grade 8: matter, the periodic table, and motion basics. Grade 9: forces, Newton's laws, energy, and simple machines. Grade 10: waves, electricity, and chemical reactions. Name the formula or concept, such as 'density calculations', for focused practice.",
    faq: [
      { q: "Does the answer key show units and steps?", a: "Yes. Calculation answers include the formula, substitution and units, so students can follow the method." },
      { q: "Can I make a worksheet on one formula like F = ma?", a: "Yes. Name it, for example 'Newton's second law — 10 force, mass and acceleration problems'." },
      { q: "Does it cover the chemistry side of physical science?", a: "Yes. Topics like the periodic table, atoms, and physical vs. chemical changes all work well." },
      { q: "Can I use it as a lab follow-up?", a: "Yes. Describe the lab, such as 'measuring density of irregular objects', and the worksheet will ask students to analyze the results." },
    ],
    relatedSlugs: ["earth-science", "physics", "chemistry"],
  },
];

export function getQuizSubject(slug: string): SubjectData | undefined {
  return quizSubjects.find((s) => s.slug === slug);
}

export function getWorksheetSubject(slug: string): SubjectData | undefined {
  return worksheetSubjects.find((s) => s.slug === slug);
}
