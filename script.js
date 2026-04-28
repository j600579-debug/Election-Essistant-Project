/**
 * ElectEd - Election Process Education
 * script.js — Main Application Logic
 *
 * Features:
 * - Interactive AI Chat Assistant (Anthropic API)
 * - Election Knowledge Quiz
 * - Dynamic Steps Grid
 * - Smooth Navigation & Accessibility
 * - Google Analytics / Firebase integration hooks
 * - Scroll-to-top
 * - Hamburger menu
 * - Intersection Observer animations
 */

"use strict";

/* ===================================================
   CONSTANTS & DATA
   =================================================== */

const STEPS_DATA = [
  {
    icon: "🏛️",
    title: "Check Your Eligibility",
    desc: "Confirm you meet age, citizenship, and residency requirements to vote in your jurisdiction.",
    num: 1
  },
  {
    icon: "📝",
    title: "Register to Vote",
    desc: "Submit a voter registration form online, by mail, or in person before your region's deadline.",
    num: 2
  },
  {
    icon: "🔍",
    title: "Research Candidates & Issues",
    desc: "Read candidate platforms, attend debates, and review nonpartisan voter guides to make informed decisions.",
    num: 3
  },
  {
    icon: "🗓️",
    title: "Know the Election Dates",
    desc: "Mark primary, runoff, and general election dates on your calendar. Check early voting periods.",
    num: 4
  },
  {
    icon: "📍",
    title: "Find Your Polling Place",
    desc: "Locate your designated polling station using your official election authority's website.",
    num: 5
  },
  {
    icon: "🪪",
    title: "Bring Required ID",
    desc: "Check what forms of identification are required in your state or country and bring them on election day.",
    num: 6
  },
  {
    icon: "🗳️",
    title: "Cast Your Vote",
    desc: "Go to your polling place, follow instructions from poll workers, cast your ballot, and collect your 'I Voted' sticker!",
    num: 7
  }
];

const QUIZ_DATA = [
  {
    q: "What is voter registration?",
    options: [
      "A process of signing up to be eligible to vote",
      "A way to register a political party",
      "A form of paying election taxes",
      "A mandatory civic exam"
    ],
    answer: 0,
    explanation: "Voter registration is the process where eligible citizens sign up with their local election authority to be allowed to vote in elections."
  },
  {
    q: "What is a primary election?",
    options: [
      "The final election between all candidates",
      "An election held within a party to select its candidate",
      "A vote only for the president",
      "An election for school representatives"
    ],
    answer: 1,
    explanation: "A primary election is held within a political party so voters can choose which candidate will represent that party in the general election."
  },
  {
    q: "On which document do voters cast their choices?",
    options: ["Census form", "Tax return", "Ballot", "Poll card"],
    answer: 2,
    explanation: "A ballot is the official document or electronic interface used by voters to record their choices in an election."
  },
  {
    q: "What does 'electoral roll' mean?",
    options: [
      "A list of all candidates running for office",
      "A list of all registered voters eligible to vote",
      "A roll call in parliament",
      "A type of mail-in ballot"
    ],
    answer: 1,
    explanation: "The electoral roll (also called the voter register) is the official list of all citizens who are registered and eligible to vote."
  },
  {
    q: "What is a polling station?",
    options: [
      "A radio broadcasting studio",
      "A research center for surveys",
      "A designated location where voters go to cast their ballots",
      "The headquarters of a political party"
    ],
    answer: 2,
    explanation: "A polling station (or polling place) is an official location designated for voters to cast their ballots on election day."
  },
  {
    q: "What happens in an election runoff?",
    options: [
      "Votes are recounted automatically",
      "A second election is held when no candidate wins a required majority",
      "All losing candidates are eliminated",
      "The winner is decided by a coin toss"
    ],
    answer: 1,
    explanation: "A runoff election occurs when no candidate receives the required majority in the first election, so a second round is held between the top candidates."
  },
  {
    q: "What is absentee/mail-in voting?",
    options: [
      "Voting by phone",
      "Voting through a representative",
      "Casting a ballot by mail when unable to vote in person",
      "An internet-based voting system"
    ],
    answer: 2,
    explanation: "Absentee or mail-in voting allows registered voters to submit their ballot by mail if they cannot attend a polling station in person on election day."
  },
  {
    q: "How is the winner of most elections typically determined?",
    options: [
      "Random lottery among all candidates",
      "Appointment by the current leader",
      "The candidate with the most votes wins",
      "The oldest candidate wins by default"
    ],
    answer: 2,
    explanation: "In most democratic elections, the candidate who receives the most votes (plurality) wins the election, though some systems require an absolute majority."
  },
  {
    q: "What does 'nonpartisan' mean in the context of elections?",
    options: [
      "Supporting only one political party",
      "Not affiliated with or favoring any political party",
      "A party that runs no candidates",
      "An international election observer"
    ],
    answer: 1,
    explanation: "'Nonpartisan' means not affiliated with or biased toward any political party. Nonpartisan organizations provide neutral election information."
  },
  {
    q: "Why is civic participation important in a democracy?",
    options: [
      "It is not important; elections run themselves",
      "Only politicians need to participate",
      "Voting and civic engagement ensure citizens have a voice in governance",
      "Participation is only required during wartime"
    ],
    answer: 2,
    explanation: "Civic participation, especially voting, is fundamental to democracy because it ensures that citizens collectively determine who leads and what policies are enacted."
  }
];

const BOT_KNOWLEDGE = {
  "voter registration": "Voter registration is the process of signing up with your local election authority to become eligible to vote. You typically provide your name, address, date of birth, and citizenship status. Deadlines vary — some places allow same-day registration, while others require weeks in advance.",
  "register to vote": "To register to vote: (1) Check your eligibility (citizenship, age, residency). (2) Visit your official election authority's website or office. (3) Complete the registration form. (4) Submit before the deadline. Many countries also allow online registration!",
  "primary election": "A primary election is held within a political party to choose which candidate will represent that party in the general election. Voters in party primaries typically need to be registered members of that party, though some states hold open primaries.",
  "general election": "A general election is the main election where voters choose between candidates from different parties (or independent candidates) for a government office. This is the final election that determines who wins the position.",
  "electoral college": "The Electoral College is a unique system used in U.S. presidential elections. Instead of a direct popular vote, each state has a number of 'electors' based on its congressional representation. Candidates need 270 of 538 electoral votes to win the presidency.",
  "vote counting": "Vote counting begins after polls close. Election workers count paper ballots, electronic votes, and mail-in ballots. Results go through verification and certification processes. Official results can take days to weeks, especially in close races.",
  "absentee": "Absentee voting (also called mail-in voting) lets registered voters cast their ballot by mail when they can't go to a polling station in person — for reasons like travel, illness, or disability. You typically need to request an absentee ballot in advance.",
  "polling place": "A polling place (or polling station) is an official location where voters go to cast their ballots on election day. It's usually a public building like a school, library, or community center. You can find yours through your election authority's website.",
  "ballot": "A ballot is the official document or screen through which you record your vote. It lists all candidates and issues (like referendums) you can vote on. After completing your ballot, it's securely collected and counted.",
  "runoff": "A runoff election happens when no candidate wins a required threshold (like 50% of votes) in the first election. The top candidates face each other in a second election. Runoffs are common in many countries and some U.S. states.",
  "democracy": "Democracy is a system of government where power is held by the citizens, who exercise it through free and fair elections. It guarantees rights like freedom of speech, press, and assembly. There are two main types: direct democracy and representative democracy.",
  "candidate": "An election candidate is a person who is running for a political office. Candidates typically represent a political party or run as independents. They must meet legal requirements (age, citizenship, etc.) and formally file to run with election authorities.",
  "election day": "Election Day is the official day when voters cast their ballots. Polls usually open early in the morning (like 6 or 7 AM) and close in the evening. You'll need to go to your designated polling place and may need to show ID.",
  "voter id": "Voter ID requirements vary by location. Some places require government-issued photo ID, while others accept utility bills or have no ID requirement. Always check your local election authority's website for the current requirements in your area.",
  "campaign": "An election campaign is a candidate's organized effort to win votes. It includes rallies, debates, advertisements, social media, and door-to-door canvassing. Campaigns are regulated by laws that govern fundraising, spending, and advertising.",
  "default": "That's a great election-related question! The election process involves registration, campaigning, voting, and counting. Every democratic country has specific rules about eligibility, timelines, and procedures. I recommend checking your official election authority's website for accurate local information. Is there a specific aspect of elections you'd like to know more about?"
};

/* ===================================================
   UTILITY FUNCTIONS
   =================================================== */

/**
 * Safely get DOM element by ID
 * @param {string} id
 * @returns {HTMLElement|null}
 */
function getEl(id) {
  return document.getElementById(id);
}

/**
 * Debounce function
 * @param {Function} fn
 * @param {number} wait
 * @returns {Function}
 */
function debounce(fn, wait) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

/**
 * Sanitize user input to prevent XSS
 * @param {string} str
 * @returns {string}
 */
function sanitize(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Scroll element into view smoothly
 * @param {HTMLElement} el
 */
function scrollToEl(el) {
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "end" });
}

/* ===================================================
   NAVIGATION
   =================================================== */

function initNavigation() {
  const hamburger = getEl("hamburger");
  const mobileMenu = getEl("mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(isOpen));
      mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    });

    // Close on link click
    mobileMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });
  }

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav .nav-link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          const isActive = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", isActive);
          link.setAttribute("aria-current", isActive ? "page" : "false");
        });
      }
    });
  }, { rootMargin: "-50% 0px -50% 0px" });

  sections.forEach(s => observer.observe(s));
}

/* ===================================================
   SCROLL TO TOP
   =================================================== */

function initScrollTop() {
  const btn = getEl("scroll-top");
  if (!btn) return;

  const toggle = debounce(() => {
    btn.classList.toggle("visible", window.scrollY > 400);
    btn.hidden = window.scrollY <= 400;
  }, 100);

  window.addEventListener("scroll", toggle, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ===================================================
   STEPS GRID — render dynamically
   =================================================== */

function initSteps() {
  const grid = document.querySelector(".steps-grid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  STEPS_DATA.forEach(step => {
    const card = document.createElement("article");
    card.className = "step-card";
    card.setAttribute("role", "listitem");
    card.setAttribute("aria-label", `Step ${step.num}: ${step.title}`);
    card.innerHTML = `
      <div class="step-num" aria-hidden="true">${step.num}</div>
      <span class="step-icon" aria-hidden="true">${step.icon}</span>
      <h3>${step.title}</h3>
      <p>${step.desc}</p>
    `;
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

/* ===================================================
   QUIZ
   =================================================== */

const QuizState = {
  current: 0,
  score: 0,
  answered: false
};

function initQuiz() {
  renderQuestion();
}

function renderQuestion() {
  const box = getEl("quiz-box");
  if (!box) return;

  const { current } = QuizState;

  if (current >= QUIZ_DATA.length) {
    renderResult();
    return;
  }

  const q = QUIZ_DATA[current];
  const progress = Math.round(((current) / QUIZ_DATA.length) * 100);

  box.innerHTML = `
    <div class="quiz-progress" aria-label="Quiz progress: question ${current + 1} of ${QUIZ_DATA.length}">
      <span>Question ${current + 1} of ${QUIZ_DATA.length}</span>
      <span>${QuizState.score} correct</span>
    </div>
    <div class="progress-bar-wrap" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" aria-label="Quiz progress: ${progress}%">
      <div class="progress-bar" style="width:${progress}%"></div>
    </div>
    <div class="quiz-question">
      <span class="quiz-q-label">Question ${current + 1}</span>
      <p class="quiz-q-text">${q.q}</p>
      <div class="quiz-options" role="group" aria-label="Answer options">
        ${q.options.map((opt, i) => `
          <button
            class="quiz-option"
            data-index="${i}"
            aria-label="Option ${i + 1}: ${opt}"
          >${opt}</button>
        `).join("")}
      </div>
      <div id="quiz-feedback" aria-live="polite" aria-atomic="true"></div>
    </div>
    <div class="quiz-nav">
      <button class="btn-quiz-next" id="quiz-next" style="display:none;" aria-label="Next question">
        ${current + 1 < QUIZ_DATA.length ? "Next Question →" : "See Results →"}
      </button>
    </div>
  `;

  QuizState.answered = false;

  // Bind option buttons
  box.querySelectorAll(".quiz-option").forEach(btn => {
    btn.addEventListener("click", () => handleAnswer(parseInt(btn.dataset.index)));
  });

  // Bind next button
  const nextBtn = getEl("quiz-next");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      QuizState.current++;
      renderQuestion();
    });
  }
}

function handleAnswer(selectedIndex) {
  if (QuizState.answered) return;
  QuizState.answered = true;

  const q = QUIZ_DATA[QuizState.current];
  const isCorrect = selectedIndex === q.answer;
  if (isCorrect) QuizState.score++;

  const options = document.querySelectorAll(".quiz-option");
  options.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
    if (i === selectedIndex && !isCorrect) btn.classList.add("wrong");
  });

  const feedback = getEl("quiz-feedback");
  if (feedback) {
    feedback.className = `quiz-feedback ${isCorrect ? "correct" : "wrong"}`;
    feedback.innerHTML = `
      <strong>${isCorrect ? "✅ Correct!" : "❌ Not quite."}</strong>
      ${q.explanation}
    `;
  }

  const nextBtn = getEl("quiz-next");
  if (nextBtn) nextBtn.style.display = "flex";
}

function renderResult() {
  const box = getEl("quiz-box");
  if (!box) return;

  const { score } = QuizState;
  const total = QUIZ_DATA.length;
  const pct = Math.round((score / total) * 100);
  const msgs = [
    { min: 90, msg: "🏆 Outstanding! You're an election expert!", color: "#16a34a" },
    { min: 70, msg: "🌟 Great job! You have strong civic knowledge.", color: "#2563eb" },
    { min: 50, msg: "👍 Good effort! Keep learning about democracy.", color: "#d97706" },
    { min: 0, msg: "📚 Keep studying — democracy depends on informed voters!", color: "#dc2626" }
  ];
  const { msg, color } = msgs.find(m => pct >= m.min);

  box.innerHTML = `
    <div class="quiz-result" role="region" aria-label="Quiz results">
      <span class="score-display" aria-label="Your score: ${score} out of ${total}">${score}/${total}</span>
      <span class="score-label">${pct}% Correct</span>
      <p class="score-msg" style="color:${color}">${msg}</p>
      <button class="btn-quiz-retry" id="quiz-retry" aria-label="Retry the quiz">
        🔄 Try Again
      </button>
    </div>
  `;

  const retry = getEl("quiz-retry");
  if (retry) {
    retry.addEventListener("click", () => {
      QuizState.current = 0;
      QuizState.score = 0;
      QuizState.answered = false;
      renderQuestion();
    });
  }
}

/* ===================================================
   AI CHAT ASSISTANT
   =================================================== */

/**
 * Get a bot response from local knowledge base.
 * Falls back to Anthropic API if available.
 * @param {string} query
 * @returns {Promise<string>}
 */
async function getBotResponse(query) {
  const lq = query.toLowerCase();

  // Try local knowledge base first for fast responses
  for (const [key, value] of Object.entries(BOT_KNOWLEDGE)) {
    if (key !== "default" && lq.includes(key)) {
      return value;
    }
  }

  // Try Anthropic API
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `You are an Election Process Education assistant. You help users understand how elections work, voting procedures, timelines, civic duties, and democratic processes. Keep responses clear, friendly, accurate, and nonpartisan. Use simple language. Focus only on election-related topics. If asked about unrelated topics, politely redirect to election education. Format responses in 2-3 short paragraphs maximum.`,
        messages: [{ role: "user", content: query }]
      })
    });

    if (response.ok) {
      const data = await response.json();
      const text = data.content
        .filter(block => block.type === "text")
        .map(block => block.text)
        .join("\n");
      return text || BOT_KNOWLEDGE["default"];
    }
  } catch (err) {
    // API not available — use local knowledge
    console.warn("API unavailable, using local knowledge:", err.message);
  }

  return BOT_KNOWLEDGE["default"];
}

function addMessage(text, isUser = false) {
  const container = getEl("chat-messages");
  if (!container) return;

  const msg = document.createElement("div");
  msg.className = `message ${isUser ? "user-message" : "bot-message"}`;
  msg.setAttribute("role", "article");
  msg.setAttribute("aria-label", `${isUser ? "Your" : "Assistant"} message`);

  const icon = isUser ? "👤" : "🗳️";
  // Sanitize user text; bot text allowed to contain simple HTML
  const displayText = isUser
    ? sanitize(text)
    : text.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>");

  msg.innerHTML = `
    <span class="msg-icon" aria-hidden="true">${icon}</span>
    <div class="msg-bubble"><p>${displayText}</p></div>
  `;

  container.appendChild(msg);
  scrollToEl(msg);
}

function addLoadingMessage() {
  const container = getEl("chat-messages");
  if (!container) return null;

  const msg = document.createElement("div");
  msg.className = "message bot-message";
  msg.id = "loading-msg";
  msg.setAttribute("role", "status");
  msg.setAttribute("aria-label", "Assistant is typing");
  msg.innerHTML = `
    <span class="msg-icon" aria-hidden="true">🗳️</span>
    <div class="msg-bubble">
      <div class="loading-dots" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  container.appendChild(msg);
  scrollToEl(msg);
  return msg;
}

function initChat() {
  const form = getEl("chat-form");
  const input = getEl("chat-input");
  const sendBtn = getEl("send-btn");

  if (!form || !input) return;

  const handleSubmit = async (queryText) => {
    const query = (queryText || input.value).trim();
    if (!query) return;

    input.value = "";
    input.disabled = true;
    if (sendBtn) sendBtn.disabled = true;

    addMessage(query, true);
    const loader = addLoadingMessage();

    try {
      const reply = await getBotResponse(query);
      if (loader) loader.remove();
      addMessage(reply, false);
    } catch (err) {
      if (loader) loader.remove();
      addMessage("I'm sorry, I couldn't process your question right now. Please try again.", false);
    } finally {
      input.disabled = false;
      if (sendBtn) sendBtn.disabled = false;
      input.focus();
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit();
  });

  // Quick prompt buttons
  document.querySelectorAll(".quick-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const q = btn.dataset.q;
      if (q) handleSubmit(q);
    });
  });
}

/* ===================================================
   INTERSECTION OBSERVER — Animate on scroll
   =================================================== */

function initScrollAnimations() {
  const targets = document.querySelectorAll(
    ".step-card, .resource-card, .timeline-item, .quiz-question"
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${i * 0.06}s`;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });
}

/* ===================================================
   GOOGLE SERVICES INTEGRATION
   =================================================== */

/**
 * Google Analytics 4 tracking initialization
 * Swap in your actual G-XXXXXXXX measurement ID.
 */
function initGoogleAnalytics() {
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with actual ID

  try {
    // Dynamically load gtag.js
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onerror = () => console.warn("Google Analytics script failed to load.");
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_path: window.location.pathname,
      anonymize_ip: true
    });

    // Track key user events
    document.querySelectorAll(".btn-primary, .btn-outline").forEach(btn => {
      btn.addEventListener("click", () => {
        gtag("event", "cta_click", {
          event_category: "engagement",
          event_label: btn.textContent.trim()
        });
      });
    });

    // Track quiz completion
    document.addEventListener("quizComplete", (e) => {
      gtag("event", "quiz_complete", {
        event_category: "quiz",
        event_label: "Election Quiz",
        value: e.detail?.score || 0
      });
    });

    // Track chat messages
    document.addEventListener("chatMessage", (e) => {
      gtag("event", "chat_interaction", {
        event_category: "assistant",
        event_label: "User asked question"
      });
    });

    console.info("Google Analytics initialized.");
  } catch (err) {
    console.warn("Google Analytics initialization error:", err);
  }
}

/**
 * Firebase integration stub
 * Uncomment and configure with your Firebase project settings.
 */
function initFirebase() {
  try {
    // Firebase configuration (replace with your values)
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    // Load Firebase SDK dynamically
    // import { initializeApp } from 'firebase/app';
    // import { getFirestore, collection, addDoc } from 'firebase/firestore';
    // const app = initializeApp(firebaseConfig);
    // const db = getFirestore(app);

    // Stub: Log quiz results to Firestore
    window.logQuizResult = async (score, total) => {
      /* 
      await addDoc(collection(db, "quiz_results"), {
        score, total, timestamp: new Date().toISOString()
      });
      */
      console.info(`[Firebase stub] Quiz result: ${score}/${total}`);
    };

    console.info("Firebase integration stub ready.");
  } catch (err) {
    console.warn("Firebase init error:", err);
  }
}

/* ===================================================
   PERFORMANCE & SECURITY
   =================================================== */

/**
 * Content Security Policy meta tag (programmatic supplement)
 * Main CSP should be set via HTTP headers on the server.
 */
function applySecurityMeta() {
  // Ensure referrer policy
  const rp = document.querySelector("meta[name='referrer']");
  if (!rp) {
    const meta = document.createElement("meta");
    meta.name = "referrer";
    meta.content = "strict-origin-when-cross-origin";
    document.head.appendChild(meta);
  }
}

/**
 * Lazy-load images that are off-screen (if any images are added later)
 */
function initLazyLoad() {
  if ("loading" in HTMLImageElement.prototype) {
    document.querySelectorAll("img").forEach(img => {
      img.loading = "lazy";
    });
  }
}

/* ===================================================
   TESTING HOOKS (for automated testing)
   =================================================== */

/**
 * Expose testable functions for integration testing.
 * In production, these can be stripped by a build tool.
 */
if (typeof window !== "undefined") {
  window.__ElectEdTests = {
    sanitize,
    getBotResponse,
    QUIZ_DATA,
    STEPS_DATA,
    QuizState,
    renderQuestion,
    handleAnswer,
    renderResult
  };
}

/* ===================================================
   INIT — Run when DOM is ready
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Core features
  initNavigation();
  initScrollTop();
  initSteps();
  initQuiz();
  initChat();

  // Visual enhancements
  initScrollAnimations();

  // Performance & security
  applySecurityMeta();
  initLazyLoad();

  // Google Services
  initGoogleAnalytics();
  initFirebase();

  console.info("✅ ElectEd initialized successfully.");
});

/* ===================================================
   SERVICE WORKER registration (PWA / Efficiency)
   =================================================== */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then(reg => {
      console.info("Service Worker registered:", reg.scope);
    }).catch(err => {
      console.warn("Service Worker registration failed:", err);
    });
  });
}
