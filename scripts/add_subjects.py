import os

NEW_SUBJECTS = [
    {
        "slug": "literature",
        "name": "Literature",
        "gradeRange": "Grades 6–12",
        "intro": "Literature worksheets and quizzes analyze text structure, themes, characters, and figurative language. Good questions require students to cite evidence and make connections, rather than just recall plot points.",
        "topics": ["Theme and main ideas", "Character analysis and development", "Plot structure and conflict", "Setting and atmosphere", "Figurative language and symbolism", "Point of view and narrator bias"],
        "guide": "Literature assessment fails when it tests trivia like character names or minor events. The real focus should be on deep reading, analytical reasoning, and evidence extraction. Middle school focuses on plot elements and basic figurative devices. High school shifts toward complex themes, narrator reliability, and historical context. Strong questions use multiple choice for structural elements, short answer for explaining themes or analyzing quotes, and true/false for clearing up common reading misconceptions.",
        "exampleQuestions": [
            { "type": "multiple-choice", "question": "Which type of conflict is represented by a character struggling against societal expectations?", "answer": "Man vs. Society" },
            { "type": "short-answer", "question": "Explain the difference between tone and mood in literary analysis.", "answer": "Tone is the author's attitude toward the subject, while mood is the emotional atmosphere created for the reader." },
            { "type": "true-false", "question": "Symbolism is when an object represents an idea beyond its literal meaning.", "answer": "True" }
        ],
        "gradeGuidance": "Middle school: plot elements, character traits, and basic figurative language. High school: complex themes, narrator reliability, and historical context.",
        "faq": [
            { "q": "Can I generate questions for a specific book?", "q": "Can I generate questions for a specific book?", "a": "Yes. Include the book title and chapter in your prompt, e.g., 'To Kill a Mockingbird Chapter 3, Grade 9.'" },
            { "q": "What's the best question mix for a literature quiz?", "a": "MCQ for terminology and structure; short answer for theme analysis and quotes; true/false for factual and conceptual reading checks." },
            { "q": "Does it cover poetic devices and poetry?", "a": "Yes. Specify the poem or poetic device in your topic, e.g., 'alliteration, metaphor, and stanza structure in Edgar Allan Poe's poetry.'" }
        ],
        "relatedSlugs": ["grammar", "vocabulary", "reading-comprehension"]
    },
    {
        "slug": "environmental-science",
        "name": "Environmental Science",
        "gradeRange": "Grades 9–12",
        "intro": "Environmental Science assessments connect human activity with ecosystems, climate change, and sustainability issues. Strong questions analyze human impacts and solutions, not just recall terminology.",
        "topics": ["Ecosystem structure and energy flow", "Biodiversity and conservation", "Renewable and non-renewable energy", "Water and air pollution", "Climate change and greenhouse effect", "Sustainable resource management"],
        "guide": "Students often confuse ozone depletion with global warming. Calibrating questions to check this distinction ensures they grasp the chemical and environmental differences. Ecology and resource management questions work best when they push students to think about trade-offs, like the economic vs. environmental impacts of clean energy.",
        "exampleQuestions": [
            { "type": "multiple-choice", "question": "Which of the following is a primary greenhouse gas?", "answer": "Carbon dioxide" },
            { "type": "short-answer", "question": "Describe the concept of 'tragedy of the commons' with a real-world example.", "answer": "The overuse and depletion of shared resources (like overfishing in international waters) because individuals act in self-interest rather than group interest." },
            { "type": "true-false", "question": "Bioaccumulation refers to the increasing concentration of a toxin in organisms at higher trophic levels.", "answer": "True" }
        ],
        "gradeGuidance": "High school: basic ecology and pollution. AP Environmental: biogeochemical cycles, population dynamics, and environmental legislation.",
        "faq": [
            { "q": "Is this suitable for AP Environmental Science review?", "a": "Yes. Set the grade level to AP / Grade 12 and include specific topics like 'APES Unit 5 — agriculture and land use.'" },
            { "q": "Can it generate questions about specific laws like the Clean Air Act?", "a": "Yes. Include the specific legislation in your prompt, e.g., 'Clean Water Act and Safe Drinking Water Act comparison.'" }
        ],
        "relatedSlugs": ["biology", "chemistry", "earth-science"]
    },
    {
        "slug": "economics",
        "name": "Economics",
        "gradeRange": "Grades 10–12",
        "intro": "Economics assessments test micro and macroeconomic principles, market systems, supply and demand, and financial literacy. Revealing questions require applying principles to real-world scenarios rather than matching definitions.",
        "topics": ["Supply and demand", "Market structures (monopoly, competition)", "Inflation and unemployment", "Monetary and fiscal policy", "Global trade and tariffs", "Personal finance and budgeting"],
        "guide": "Supply and demand shifts are a common source of confusion. Worksheets should test the difference between a change in demand versus a change in quantity demanded. Macroeconomic policies also benefit from scenario questions, like predicting how interest rate changes affect investment and inflation.",
        "exampleQuestions": [
            { "type": "multiple-choice", "question": "If supply decreases and demand remains constant, what happens to equilibrium price and quantity?", "answer": "Price increases, quantity decreases" },
            { "type": "short-answer", "question": "Explain the difference between monetary policy and fiscal policy.", "answer": "Monetary policy is controlled by the central bank (adjusting interest rates, money supply), while fiscal policy is controlled by the government (adjusting taxes, spending)." },
            { "type": "true-false", "question": "Opportunity cost represents the value of the next best alternative given up when making a choice.", "answer": "True" }
        ],
        "gradeGuidance": "Grades 10–12: basic economics, supply/demand, personal finance. AP Micro/Macro: cost curves, market failure, and aggregate demand models.",
        "faq": [
            { "q": "Does the economics generator support graph analysis?", "a": "Short answer questions can ask students to describe shifts in cost curves or supply and demand diagrams. Pair worksheets with graph paper for best results." },
            { "q": "Can it quiz personal finance topics?", "a": "Yes. Specify topics like 'budgeting, interest rates, credit cards, and investments' in your prompt." }
        ],
        "relatedSlugs": ["algebra", "civics", "us-history"]
    },
    {
        "slug": "civics",
        "name": "Civics",
        "gradeRange": "Grades 8–12",
        "intro": "Civics assessments test principles of government, the US Constitution, the three branches of government, civil rights, and citizen participation. Effective questions prompt students to explain systems and rights.",
        "topics": ["Principles of democracy", "The US Constitution and Bill of Rights", "Three branches of government", "Federalism and separation of powers", "Elections and political parties", "Civil rights and liberties"],
        "guide": "Checks and balances are often memorized as a list. Strong questions challenge students to analyze how one branch can block or check another in specific scenarios. Civil rights historical context also benefits from questions matching Supreme Court rulings to societal developments.",
        "exampleQuestions": [
            { "type": "multiple-choice", "question": "Which branch of government has the power to declare laws unconstitutional?", "answer": "Judicial branch" },
            { "type": "short-answer", "question": "Explain the purpose of the Bill of Rights in the US Constitution.", "answer": "To protect individual liberties and limit government power by explicitly stating rights that cannot be infringed upon." },
            { "type": "true-false", "question": "Federalism is a system where power is divided between national and state governments.", "answer": "True" }
        ],
        "gradeGuidance": "Middle school: basic branches, local government, citizenship. High school: Constitution, federalism, Supreme Court cases.",
        "faq": [
            { "q": "Can I quiz students on specific Supreme Court cases?", "a": "Yes. Include the case name in your topic, e.g., 'Marbury v. Madison or Brown v. Board of Education.'" },
            { "q": "Does it support citizenship exam preparation?", "a": "Yes. Set the topic to 'US citizenship test study questions' to cover core government structure and history." }
        ],
        "relatedSlugs": ["us-history", "world-history", "literature"]
    },
    {
        "slug": "art-history",
        "name": "Art History",
        "gradeRange": "Grades 9–12",
        "intro": "Art History worksheets and quizzes trace artistic movements, analysis of visual media, and historical context. Successful questions connect art to historical developments, rather than just identifying painters.",
        "topics": ["Ancient and classical art", "Renaissance and Baroque art", "Impressionism and Post-Impressionism", "Modern art movements (Cubism, Surrealism)", "Non-Western art traditions", "Visual analysis and terminology"],
        "guide": "Students often focus only on visual attributes. The best questions ask them to connect art styles to historical events, such as how the Black Death influenced late medieval art, or how industrialization drove Modernism. MCQ works well for stylistic terms, and short answer is ideal for visual analysis.",
        "exampleQuestions": [
            { "type": "multiple-choice", "question": "Which artistic movement is characterized by a focus on light, visible brushstrokes, and ordinary subject matter?", "answer": "Impressionism" },
            { "type": "short-answer", "question": "Explain how linear perspective changed painting during the Italian Renaissance.", "answer": "It introduced a mathematical system for creating the illusion of 3D depth on a flat 2D surface, making scenes appear realistic and spacious." },
            { "type": "true-false", "question": "Surrealism was heavily influenced by Sigmund Freud's theories on the subconscious mind.", "answer": "True" }
        ],
        "gradeGuidance": "High school survey: major movements, visual vocabulary. AP Art History: contextual analysis, formal attributes of the 250 required works.",
        "faq": [
            { "q": "Is this suitable for AP Art History preparation?", "a": "Yes. Use Grade 12 / AP level and specify visual analysis topics, e.g., 'AP Art History — comparison of Classical Greek and Roman sculpture.'" },
            { "q": "How can students analyze visual attributes without images on screen?", "a": "Questions can describe formal elements (like composition, medium, and color use) or refer to famous works (like Michelangelo's David) that students are studying in class." }
        ],
        "relatedSlugs": ["world-history", "us-history", "literature"]
    },
    {
        "slug": "computer-science",
        "name": "Computer Science",
        "gradeRange": "Grades 8–12",
        "intro": "Computer Science worksheets and quizzes test programming logic, algorithm design, data structures, and computer networks. Coding questions check logical progression and syntax rules.",
        "topics": ["Basic programming logic (loops, conditionals)", "Variables and data types", "Algorithms and sorting", "Object-oriented programming", "Web development basics (HTML/CSS/JS)", "Cybersecurity and digital ethics"],
        "guide": "Tracing loops is a core skill. Quizzes should ask students to predict the final output of a code block to verify they can run algorithms mentally. For AP level, object-oriented concepts like inheritance and polymorphism are primary focus areas.",
        "exampleQuestions": [
            { "type": "multiple-choice", "question": "Which data structure operates on a First-In, First-Out (FIFO) principle?", "answer": "Queue" },
            { "type": "short-answer", "question": "Describe the difference between a compiler and an interpreter.", "answer": "A compiler translates the entire source code into machine code at once before execution, while an interpreter translates and executes code line by line." },
            { "type": "true-false", "question": "In programming, a syntax error is caught at runtime, while a logical error is caught during compilation.", "answer": "False" }
        ],
        "gradeGuidance": "Middle school: drag-and-drop programming, basic HTML. High school: Python/Java basics. AP CS A: object-oriented design and recursion.",
        "faq": [
            { "q": "What languages does it support for syntax questions?", "a": "Specify the language in your topic: 'Python loops, Java class structure, or Javascript DOM manipulation.'" },
            { "q": "Can it create questions for AP Computer Science Principles?", "a": "Yes. Specify the topic, e.g., 'AP CSP — binary numbers, networks, and routing protocols.'" }
        ],
        "relatedSlugs": ["algebra", "math", "physics"]
    },
    {
        "slug": "french",
        "name": "French",
        "gradeRange": "Grades 6–12",
        "intro": "French assessments cover verb conjugation, reading comprehension, vocabulary, and grammar rules. Practice should require sentence building and contextual reading to measure language acquisition.",
        "topics": ["Present tense conjugation", "Passé composé vs. imparfait", "Vocabulary by theme (family, food, school)", "Adjective agreement and placement", "Direct and indirect object pronouns", "Subjunctive mood"],
        "guide": "The difference between passé composé and imparfait is the biggest hurdle for students. Worksheets should test whether a past action was completed or ongoing. Fill-in-the-blank conjugation and short-answer translations are the most effective formats for testing grammar and production.",
        "exampleQuestions": [
            { "type": "multiple-choice", "question": "Which auxiliary verb is used to conjugate 'aller' in the passé composé?", "answer": "Être" },
            { "type": "short-answer", "question": "Translate to French: 'I would like a croissant, please.'", "answer": "Je voudrais un croissant, s'il vous plaît." },
            { "type": "true-false", "question": "In French, most adjectives are placed after the noun they modify.", "answer": "True" }
        ],
        "gradeGuidance": "French 1: basic vocabulary, present tense. French 2–3: past tenses, pronouns. French 4 / AP: subjunctive, literature, and composition.",
        "faq": [
            { "q": "Can it generate quizzes completely in French?", "a": "Yes. Include 'questions and explanations completely in French' in your prompt for immersion classrooms." },
            { "q": "Does it support accent characters?", "a": "Yes, all standard French letters and accents (é, è, ç, à, etc.) are correctly generated and supported." }
        ],
        "relatedSlugs": ["spanish", "grammar", "vocabulary"]
    },
    {
        "slug": "geography",
        "name": "Geography",
        "gradeRange": "Grades 6–12",
        "intro": "Geography assessments cover map analysis, physical landforms, human geography, and global systems. Good questions analyze how human activities interact with physical environments.",
        "topics": ["Map reading and map projections", "Physical systems (rivers, mountains, climate zones)", "Human migration and population density", "Cultural geography and globalization", "Natural hazards and disasters", "Geopolitics and border disputes"],
        "guide": "Students often confuse map projections. The best questions ask them to analyze the distortion of Mercator vs. Peters projections. Physical geography matches well with climate cycles, while human geography shifts toward urban models and resource patterns.",
        "exampleQuestions": [
            { "type": "multiple-choice", "question": "Which line of latitude splits the Earth into Northern and Southern Hemispheres?", "answer": "The Equator" },
            { "type": "short-answer", "question": "Explain the difference between weather and climate from a geographic perspective.", "answer": "Weather refers to short-term atmospheric conditions, while climate is the long-term average weather pattern of a region over 30+ years." },
            { "type": "true-false", "question": "The Ring of Fire is a major area in the basin of the Pacific Ocean where many earthquakes and volcanic eruptions occur.", "answer": "True" }
        ],
        "gradeGuidance": "Middle school: continents, countries, capital cities. High school: human geography, resource distribution, environmental impact.",
        "faq": [
            { "q": "Does this cover physical and human geography?", "a": "Yes. You can specify either: e.g., 'physical geography — tectonic landforms' or 'human geography — population migration patterns.'" },
            { "q": "Is it aligned with AP Human Geography standards?", "a": "Yes. Set grade to AP / Grade 12 and prompt for topics like 'Demographic Transition Model or von Thünen model.'" }
        ],
        "relatedSlugs": ["earth-science", "world-history", "us-history"]
    },
    {
        "slug": "astronomy",
        "name": "Astronomy",
        "gradeRange": "Grades 8–12",
        "intro": "Astronomy assessments explore celestial bodies, stellar lifecycle, cosmology, and observational mechanics. Worksheets test the physics of the universe and gravitational models.",
        "topics": ["Planets and orbital mechanics", "Stellar evolution (main sequence to black holes)", "Galaxies and cosmic structures", "The Big Bang theory and cosmology", "Observational astronomy and telescopes", "Space exploration history"],
        "guide": "Students often confuse mass with weight. Worksheets should ask students to calculate the difference in weight for a constant mass on other planets. Stellar lifecycles are also key — checking if students understand what triggers red giants vs. supernovas.",
        "exampleQuestions": [
            { "type": "multiple-choice", "question": "What is the primary source of energy for stars during their main sequence phase?", "answer": "Nuclear fusion" },
            { "type": "short-answer", "question": "Describe Kepler's first law of planetary motion.", "answer": "All planets move in elliptical orbits with the Sun at one of the two focal points." },
            { "type": "true-false", "question": "A light-year is a unit of time representing the time it takes light to travel to the nearest star.", "answer": "False" }
        ],
        "gradeGuidance": "Grades 8–9: planets, moon phases, gravity. Grades 10–12: astrophysics, nuclear fusion, stellar evolution, and cosmological theories.",
        "faq": [
            { "q": "Can it generate calculations based on gravity or light?", "a": "Yes. Include math prompts, e.g., 'calculating gravitational force using Newton's law of universal gravitation.'" },
            { "q": "Does it cover moon phases and eclipses?", "a": "Yes. Specify 'phases of the moon and solar vs. lunar eclipses' in your topic prompt." }
        ],
        "relatedSlugs": ["physics", "earth-science", "chemistry"]
    },
    {
        "slug": "creative-writing",
        "name": "Creative Writing",
        "gradeRange": "Grades 6–12",
        "intro": "Creative Writing worksheets and quizzes focus on literary techniques, narrative arcs, stylistic elements, and editing. Practice guides writers to build rich descriptions and dialogue.",
        "topics": ["Show, don't tell writing techniques", "Developing character voice", "Structuring narrative arcs", "Dialogue punctuation and pacing", "Sensory details and imagery", "Poetic devices (meter, rhyme, stanza)"],
        "guide": "Students write flat narratives. Exercises should require taking a telling sentence ('He was sad') and rewriting it using sensory details and actions. Dialogue punctuation rules are also a primary mechanic tested in ELA classes.",
        "exampleQuestions": [
            { "type": "multiple-choice", "question": "Which literary device involves a direct comparison of two unlike things without using 'like' or 'as'?", "answer": "Metaphor" },
            { "type": "short-answer", "question": "Punctuate the following dialogue correctly: 'I don't think we should go in there whispered Sarah.'", "answer": '\"I don\'t think we should go in there,\" whispered Sarah.' },
            { "type": "true-false", "question": "A protagonist must always be a morally good character in a story.", "answer": "False" }
        ],
        "gradeGuidance": "Middle school: story parts, descriptive words. High school: show vs. tell, dialogue, figurative structures, poetry formats.",
        "faq": [
            { "q": "Can it generate creative writing prompts?", "a": "Yes. Specify 'writing prompts' in the question count, or ask for exercises that guide story starting." },
            { "q": "Does it teach poetry forms?", "a": "Yes. Specify 'haiku structure, sonnets, or free verse elements' in the topic." }
        ],
        "relatedSlugs": ["literature", "grammar", "vocabulary"]
    },
    {
        "slug": "statistics",
        "name": "Statistics",
        "gradeRange": "Grades 9–12",
        "intro": "Statistics worksheets and quizzes test data representation, probability rules, distribution models, and hypothesis testing. Good questions prompt reasoning behind data conclusions.",
        "topics": ["Measures of central tendency (mean, median, mode)", "Probability rules and Venn diagrams", "Normal distribution and z-scores", "Sampling methods and bias", "Hypothesis testing and p-values", "Correlation vs. causation"],
        "guide": "Students confuse correlation with causation. Worksheets should present real-world scatter plots and prompt students to critique causative claims. At AP level, z-scores, p-values, and statistical significance are core concepts.",
        "exampleQuestions": [
            { "type": "multiple-choice", "question": "If a distribution is highly skewed to the right, which measure of central tendency is typically largest?", "answer": "The mean" },
            { "type": "short-answer", "question": "Explain the difference between a sample and a population in statistics.", "answer": "A population is the entire group you want to draw conclusions about, while a sample is the specific group you collect data from." },
            { "type": "true-false", "question": "A p-value of 0.03 indicates that there is a 3% probability that the null hypothesis is true.", "answer": "False" }
        ],
        "gradeGuidance": "Grades 9–10: charts, mean/median/mode, simple probability. AP Statistics: hypothesis tests, normal models, sampling distributions, regressions.",
        "faq": [
            { "q": "Is this aligned with AP Statistics?", "a": "Yes. Set grade to Grade 12 / AP and specify: 'AP Statistics — Type I and Type II errors' or 'chi-square goodness of fit test.'" },
            { "q": "Does it cover probability rules?", "a": "Yes. Specify 'addition and multiplication rules of probability, or conditional probability.'" }
        ],
        "relatedSlugs": ["algebra", "math", "physics"]
    },
    {
        "slug": "sociology",
        "name": "Sociology",
        "gradeRange": "Grades 10–12",
        "intro": "Sociology assessments explore social structures, cultural paradigms, inequality, and socialization processes. Revealing questions require analyzing systemic patterns.",
        "topics": ["Social institutions (family, education, religion)", "Culture and norms", "Socialization and identity", "Social stratification and inequality", "Deviance and social control", "Sociological research methods"],
        "guide": "Students often confuse individual bias with systemic structure. Questions should guide them to analyze how institutions shape group behaviors. Functionalist vs. conflict perspectives are ideal frameworks for comparative questions.",
        "exampleQuestions": [
            { "type": "multiple-choice", "question": "Which sociological perspective views society as a system of interrelated parts working together to promote stability?", "answer": "Structural Functionalism" },
            { "type": "short-answer", "question": "Explain the difference between a primary group and a secondary group.", "answer": "Primary groups are small, close-knit, and personal (like family); secondary groups are larger, temporary, and goal-oriented (like coworkers)." },
            { "type": "true-false", "question": "Ethnocentrism is the practice of judging another culture by the standards of one's own culture.", "answer": "True" }
        ],
        "gradeGuidance": "Grades 10–12: basic sociological concepts, socialization, culture, deviance, and social stratification.",
        "faq": [
            { "q": "Does it cover the main sociological theories?", "a": "Yes. Specify 'Functionalism, Conflict Theory, and Symbolic Interactionism' for theoretical comparison questions." },
            { "q": "Can it quiz sociological research methods?", "a": "Yes. Topic prompts like 'quantitative vs. qualitative methods, surveys, and ethics in research' generate focused questions." }
        ],
        "relatedSlugs": ["us-history", "world-history", "civics"]
    }
]

def to_ts(val, indent=0):
    ind = " " * indent
    if isinstance(val, dict):
        parts = []
        for k, v in val.items():
            key_str = k
            if not k.isalnum():
                key_str = f'"{k}"'
            parts.append(f"{ind}  {key_str}: {to_ts(v, indent + 2)}")
        return "{\n" + ",\n".join(parts) + f"\n{ind}}"
    elif isinstance(val, list):
        if len(val) == 0:
            return "[]"
        if all(isinstance(x, (str, int, float, bool)) and len(str(x)) < 30 for x in val) and len(val) < 8:
            return "[" + ", ".join(to_ts(x) for x in val) + "]"
        parts = []
        for x in val:
            item_str = to_ts(x, indent + 2)
            parts.append(f"{ind}  {item_str.lstrip()}")
        return "[\n" + ",\n".join(parts) + f"\n{ind}]"
    elif isinstance(val, str):
        escaped = val.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        return f'"{escaped}"'
    elif isinstance(val, bool):
        return "true" if val else "false"
    elif isinstance(val, (int, float)):
        return str(val)
    return "null"

def main():
    target_path = os.path.join("src", "lib", "subjects.ts")
    with open(target_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Add to quizSubjects
    quiz_anchor = "\n];\n\nexport const worksheetSubjects: SubjectData[] = ["
    if quiz_anchor not in content:
        print("Could not find quizSubjects anchor!")
        return

    serialized_new = ",\n" + ",\n".join(to_ts(s, 2) for s in NEW_SUBJECTS)
    
    parts = content.split(quiz_anchor, 1)
    content = parts[0] + serialized_new + quiz_anchor + parts[1]

    # 2. Add to worksheetSubjects
    worksheet_anchor = "\n];\n\nexport function getQuizSubject"
    if worksheet_anchor not in content:
        print("Could not find worksheetSubjects anchor!")
        return

    parts = content.split(worksheet_anchor, 1)
    content = parts[0] + serialized_new + worksheet_anchor + parts[1]

    with open(target_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Successfully added 12 new subjects to quizSubjects and worksheetSubjects!")

if __name__ == "__main__":
    main()
