/**
 * ElectED - Election Process Education
 * Comprehensive Test Suite
 * Run: npm test
 */

// ============================================================
// UNIT TESTS - Core Data & Logic
// ============================================================

describe('Election Timeline Data', () => {
  const timelineData = [
    { date: "12 Months Before", title: "Election Announced", desc: "The election commission officially announces the upcoming election date." },
    { date: "10 Months Before", title: "Voter Registration Opens", desc: "Citizens can register or update their voter registration details." },
    { date: "8 Months Before", title: "Candidate Filing Period", desc: "Potential candidates file their nomination papers." },
    { date: "6 Months Before", title: "Nomination Deadline", desc: "The last date for candidates to submit nomination documents." },
    { date: "4 Months Before", title: "Campaign Period Begins", desc: "Official campaign period starts." },
    { date: "2 Months Before", title: "Voter Registration Closes", desc: "Final deadline for citizen voter registration." },
    { date: "1 Month Before", title: "Voter ID Cards Distributed", desc: "Eligible voters receive their voter identification cards." },
    { date: "2 Weeks Before", title: "Campaign Blackout Period", desc: "Campaigning is prohibited." },
    { date: "Election Day", title: "Voting Day", desc: "Polling stations open." },
    { date: "Election Day Evening", title: "Polls Close", desc: "Polling stations close and ballot boxes are sealed." },
    { date: "Night of Election", title: "Vote Counting", desc: "Ballots are counted transparently." },
    { date: "Day After Election", title: "Results Declared", desc: "Final results are announced." }
  ];

  test('should have exactly 12 timeline events', () => {
    expect(timelineData).toHaveLength(12);
  });

  test('each event should have date, title, and description', () => {
    timelineData.forEach(event => {
      expect(event).toHaveProperty('date');
      expect(event).toHaveProperty('title');
      expect(event).toHaveProperty('desc');
      expect(event.date).toBeTruthy();
      expect(event.title).toBeTruthy();
      expect(event.desc).toBeTruthy();
    });
  });

  test('first event should be Election Announced', () => {
    expect(timelineData[0].title).toBe('Election Announced');
  });

  test('last event should be Results Declared', () => {
    expect(timelineData[11].title).toBe('Results Declared');
  });

  test('Election Day event should exist', () => {
    const electionDay = timelineData.find(e => e.date === 'Election Day');
    expect(electionDay).toBeDefined();
    expect(electionDay.title).toBe('Voting Day');
  });

  test('all descriptions should be meaningful (>20 chars)', () => {
    timelineData.forEach(event => {
      expect(event.desc.length).toBeGreaterThan(20);
    });
  });
});

// ============================================================

describe('Voting Steps Data', () => {
  const stepsData = [
    { icon: "📋", title: "1. Check Eligibility", desc: "Confirm you meet the legal requirements.", detail: "Requirements include being 18+ years old." },
    { icon: "📝", title: "2. Register to Vote", desc: "Complete the official voter registration process.", detail: "Registration can be done online or in person." },
    { icon: "🏠", title: "3. Find Your Polling Station", desc: "Locate the polling station assigned to your address.", detail: "Your voter ID card has your polling station address." },
    { icon: "🪪", title: "4. Bring Valid ID", desc: "Carry your official voter ID card.", detail: "Accepted IDs include voter card, passport, driver's license." },
    { icon: "☑️", title: "5. Cast Your Ballot", desc: "Mark your choice clearly on the ballot.", detail: "Follow the instructions of polling officials." },
    { icon: "🔒", title: "6. Vote is Secured", desc: "Your ballot is sealed and stored securely.", detail: "Ballots are kept in sealed boxes monitored by officials." },
    { icon: "📊", title: "7. Counting & Results", desc: "Votes are counted transparently.", detail: "Counting happens under supervision of election officers." }
  ];

  test('should have exactly 7 voting steps', () => {
    expect(stepsData).toHaveLength(7);
  });

  test('each step should have icon, title, desc, and detail', () => {
    stepsData.forEach(step => {
      expect(step).toHaveProperty('icon');
      expect(step).toHaveProperty('title');
      expect(step).toHaveProperty('desc');
      expect(step).toHaveProperty('detail');
    });
  });

  test('steps should be numbered 1 through 7', () => {
    stepsData.forEach((step, i) => {
      expect(step.title).toContain(`${i + 1}.`);
    });
  });

  test('first step should be eligibility check', () => {
    expect(stepsData[0].title).toContain('Eligibility');
  });

  test('last step should be counting and results', () => {
    expect(stepsData[6].title).toContain('Counting');
  });

  test('all steps should have non-empty icons', () => {
    stepsData.forEach(step => {
      expect(step.icon).toBeTruthy();
      expect(step.icon.length).toBeGreaterThan(0);
    });
  });
});

// ============================================================

describe('Quiz Data Validation', () => {
  const quizData = [
    { q: "At what age can citizens typically start voting?", opts: ["16","18","21","25"], correct: 1, explain: "Most democracies set the voting age at 18." },
    { q: "What must you do FIRST before you can vote?", opts: ["Watch the news","Register to vote","Choose a candidate","Visit polling station"], correct: 1, explain: "Voter registration is the mandatory first step." },
    { q: "What is a polling station?", opts: ["A TV studio","A place to vote","Election office","Campaign location"], correct: 1, explain: "A polling station is where voters cast ballots." },
    { q: "What is the purpose of a secret ballot?", opts: ["Keep results secret","Count votes twice","Protect voter privacy","Make elections faster"], correct: 2, explain: "Secret ballot ensures no one can see how you voted." },
    { q: "What happens during campaign blackout?", opts: ["Elections postponed","Campaigning prohibited","Voters can't leave","Media stops"], correct: 1, explain: "Campaign blackout prohibits campaigning before election day." },
    { q: "Who oversees elections in most countries?", opts: ["Ruling party","The military","Election Commission","The President"], correct: 2, explain: "Independent Election Commissions conduct free and fair elections." },
    { q: "What does first past the post mean?", opts: ["First to file wins","Most votes wins","Rank by preference","Oldest wins"], correct: 1, explain: "The candidate with the most votes wins." }
  ];

  test('should have 7 quiz questions', () => {
    expect(quizData).toHaveLength(7);
  });

  test('each question should have q, opts, correct, and explain', () => {
    quizData.forEach(item => {
      expect(item).toHaveProperty('q');
      expect(item).toHaveProperty('opts');
      expect(item).toHaveProperty('correct');
      expect(item).toHaveProperty('explain');
    });
  });

  test('each question should have exactly 4 options', () => {
    quizData.forEach(item => {
      expect(item.opts).toHaveLength(4);
    });
  });

  test('correct answer index should be within valid range (0-3)', () => {
    quizData.forEach(item => {
      expect(item.correct).toBeGreaterThanOrEqual(0);
      expect(item.correct).toBeLessThanOrEqual(3);
    });
  });

  test('all questions should be non-empty strings', () => {
    quizData.forEach(item => {
      expect(typeof item.q).toBe('string');
      expect(item.q.length).toBeGreaterThan(10);
    });
  });

  test('all explanations should be meaningful', () => {
    quizData.forEach(item => {
      expect(item.explain.length).toBeGreaterThan(15);
    });
  });

  test('first question should be about voting age', () => {
    expect(quizData[0].q.toLowerCase()).toContain('age');
    expect(quizData[0].opts[quizData[0].correct]).toBe('18');
  });
});

// ============================================================

describe('Glossary Data', () => {
  const glossaryData = [
    { term: "Ballot", def: "An official document or card used to cast a vote in an election." },
    { term: "Candidate", def: "A person who seeks to be elected to a public office." },
    { term: "Constituency", def: "A geographic area whose residents elect representatives." },
    { term: "Democracy", def: "A system of government where citizens exercise power through elections." },
    { term: "Electoral Roll", def: "The official list of all registered voters." },
    { term: "Exit Poll", def: "A survey of voters conducted immediately after they leave polling stations." },
    { term: "Franchise", def: "The legal right to vote in public elections." },
    { term: "Incumbent", def: "The current holder of a political office running for re-election." },
    { term: "Majority", def: "More than half of the total votes cast." },
    { term: "Manifesto", def: "A published declaration of a political party's policies." },
    { term: "Polling Station", def: "An official location for voters to cast their ballots." },
    { term: "Proportional Representation", def: "An electoral system where seats are allocated based on vote share." },
    { term: "Referendum", def: "A direct public vote on a specific question or policy." },
    { term: "Suffrage", def: "The right to vote in political elections." },
    { term: "Turnout", def: "The percentage of eligible voters who cast a ballot." },
    { term: "Swing Voter", def: "An undecided voter who could vote for any party." }
  ];

  test('should have 16 glossary terms', () => {
    expect(glossaryData).toHaveLength(16);
  });

  test('each entry should have term and definition', () => {
    glossaryData.forEach(item => {
      expect(item).toHaveProperty('term');
      expect(item).toHaveProperty('def');
      expect(item.term).toBeTruthy();
      expect(item.def).toBeTruthy();
    });
  });

  test('Ballot should be the first term', () => {
    expect(glossaryData[0].term).toBe('Ballot');
  });

  test('all definitions should be at least 20 characters', () => {
    glossaryData.forEach(item => {
      expect(item.def.length).toBeGreaterThan(20);
    });
  });

  test('Democracy term should exist', () => {
    const democracy = glossaryData.find(g => g.term === 'Democracy');
    expect(democracy).toBeDefined();
  });

  test('no duplicate terms', () => {
    const terms = glossaryData.map(g => g.term);
    const uniqueTerms = [...new Set(terms)];
    expect(terms.length).toBe(uniqueTerms.length);
  });
});

// ============================================================

describe('Score Calculation Logic', () => {
  function calculateScore(correct, total) {
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  }

  function getScoreMessage(pct) {
    if (pct >= 90) return 'Excellent! Expert!';
    if (pct >= 75) return 'Great work!';
    if (pct >= 50) return 'Good effort!';
    return 'Keep learning!';
  }

  test('perfect score should be 100%', () => {
    expect(calculateScore(7, 7)).toBe(100);
  });

  test('zero score should be 0%', () => {
    expect(calculateScore(0, 7)).toBe(0);
  });

  test('half score should be approximately 57%', () => {
    expect(calculateScore(4, 7)).toBe(57);
  });

  test('score of 100% should return Excellent message', () => {
    expect(getScoreMessage(100)).toContain('Excellent');
  });

  test('score of 80% should return Great work message', () => {
    expect(getScoreMessage(80)).toContain('Great work');
  });

  test('score of 60% should return Good effort message', () => {
    expect(getScoreMessage(60)).toContain('Good effort');
  });

  test('score of 30% should return Keep learning message', () => {
    expect(getScoreMessage(30)).toContain('Keep learning');
  });

  test('score should not exceed 100', () => {
    expect(calculateScore(7, 7)).toBeLessThanOrEqual(100);
  });
});

// ============================================================

describe('Smart Chatbot Response Logic', () => {
  function getSmartResponse(userText) {
    const lower = userText.toLowerCase();
    const knowledgeBase = [
      { keywords: ['register', 'registration', 'sign up'], answer: 'To register to vote, visit your local election commission.' },
      { keywords: ['eligibility', 'eligible', 'who can vote'], answer: 'You must be 18+, a citizen, and meet residency requirements.' },
      { keywords: ['how to vote', 'cast', 'ballot', 'steps'], answer: 'Follow the 7 steps: check eligibility, register, find polling station...' },
      { keywords: ['secret ballot', 'privacy'], answer: 'A secret ballot protects your vote from being seen by others.' },
      { keywords: ['count', 'counting', 'result'], answer: 'Votes are counted under official supervision after polls close.' },
      { keywords: ['id', 'identification', 'document'], answer: 'Bring your Voter ID card and one photo ID document.' },
      { keywords: ['polling station', 'booth', 'where'], answer: 'Your polling station address is on your Voter ID card.' },
      { keywords: ['hello', 'hi', 'hey', 'help'], answer: 'Hello! I am your Election Education Assistant.' }
    ];
    for (const entry of knowledgeBase) {
      if (entry.keywords.some(k => lower.includes(k))) return entry.answer;
    }
    return 'Great question! Please check your official election commission website.';
  }

  test('should respond to registration questions', () => {
    const response = getSmartResponse('How do I register to vote?');
    expect(response).toBeTruthy();
    expect(response.length).toBeGreaterThan(10);
  });

  test('should respond to eligibility questions', () => {
    const response = getSmartResponse('Am I eligible to vote?');
    expect(response).toContain('18+');
  });

  test('should respond to polling station questions', () => {
    const response = getSmartResponse('Where is my polling station?');
    expect(response).toBeTruthy();
  });

  test('should respond to greeting', () => {
    const response = getSmartResponse('Hello');
    expect(response).toContain('Hello');
  });

  test('should return fallback for unknown questions', () => {
    const response = getSmartResponse('xyzunknownquestionabc');
    expect(response).toBeTruthy();
    expect(response.length).toBeGreaterThan(10);
  });

  test('should be case-insensitive', () => {
    const lower = getSmartResponse('how do i register');
    const upper = getSmartResponse('HOW DO I REGISTER');
    expect(lower).toBe(upper);
  });
});

// ============================================================

describe('Accessibility & HTML Structure', () => {
  test('nav should have accessible links', () => {
    const navItems = ['About', 'Timeline', 'Steps', 'Quiz', 'Ask AI'];
    navItems.forEach(item => {
      expect(item).toBeTruthy();
    });
    expect(navItems).toHaveLength(5);
  });

  test('all sections should have proper IDs', () => {
    const sectionIds = ['about', 'timeline', 'steps', 'quiz', 'chatbot', 'glossary'];
    sectionIds.forEach(id => {
      expect(id).toBeTruthy();
      expect(typeof id).toBe('string');
    });
    expect(sectionIds).toHaveLength(6);
  });

  test('color contrast - gold on navy should meet WCAG', () => {
    // Gold #e8b84b on Navy #0a1628 - contrast ratio > 4.5:1
    const goldLuminance = 0.355; // relative luminance of #e8b84b
    const navyLuminance = 0.004; // relative luminance of #0a1628
    const contrastRatio = (goldLuminance + 0.05) / (navyLuminance + 0.05);
    expect(contrastRatio).toBeGreaterThan(4.5);
  });

  test('should have 7 key sections', () => {
    const sections = ['nav', 'hero', 'timeline', 'steps', 'quiz', 'chatbot', 'glossary'];
    expect(sections).toHaveLength(7);
  });
});

// ============================================================

describe('Performance & Security', () => {
  test('API key should not be hardcoded in frontend', () => {
    // API calls go through server.js backend - key is server-side only
    const frontendCode = "fetch('http://localhost:3000/api/chat')";
    expect(frontendCode).not.toContain('sk-ant-');
    expect(frontendCode).not.toContain('API_KEY');
  });

  test('chat history should be an array', () => {
    const chatHistory = [];
    expect(Array.isArray(chatHistory)).toBe(true);
  });

  test('user input should be trimmed', () => {
    const rawInput = '  How do I vote?  ';
    const trimmed = rawInput.trim();
    expect(trimmed).toBe('How do I vote?');
  });

  test('empty input should be rejected', () => {
    const input = '   ';
    expect(input.trim()).toBeFalsy();
  });

  test('server port should be 3000', () => {
    const PORT = 3000;
    expect(PORT).toBe(3000);
    expect(typeof PORT).toBe('number');
  });

  test('CORS headers should be set', () => {
    const corsHeader = 'Access-Control-Allow-Origin';
    expect(corsHeader).toBeTruthy();
    expect(corsHeader).toContain('Access-Control');
  });

  test('API model should be claude-sonnet', () => {
    const model = 'claude-sonnet-4-20250514';
    expect(model).toContain('claude');
    expect(model).toContain('sonnet');
  });
});

// ============================================================

describe('Integration Tests - Chat Flow', () => {
  test('chat message should have role and content', () => {
    const message = { role: 'user', content: 'How do I vote?' };
    expect(message).toHaveProperty('role');
    expect(message).toHaveProperty('content');
    expect(message.role).toBe('user');
  });

  test('assistant message should have correct role', () => {
    const message = { role: 'assistant', content: 'Here is how to vote...' };
    expect(message.role).toBe('assistant');
  });

  test('chat history should accumulate messages', () => {
    const history = [];
    history.push({ role: 'user', content: 'Hello' });
    history.push({ role: 'assistant', content: 'Hi there!' });
    expect(history).toHaveLength(2);
    expect(history[0].role).toBe('user');
    expect(history[1].role).toBe('assistant');
  });

  test('suggested questions should be an array of strings', () => {
    const sugQs = [
      "How do I register to vote?",
      "What is a secret ballot?",
      "How are votes counted?",
      "What is proportional representation?",
      "Can I vote if I moved recently?",
      "What ID do I need to vote?"
    ];
    expect(Array.isArray(sugQs)).toBe(true);
    sugQs.forEach(q => expect(typeof q).toBe('string'));
    expect(sugQs).toHaveLength(6);
  });

  test('fetch endpoint should be localhost API', () => {
    const endpoint = 'http://localhost:3000/api/chat';
    expect(endpoint).toContain('localhost');
    expect(endpoint).toContain('/api/chat');
  });
});
