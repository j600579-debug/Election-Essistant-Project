/**
 * @file script.js
 * @description ElectED – Election Process Education
 * @version 2.0.0
 * @author ElectED Team
 * @license MIT
 *
 * Features:
 *  - Responsive navigation with scroll detection
 *  - Animated counters with IntersectionObserver
 *  - Interactive ballot card
 *  - Timeline reveal animations
 *  - Accordion step cards
 *  - 7-question quiz engine with scoring
 *  - AI-powered chatbot (via localhost backend)
 *  - Offline fallback smart responses
 *  - Glossary with reveal animations
 *  - Smooth scroll navigation
 *
 * @requires server.js - Node.js backend for AI chat
 */

'use strict';

// ========== NAV SCROLL ==========
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ========== HAMBURGER (mobile) ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav__links');
hamburger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '70px';
  navLinks.style.right = '24px';
  navLinks.style.background = 'rgba(10,22,40,0.97)';
  navLinks.style.padding = '16px 24px';
  navLinks.style.borderRadius = '12px';
  navLinks.style.gap = '14px';
});

// ========== COUNTER ANIMATION ==========
function animateCounter(el) {
  const target = +el.dataset.target;
  const step = Math.ceil(target / 40);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + (target === 100 ? '%' : '');
    if (current >= target) clearInterval(timer);
  }, 40);
}
const counterEls = document.querySelectorAll('.stat__num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObserver.unobserve(e.target); } });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

// ========== BALLOT CARD INTERACTION ==========
document.querySelectorAll('.ballot-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.ballot-opt').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});

// ========== TIMELINE DATA ==========
const timelineData = [
  { date: "12 Months Before", title: "Election Announced", desc: "The election commission officially announces the upcoming election date and begins preparations." },
  { date: "10 Months Before", title: "Voter Registration Opens", desc: "Citizens can register or update their voter registration details to become eligible to vote." },
  { date: "8 Months Before", title: "Candidate Filing Period", desc: "Potential candidates file their nomination papers and declare their intent to run for office." },
  { date: "6 Months Before", title: "Nomination Deadline", desc: "The last date for candidates to submit their nomination documents to the election authority." },
  { date: "4 Months Before", title: "Campaign Period Begins", desc: "Official campaign period starts. Candidates begin rallies, advertisements, and public outreach." },
  { date: "2 Months Before", title: "Voter Registration Closes", desc: "Final deadline for citizen voter registration. After this, no new registrations are accepted." },
  { date: "1 Month Before", title: "Voter ID Cards Distributed", desc: "Eligible registered voters receive their official voter identification cards and polling station details." },
  { date: "2 Weeks Before", title: "Campaign Blackout Period", desc: "Campaigning is prohibited to allow voters time to reflect without political influence." },
  { date: "Election Day", title: "🗳️ Voting Day", desc: "Polling stations open. Registered voters cast their ballots. Officials monitor for free and fair elections." },
  { date: "Election Day Evening", title: "Polls Close", desc: "Polling stations close and ballot boxes are sealed. The counting process officially begins." },
  { date: "Night of Election", title: "Vote Counting", desc: "Ballots are counted transparently under supervision of election officials and representatives." },
  { date: "Day After Election", title: "Results Declared", desc: "Final results are announced. The winning candidate or party is declared and certification begins." }
];

const timelineContainer = document.getElementById('timelineContainer');
timelineData.forEach((item, i) => {
  const div = document.createElement('div');
  div.className = 'timeline-item';
  div.innerHTML = `
    <div class="timeline-item__dot"></div>
    <div class="timeline-card">
      <div class="timeline-card__date">${item.date}</div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>`;
  timelineContainer.appendChild(div);
});

// ========== STEPS DATA ==========
const stepsData = [
  {
    icon: "📋",
    title: "1. Check Eligibility",
    desc: "Confirm you meet the legal requirements: minimum voting age, citizenship status, and residency criteria.",
    detail: "Requirements typically include: being 18+ years old, being a citizen, not having certain criminal convictions, and living in the electoral district."
  },
  {
    icon: "📝",
    title: "2. Register to Vote",
    desc: "Complete the official voter registration process before the deadline.",
    detail: "Registration can usually be done online, by mail, or in person at a government office. You'll need your ID and proof of address."
  },
  {
    icon: "🏠",
    title: "3. Find Your Polling Station",
    desc: "Locate the polling station assigned to your registered address.",
    detail: "Your voter ID card will usually have your polling station address. You can also check online with your voter ID number."
  },
  {
    icon: "🪪",
    title: "4. Bring Valid ID",
    desc: "Carry your official voter ID card and government-issued photo ID to the polls.",
    detail: "Accepted IDs typically include: voter card, passport, driver's license, or other government-issued identity documents."
  },
  {
    icon: "☑️",
    title: "5. Cast Your Ballot",
    desc: "Mark your choice clearly on the ballot paper and submit it according to instructions.",
    detail: "In some elections you use paper ballots, in others Electronic Voting Machines (EVMs). Follow the instructions of polling officials."
  },
  {
    icon: "🔒",
    title: "6. Vote is Secured",
    desc: "Your completed ballot is sealed and stored securely until official counting begins.",
    detail: "Ballots are kept in sealed boxes monitored by election officials and party representatives to ensure integrity."
  },
  {
    icon: "📊",
    title: "7. Counting & Results",
    desc: "Votes are counted transparently and results are officially declared.",
    detail: "Counting happens under supervision of election officers and party representatives. Results are publicly announced and can be challenged through legal processes."
  }
];

const stepsGrid = document.getElementById('stepsGrid');
stepsData.forEach((step, i) => {
  const card = document.createElement('div');
  card.className = 'step-card';
  card.innerHTML = `
    <div class="step-num">0${i + 1}</div>
    <div class="step-icon">${step.icon}</div>
    <h3>${step.title}</h3>
    <p>${step.desc}</p>
    <div class="step-card__expand">+ Learn more</div>
    <div class="step-card__detail">${step.detail}</div>`;
  card.querySelector('.step-card__expand').addEventListener('click', () => {
    card.classList.toggle('expanded');
    card.querySelector('.step-card__expand').textContent = card.classList.contains('expanded') ? '− Show less' : '+ Learn more';
  });
  stepsGrid.appendChild(card);
});

// ========== INTERSECTION OBSERVER (reveal) ==========
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item, .step-card, .glossary-card').forEach(el => revealObserver.observe(el));

// ========== QUIZ ENGINE ==========
const quizData = [
  { q: "At what age can citizens typically start voting in most democracies?", opts: ["16", "18", "21", "25"], correct: 1, explain: "Most democracies set the voting age at 18, though some countries like Austria and Scotland allow voting at 16." },
  { q: "What must you do FIRST before you can vote in an election?", opts: ["Watch the news", "Register to vote", "Choose a candidate", "Visit the polling station"], correct: 1, explain: "Voter registration is the mandatory first step. Without registration, you cannot cast a valid ballot." },
  { q: "What is a 'polling station'?", opts: ["A TV news studio", "A place where votes are collected on election day", "The election commission office", "Where candidates campaign"], correct: 1, explain: "A polling station (or polling place) is the official location where registered voters go to cast their ballots on election day." },
  { q: "What is the purpose of a secret ballot?", opts: ["To keep election results secret", "To ensure your vote is counted twice", "To protect voter privacy and prevent coercion", "To make elections faster"], correct: 2, explain: "The secret ballot ensures that no one can see how you voted, protecting your freedom of choice and preventing bribery or intimidation." },
  { q: "What happens during the 'campaign blackout period'?", opts: ["All elections are postponed", "Campaigning is prohibited close to election day", "Voters cannot leave the country", "The media stops reporting news"], correct: 1, explain: "A campaign blackout (usually 24–48 hours before voting) prohibits campaigning to give voters peaceful time to make their final decision." },
  { q: "Who is responsible for overseeing elections in most countries?", opts: ["The ruling political party", "The military", "An independent Election Commission", "The President or Prime Minister"], correct: 2, explain: "Independent Election Commissions are established to conduct free and fair elections without bias toward any political party." },
  { q: "What does 'first past the post' mean in elections?", opts: ["The candidate who files first wins", "The candidate with the most votes wins", "Voters rank candidates by preference", "The oldest candidate wins automatically"], correct: 1, explain: "'First past the post' means the candidate who receives the most votes in their constituency wins, regardless of whether they get a majority." }
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function loadQuiz() {
  if (quizIndex >= quizData.length) { showQuizResult(); return; }
  const q = quizData[quizIndex];
  document.getElementById('quizProgressBar').style.width = `${((quizIndex) / quizData.length) * 100}%`;
  document.getElementById('quizQuestion').textContent = `Q${quizIndex + 1}. ${q.q}`;
  const optionsEl = document.getElementById('quizOptions');
  optionsEl.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(i, btn));
    optionsEl.appendChild(btn);
  });
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('quizNext').style.display = 'none';
  quizAnswered = false;
}

function handleAnswer(chosen, btn) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = quizData[quizIndex];
  const allBtns = document.querySelectorAll('.quiz-option');
  allBtns.forEach(b => b.disabled = true);
  allBtns[q.correct].classList.add('correct');
  const feedbackEl = document.getElementById('quizFeedback');
  if (chosen === q.correct) {
    quizScore++;
    feedbackEl.textContent = '✅ Correct! ' + q.explain;
    feedbackEl.style.color = '#4ade80';
  } else {
    btn.classList.add('wrong');
    feedbackEl.textContent = '❌ Not quite. ' + q.explain;
    feedbackEl.style.color = '#f87171';
  }
  document.getElementById('quizNext').style.display = 'inline-block';
}

function showQuizResult() {
  document.getElementById('quizProgressBar').style.width = '100%';
  document.getElementById('quizQuestion').textContent = '';
  document.getElementById('quizOptions').innerHTML = '';
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('quizNext').style.display = 'none';
  const pct = Math.round((quizScore / quizData.length) * 100);
  const msgs = [
    [0, 49, "Keep learning! Every citizen can master the election process. 💪"],
    [50, 74, "Good effort! You're on your way to becoming an informed voter. 🗳️"],
    [75, 89, "Great work! You have a solid understanding of the election process. 🌟"],
    [90, 100, "Excellent! You're an election process expert! 🏆"]
  ];
  const msg = msgs.find(m => pct >= m[0] && pct <= m[1])?.[2] || '';
  const resultEl = document.getElementById('quizResult');
  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;">Your Score</p>
    <span class="quiz-result__score">${pct}%</span>
    <p class="quiz-result__msg">${msg}</p>
    <p style="color:rgba(255,255,255,0.6);margin-bottom:20px;">You got ${quizScore} out of ${quizData.length} questions correct</p>
    <button class="btn btn--primary" onclick="restartQuiz()">Try Again</button>`;
}

function restartQuiz() {
  quizIndex = 0;
  quizScore = 0;
  document.getElementById('quizResult').style.display = 'none';
  loadQuiz();
}

document.getElementById('quizNext').addEventListener('click', () => {
  quizIndex++;
  loadQuiz();
});

loadQuiz();

// ========== AI CHATBOT (Offline Smart Responses) ==========
const knowledgeBase = [
  {
    keywords: ['register','registration','sign up','enroll'],
    answer: `📝 To register to vote:\n\n1. Check you meet the eligibility requirements (age 18+, citizenship, residency)\n2. Visit your local election commission office OR register online at your government's official website\n3. Carry your ID proof and address proof\n4. Submit the form before the registration deadline\n\nIn India, you can register at voters.eci.gov.in using Form 6. Your Voter ID card will be mailed to you! 🗳️`
  },
  {
    keywords: ['eligibility','eligible','qualify','who can vote','requirements'],
    answer: `✅ Voting Eligibility Requirements:\n\n• Age: Must be 18 years or older\n• Citizenship: Must be a citizen of the country\n• Residency: Must reside in the constituency where you register\n• Mental competence: Must be of sound mind\n• Not disqualified: No certain criminal convictions\n\nOnce you meet these criteria, register and you're ready to vote! 🌟`
  },
  {
    keywords: ['how to vote','cast','ballot','polling','voting process','steps'],
    answer: `🗳️ How to Vote — Step by Step:\n\n1. ✅ Check your eligibility\n2. 📝 Register to vote before deadline\n3. 🏠 Find your assigned polling station\n4. 🪪 Bring your Voter ID card + photo ID\n5. ☑️ Go to polling station on election day\n6. 📋 Give your name, get your ballot\n7. 🔒 Mark your choice privately\n8. 📮 Submit your ballot\n\nYour vote is secret and secure! 💪`
  },
  {
    keywords: ['secret ballot','secret','privacy','anonymous'],
    answer: `🔒 Secret Ballot:\n\nA secret ballot means NO ONE can see how you voted — not the government, not your employer, not your family!\n\nThis protects you from:\n• Bribery or pressure\n• Retaliation for your vote\n• Coercion by powerful people\n\nYou vote alone in a private booth. Your ballot has no name on it. This is a fundamental democratic right! 🛡️`
  },
  {
    keywords: ['count','counting','result','declare','tally'],
    answer: `📊 How Votes Are Counted:\n\n1. Polling stations close at the designated time\n2. Ballot boxes are sealed and transported securely\n3. Counting begins under supervision of election officials\n4. Party representatives can observe the counting\n5. Results are tallied constituency by constituency\n6. Winning candidate is officially declared\n7. Results are published publicly\n\nThe entire process is transparent and monitored! 👁️`
  },
  {
    keywords: ['id','identification','document','carry','need','bring'],
    answer: `🪪 Documents Needed to Vote:\n\nYou typically need to bring:\n• Voter ID Card (most important!)\n• Any one of: Passport, Driving License, Aadhaar Card, PAN Card, Bank Passbook with photo\n\nIn India, the Election Commission accepts 12 alternative IDs if you don't have your Voter ID card.\n\nAlways check your local election commission's website for the exact list! ✅`
  },
  {
    keywords: ['polling station','polling booth','where','location','find'],
    answer: `🏠 Finding Your Polling Station:\n\n• Your Voter ID card has your polling station address printed on it\n• Check online: voters.eci.gov.in (India) or your country's election website\n• Call your local election commission helpline\n• Ask your local government office\n\nPolling stations are usually at schools, community halls, or government buildings near your home. They must be within 2km of your residence! 📍`
  },
  {
    keywords: ['moved','relocated','new address','changed address','different city'],
    answer: `🏡 If You Moved Recently:\n\nYou need to update your voter registration!\n\nIn India, submit Form 8A to transfer your registration to your new address, or Form 6 if you're registering fresh.\n\nImportant:\n• Update before the registration deadline\n• You can only vote where you are registered\n• If you haven't updated yet, you may need to travel to your old constituency this election\n\nDo it early to avoid last-minute problems! ⏰`
  },
  {
    keywords: ['proportional','representation','pr','system'],
    answer: `⚖️ Proportional Representation (PR):\n\nIn a PR system, seats in parliament are allocated based on the percentage of votes each party receives.\n\nExample: If Party A gets 40% of votes, they get roughly 40% of seats.\n\nCompare to "First Past the Post" where the candidate with most votes wins — even with just 35%!\n\nPR is used in: Germany, Netherlands, South Africa\nFirst Past the Post: India, UK, USA\n\nBoth systems have pros and cons! 🌍`
  },
  {
    keywords: ['blackout','silence period','campaign stop'],
    answer: `🔇 Campaign Blackout Period:\n\nThis is a period (usually 48 hours) before voting day when ALL campaigning must STOP.\n\nWhat's banned:\n• Political rallies and speeches\n• Advertisements (TV, radio, social media)\n• Distributing pamphlets\n• Any public canvassing\n\nWhy? To give voters peaceful time to make their final decision without pressure.\n\nViolating the blackout is a serious election offense! ⚖️`
  },
  {
    keywords: ['commission','election commission','eci','official','authority'],
    answer: `🏛️ The Election Commission:\n\nThe Election Commission is an INDEPENDENT body that:\n• Announces election dates\n• Maintains voter rolls\n• Enforces the Model Code of Conduct\n• Monitors campaigns for rule violations\n• Oversees the entire voting and counting process\n• Declares official results\n\nIn India, the Election Commission of India (ECI) is constitutionally independent — no political party can interfere with it. This ensures free and fair elections! 🇮🇳`
  },
  {
    keywords: ['evm','electronic voting machine','machine','digital vote'],
    answer: `🖥️ Electronic Voting Machines (EVMs):\n\nIndia uses EVMs instead of paper ballots. Here's how they work:\n\n1. The EVM shows all candidate names with their party symbols\n2. Press the button next to your chosen candidate\n3. A beep confirms your vote\n4. The VVPAT machine shows a paper slip for 7 seconds to verify\n\nEVMs are:\n• Not connected to internet (cannot be hacked remotely)\n• Sealed and tamper-evident\n• Verified before and after elections\n\nYour vote is safe! 🔒`
  },
  {
    keywords: ['hello','hi','hey','help','what can you','start'],
    answer: `👋 Hello! I'm your Election Education Assistant!\n\nI can help you understand:\n🗳️ How to register to vote\n📋 Step-by-step voting process\n🏠 Finding your polling station\n🔒 How secret ballots work\n📊 How votes are counted\n⚖️ Different voting systems\n📅 Election timelines\n\nJust ask me anything about elections! Try one of the suggested questions below. 😊`
  }
];

function getSmartResponse(userText) {
  const lower = userText.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some(k => lower.includes(k))) {
      return entry.answer;
    }
  }
  return `🤔 Great question! Here's what I know about elections:\n\nFor specific questions about "${userText}", I recommend:\n\n• 🇮🇳 India: voters.eci.gov.in or call 1950\n• 🌍 International: Your country's official Election Commission website\n\nMeanwhile, feel free to ask me about:\n• How to register to vote\n• Voting steps\n• What ID to bring\n• How votes are counted\n• Secret ballot system\n\nI'm here to help! 😊`;
}

const suggestedQuestions = [
  "How do I register to vote?",
  "What is a secret ballot?",
  "How are votes counted?",
  "What is proportional representation?",
  "Can I vote if I moved recently?",
  "What ID do I need to vote?"
];

const suggestedQsEl = document.getElementById('suggestedQs');
suggestedQuestions.forEach(q => {
  const btn = document.createElement('button');
  btn.className = 'suggested-q';
  btn.textContent = q;
  btn.addEventListener('click', () => sendChat(q));
  suggestedQsEl.appendChild(btn);
});

const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

let chatHistory = [];

function addMessage(text, isUser) {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${isUser ? 'chat-msg--user' : 'chat-msg--bot'}`;
  msg.innerHTML = `
    <div class="chat-avatar">${isUser ? '👤' : '🗳️'}</div>
    <div class="chat-bubble">${text.replace(/\n/g, '<br/>')}</div>`;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTyping() {
  const typing = document.createElement('div');
  typing.className = 'chat-msg chat-msg--bot';
  typing.id = 'typingIndicator';
  typing.innerHTML = `
    <div class="chat-avatar">🗳️</div>
    <div class="chat-typing"><span></span><span></span><span></span></div>`;
  chatWindow.appendChild(typing);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

async function sendChat(userText) {
  const text = userText || chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';
  addMessage(text, true);
  chatHistory.push({ role: 'user', content: text });
  showTyping();
  chatSend.disabled = true;

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory })
    });
    const data = await response.json();
    removeTyping();
    const reply = data.content?.map(c => c.text || '').join('')
      || "Sorry, I couldn't get a response. Please try again!";
    chatHistory.push({ role: 'assistant', content: reply });
    addMessage(reply, false);
  } catch (err) {
    removeTyping();
    const reply = getSmartResponse(text);
    chatHistory.push({ role: 'assistant', content: reply });
    addMessage(reply, false);
  } finally {
    chatSend.disabled = false;
  }
}

chatSend.addEventListener('click', () => sendChat());
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });

// ========== GLOSSARY DATA ==========
const glossaryData = [
  { term: "Ballot", def: "An official document or card used to cast a vote in an election, either on paper or electronically." },
  { term: "Candidate", def: "A person who seeks to be elected to a public office by competing in an election." },
  { term: "Constituency", def: "A defined geographic area whose residents elect one or more representatives to a governing body." },
  { term: "Democracy", def: "A system of government where citizens exercise power through free and fair elections." },
  { term: "Electoral Roll", def: "The official list of all registered voters eligible to vote in an election." },
  { term: "Exit Poll", def: "A survey of voters conducted immediately after they leave polling stations to predict election outcomes." },
  { term: "Franchise", def: "The legal right to vote in public elections, also known as suffrage." },
  { term: "Incumbent", def: "The current holder of a political office who is running for re-election." },
  { term: "Majority", def: "More than half of the total votes cast; required to win in many electoral systems." },
  { term: "Manifesto", def: "A published declaration of a political party's policies, intentions, and promises to voters." },
  { term: "Polling Station", def: "An official location designated for voters to cast their ballots on election day." },
  { term: "Proportional Representation", def: "An electoral system where seats are allocated to parties based on the share of votes they receive." },
  { term: "Referendum", def: "A direct public vote on a specific question or policy proposal rather than for candidates." },
  { term: "Suffrage", def: "The right to vote in political elections; universal suffrage means all citizens can vote." },
  { term: "Turnout", def: "The percentage of eligible voters who actually cast a ballot in a given election." },
  { term: "Swing Voter", def: "An undecided voter who could potentially vote for any party and significantly influences election outcomes." }
];

const glossaryGrid = document.getElementById('glossaryGrid');
glossaryData.forEach(item => {
  const card = document.createElement('div');
  card.className = 'glossary-card';
  card.innerHTML = `<div class="glossary-card__term">${item.term}</div><div class="glossary-card__def">${item.def}</div>`;
  glossaryGrid.appendChild(card);
  revealObserver.observe(card);
});

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile menu if open
    if (navLinks.style.display === 'flex') navLinks.style.display = 'none';
  });
});
