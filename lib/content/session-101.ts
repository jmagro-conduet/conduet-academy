export const session101Meta = {
  id: '101',
  title: 'Crawl',
  subtitle: 'Claude fundamentals',
  colour: '#CEA4FF',
  code: 'CRAWL-101',
  unlockedByDefault: true,
}

// ─── Field Guide ──────────────────────────────────────────────────────────────

export const fieldGuide101 = {
  section1: {
    heading: 'Most people use Claude like a smarter search engine.',
    subheading: 'The gap between that and power use is not skill. It\'s habit.',
    comparison: [
      { left: 'Ask one question', right: 'Give role + context + task + constraints' },
      { left: 'Accept the first output', right: 'Iterate: "Shorter. More direct. Less jargon."' },
      { left: 'Start fresh every time', right: 'Same thread — context compounds over time' },
      { left: 'Use it to draft emails', right: 'Use it to think: decisions, trade-offs, plans' },
      { left: 'Describe the document', right: 'Paste the raw document — give it everything' },
    ],
  },
  section2: {
    heading: 'The Four-Ingredient Prompt',
    intro: 'A great prompt has four ingredients. Together they cut bad outputs in half.',
    formula: 'Role + Context + Task + Constraints = A prompt that actually works',
    ingredients: [
      {
        number: 1,
        name: 'Role',
        colour: '#CEA4FF',
        description: 'Who Claude should be',
        example: '"Act as a senior ops lead with iGaming experience."',
      },
      {
        number: 2,
        name: 'Context',
        colour: '#008278',
        description: 'What is happening right now',
        example: '"We are onboarding 3 new operators this quarter."',
      },
      {
        number: 3,
        name: 'Task',
        colour: '#FF8C78',
        description: 'Exactly what you need',
        example: '"Draft a 2-paragraph welcome email for each."',
      },
      {
        number: 4,
        name: 'Constraints',
        colour: '#FFCC50',
        description: 'Guardrails, tone, format, length',
        example: '"Warm but professional. Max 120 words. No jargon."',
      },
    ],
  },
  section3: {
    heading: 'Context is king',
    subheading: 'The faster you give Claude the full picture, the faster you get something useful.',
    pullQuote: '"Most people describe. Power users paste."',
    body: 'Every time you summarise your situation for Claude, you\'re losing signal. The raw material — the actual doc, the real email, the live data — is always better than your description of it. Give it everything. Let it extract.',
    contextTypes: [
      { type: 'Documents', examples: 'Word docs · PDFs · Google Docs · slide decks', colour: '#CEA4FF' },
      { type: 'Data', examples: 'Excel files · CSVs · pasted tables · raw numbers', colour: '#008278' },
      { type: 'Code', examples: 'Source files · scripts · config files · error logs', colour: '#FF8C78' },
      { type: 'Conversations', examples: 'Copy-pasted emails · Slack threads · meeting notes', colour: '#FFCC50' },
      { type: 'Research', examples: 'Webpages · articles · competitor content · reports', colour: '#CEA4FF' },
      { type: 'Your own writing', examples: 'Rough drafts · bullet notes · voice-to-text transcripts', colour: '#008278' },
    ],
  },
  section4: {
    heading: 'From one-off to always-on',
    subheading: 'Context compounds. The more you invest up front, the faster every future conversation moves.',
    levels: [
      {
        level: 1,
        name: 'One-off prompts',
        colour: '#6B6B6B',
        description: 'Claude starts fresh every session. You re-explain your role, your company, your context every single time. It\'s capable but amnesiac.',
        speed: 'Slow',
        label: 'Where most people live today',
      },
      {
        level: 2,
        name: 'Threads & Projects',
        colour: '#008278',
        description: 'Keep a thread per project. Upload your brief, OKRs, and brand guide to a Project on claude.ai. Every chat inside inherits all of it — no re-explaining.',
        speed: 'Fast',
        label: 'What we cover in 201',
      },
      {
        level: 3,
        name: 'CLAUDE.md always-on',
        colour: '#CEA4FF',
        description: 'A plain text file Claude reads at the start of every session: your role, your product, your tone, your constraints. Drop it in your Cowork folder. Your context, permanently installed.',
        speed: 'Instant',
        label: 'The power user endgame',
      },
    ],
  },
  section5: {
    heading: '5 power moves for this week',
    intro: 'Not tips. Habits. Pick one and run it every day this week.',
    moves: [
      {
        number: 1,
        colour: '#CEA4FF',
        title: 'Ask Claude to ask YOU questions first',
        body: 'End every prompt with: "Before you start, ask me clarifying questions. Then wait for my answers before writing." Claude surfaces gaps you didn\'t know existed. Bad outputs cut in half.',
      },
      {
        number: 2,
        colour: '#008278',
        title: 'Run threads, not one-offs',
        body: "Don't start fresh for every task. Keep a thread per project. Same thread = Claude holds all context. By message 10 it knows your operators, tone, and constraints without you repeating anything.",
      },
      {
        number: 3,
        colour: '#FF8C78',
        title: 'Assign a role every single time',
        body: '"Act as a senior [X]" changes everything — tone, depth, what gets flagged. This single habit moves outputs from generic to specialist-quality. Always do it.',
      },
      {
        number: 4,
        colour: '#FFCC50',
        title: 'Paste raw material — never describe it',
        body: "Got a doc, email, report, or data set? Paste it in directly. Don't summarise it for Claude first. Summaries lose signal. Give it everything.",
      },
      {
        number: 5,
        colour: '#CEA4FF',
        title: 'Iterate — never accept draft one',
        body: '"Make it 30% shorter." "Remove the corporate speak." "What am I missing?" One well-placed follow-up is worth ten new prompts. The best outputs are always at least two rounds in.',
      },
    ],
  },
  section6: {
    heading: 'Trust rules (non-negotiable)',
    useFreelyItems: [
      'Internal brainstorming and ideation',
      'First drafts you will review before sharing',
      'Summarising content you already understand',
      'Rephrasing, restructuring, formatting text',
      'Any output that stays internal or gets checked',
    ],
    verifyFirstItems: [
      'Any statistic, figure, percentage, or date',
      'Legal, regulatory, or compliance statements',
      'Anything going to a client, exec, or board',
      'Technical claims outside your own domain',
      'Quotes attributed to real people',
    ],
    analogy: 'Treat Claude like a brilliant new hire. Fast, capable, sometimes confidently wrong. You would check their work on anything important. Verification is good practice — not distrust.',
  },
}

// ─── Prompts ──────────────────────────────────────────────────────────────────

export const prompts101 = [
  {
    id: 'p101-01',
    title: 'Summarise a doc',
    category: 'analysis',
    role: 'general',
    session: '101',
    description: 'Turn any long document into a crisp exec-ready summary.',
    prompt: `You are a senior analyst. I am pasting our Q3 operator report below.
Summarise in 5 bullets. Flag any risks or items that need a decision.
Plain English. No jargon.

[paste document here]`,
    outcome: '→ Instant exec-ready summary',
  },
  {
    id: 'p101-02',
    title: 'Map a decision',
    category: 'analysis',
    role: 'general',
    session: '101',
    description: 'Structured pros/cons plus a clear recommendation.',
    prompt: `Act as a strategic advisor. We are choosing between two support vendors.
Give me a pros/cons table, then your recommendation with a one-line rationale.

Vendor A: [describe]
Vendor B: [describe]`,
    outcome: '→ Structured thinking in 30 seconds',
  },
  {
    id: 'p101-03',
    title: 'Draft urgent comms',
    category: 'communication',
    role: 'general',
    session: '101',
    description: 'Empathetic, professional operator communication under pressure.',
    prompt: `You are a senior comms lead. We had a 4-hour platform outage last night
affecting 3 operators. Draft the email: empathetic, factual, under 200 words, no jargon.

What happened: [brief description]
Resolution: [what was done]
Next steps: [what we're doing to prevent recurrence]`,
    outcome: '→ Client-ready in one pass',
  },
  {
    id: 'p101-04',
    title: "Iterate — don't restart",
    category: 'communication',
    role: 'general',
    session: '101',
    description: 'The power move: refine an existing output instead of starting over.',
    prompt: `That is good. Now make it 30% shorter.
Remove anything that sounds like corporate speak.
Be more direct. Cut any sentence that doesn't add new information.`,
    outcome: '→ Power move: refine, never start over',
  },
  {
    id: 'p101-05',
    title: 'Write a LinkedIn post',
    category: 'communication',
    role: 'general',
    session: '101',
    description: 'Turn a rough idea into a post that sounds like you.',
    prompt: `Here is a rough idea I want to share:

[paste your rough idea or bullet points]

Turn this into a LinkedIn post. My voice: direct, no fluff, no hashtag spam.
Under 200 words. First line must hook — no starting with "I".`,
    outcome: '→ On-brand post, no cringe',
  },
  {
    id: 'p101-06',
    title: 'Deep research brief',
    category: 'research',
    role: 'general',
    session: '101',
    description: 'Condensed competitive or market intelligence in minutes.',
    prompt: `Research the top 5 competitors in iGaming support AI.
For each: name, what they do, pricing model (if known), funding stage, and one thing that makes them dangerous.
Bullet format. Flag anything surprising.`,
    outcome: '→ Condensed competitive briefing',
  },
  {
    id: 'p101-07',
    title: 'Prep for an upcoming meeting',
    category: 'research',
    role: 'general',
    session: '101',
    description: 'Walk into any meeting prepared with the right questions.',
    prompt: `My meeting tomorrow is with [name / company / role].

Here is what I know about them and the agenda: [paste]

What should I ask? What should I know going in?
What are they likely to want from this meeting?
What is my strongest play?`,
    outcome: '→ Walk in prepared',
  },
  {
    id: 'p101-08',
    title: 'Personal assistant triage',
    category: 'productivity',
    role: 'general',
    session: '101',
    description: 'Clear your inbox and get drafted replies in one pass.',
    prompt: `Here are my emails from this morning:

[paste emails]

Triage them: what needs a response today, what can wait, what can be deleted.
Draft replies for the top 3 that need responses. Match my tone: direct, warm, brief.`,
    outcome: '→ Inbox under control',
  },
  {
    id: 'p101-09',
    title: 'Convert a rough doc',
    category: 'productivity',
    role: 'general',
    session: '101',
    description: 'Transform rough notes into a clean, professional document.',
    prompt: `Here is a rough doc:

[paste rough notes or draft]

Turn it into a clean one-pager with sections, headers, and bullet points.
Professional tone. No fluff. Cut anything that doesn't earn its place.`,
    outcome: '→ Polished deliverable',
  },
  {
    id: 'p101-10',
    title: 'Plan a project',
    category: 'productivity',
    role: 'general',
    session: '101',
    description: 'Build an OKR or project plan structure in minutes.',
    prompt: `Give me an OKR structure for our support team next quarter.
3 objectives, 3 key results each.

Context and goals: [paste or describe]

Make the KRs specific and measurable. No vague language.`,
    outcome: '→ Ready-to-run plan',
  },
  {
    id: 'p101-11',
    title: 'PM — Write a PRD',
    category: 'specialist',
    role: 'pm',
    session: '101',
    description: 'A properly structured product requirements document from a brief description.',
    prompt: `Write a PRD for this feature:

[describe the feature]

Include: problem statement, goals, non-goals, user stories, success metrics, and open questions.
Use standard PRD format. Be specific. No filler.`,
    outcome: '→ Spec-ready in minutes',
  },
  {
    id: 'p101-12',
    title: 'PM — Stress-test assumptions',
    category: 'specialist',
    role: 'pm',
    session: '101',
    description: 'Surface the hidden risks in any product or strategic plan.',
    prompt: `Here is our product plan:

[paste plan]

What assumptions are we making that we have not validated?
Rank them by risk — which ones, if wrong, would kill this plan?
What would you need to see to validate each one?`,
    outcome: '→ Hidden risks surfaced',
  },
  {
    id: 'p101-13',
    title: 'Sales — Cold outreach',
    category: 'specialist',
    role: 'sales',
    session: '101',
    description: 'Personalised, under-100-word cold email with a clear ask.',
    prompt: `Write a cold outreach email to a [role] at a [type of company].

Context about them: [paste LinkedIn, website, or what you know]
What I want from this email: [one clear ask]
My company and what we do: [brief description]

Under 100 words. Personalised first line. No buzzwords. Clear single CTA.`,
    outcome: '→ First draft to send',
  },
  {
    id: 'p101-14',
    title: 'Ops — Build an SOP',
    category: 'specialist',
    role: 'ops',
    session: '101',
    description: 'Turn rough notes into a runnable standard operating procedure.',
    prompt: `Turn these rough notes into a proper SOP:

[paste notes]

Format: numbered steps, owner for each step, frequency, inputs needed, expected output, and what good looks like.
Write it so someone new could follow it on day one.`,
    outcome: '→ Runnable process doc',
  },
  {
    id: 'p101-15',
    title: 'Force Claude to ask you questions first',
    category: 'analysis',
    role: 'general',
    session: '101',
    description: 'The single habit that eliminates most bad first drafts.',
    prompt: `[Your task or brief here]

Before you start writing, ask me any clarifying questions you need to do this well.
List them all at once. Then wait for my answers before you begin.`,
    outcome: '→ No bad first drafts',
  },
  {
    id: 'p101-16',
    title: 'Ops — Escalation matrix',
    category: 'specialist',
    role: 'ops',
    session: '101',
    description: 'Build a clear, tiered escalation matrix for any operational function.',
    prompt: `You are a senior ops lead. Build an escalation matrix for our [function: e.g. operator support / compliance / technical incidents].

Three tiers. For each tier include:
- Trigger conditions (what makes something a Tier X issue)
- Who gets notified and when
- Response time target
- Owner who resolves it
- What "resolved" looks like

Make it table format. Clear enough for a new hire to follow on day one.

Context about our team: [describe team size, geography, hours of operation]`,
    outcome: '→ Runnable escalation matrix',
  },
  {
    id: 'p101-17',
    title: 'Ops — Onboarding checklist',
    category: 'specialist',
    role: 'ops',
    session: '101',
    description: 'Generate a structured onboarding checklist for a new operator or team member.',
    prompt: `You are a senior ops manager. Build a 30-60-90 day onboarding checklist for [a new operator / a new team member joining our ops function].

For each phase:
- Key milestones to hit
- Systems and tools to get access to
- People to meet and why
- Documents to read
- What "ready" looks like at the end of this phase

What they are onboarding into: [describe role, team, product, or operator type]`,
    outcome: '→ Structured 30-60-90 plan',
  },
  {
    id: 'p101-18',
    title: 'Ops — Incident runbook',
    category: 'specialist',
    role: 'ops',
    session: '101',
    description: 'Document a repeatable incident response process from detection to resolution.',
    prompt: `Write an incident runbook for the following scenario:

Incident type: [e.g. platform outage / data discrepancy / failed operator payout]

Include:
1. Detection — how we know this is happening
2. Immediate response steps (first 15 minutes)
3. Stakeholder communication (who to tell, in what order, what to say)
4. Investigation steps
5. Resolution criteria — how we know it's fixed
6. Post-incident review checklist

Write it so the on-call person can follow it at 2am without calling anyone.`,
    outcome: '→ Ready-to-run incident playbook',
  },
  {
    id: 'p101-19',
    title: 'Meeting agenda builder',
    category: 'productivity',
    role: 'general',
    session: '101',
    description: 'Generate a tight, purposeful agenda from a rough set of topics.',
    prompt: `Build a meeting agenda for a [type] meeting with [audience].

Duration: [e.g. 45 minutes]
Goal of this meeting: [what decision needs to be made or what outcome are we driving]
Topics I want to cover: [list them roughly]

Format each agenda item with: time allocation, owner, and whether it's a discussion, decision, or update.
Add a 5-minute buffer at the end. Start with the most important item, not logistics.`,
    outcome: '→ Purposeful agenda, no wasted time',
  },
  {
    id: 'p101-20',
    title: 'Weekly status report',
    category: 'productivity',
    role: 'general',
    session: '101',
    description: 'Draft your weekly status update in under a minute from bullet notes.',
    prompt: `Turn these rough notes into a polished weekly status report:

[paste your bullet notes from the week]

Format:
- Wins this week (2–3 bullets)
- In progress (with % complete or next action)
- Blockers (if any, with who owns the unblock)
- Focus next week (top 3 priorities)

Audience: [manager / leadership / team]. Tone: direct and factual. No padding.`,
    outcome: '→ Status report in 60 seconds',
  },
  {
    id: 'p101-21',
    title: 'Rewrite for clarity',
    category: 'communication',
    role: 'general',
    session: '101',
    description: 'Take a dense or unclear piece of writing and make it instantly readable.',
    prompt: `Rewrite the following for maximum clarity:

[paste your text]

Rules:
- Cut it by at least 25%
- Use plain English — no jargon
- One idea per sentence
- Active voice throughout
- Keep all the meaning, lose all the noise`,
    outcome: '→ Clear, tight writing in seconds',
  },
  {
    id: 'p101-22',
    title: 'Decision log entry',
    category: 'productivity',
    role: 'general',
    session: '101',
    description: 'Document a decision with full context, rationale, and alternatives considered.',
    prompt: `Write a decision log entry for the following:

Decision made: [what was decided]
Date: [today's date]
Decision maker(s): [names or roles]

Fill in these fields:
- Problem or question we were solving
- Options we considered (at least 2)
- Key factors in the decision
- Risks we accepted
- What would cause us to revisit this decision

Write it so someone reading this in 6 months can understand why we did this without asking anyone.`,
    outcome: '→ Permanent decision record',
  },
  {
    id: 'p101-23',
    title: 'Sales — Discovery call prep',
    category: 'specialist',
    role: 'sales',
    session: '101',
    description: 'Prepare strong discovery questions and a clear read of the prospect before any sales call.',
    prompt: `I have a discovery call with [prospect name / role / company] tomorrow.

Here is what I know about them: [paste LinkedIn, website, or notes]

Prepare:
1. Their most likely pain points (based on what you know about [their industry/role])
2. Five high-quality discovery questions that surface whether we're a good fit
3. The objection I'm most likely to hear and how to handle it
4. The one thing I should not walk out of this call without learning

What we sell: [brief description]`,
    outcome: '→ Walk in with the right questions',
  },
  {
    id: 'p101-24',
    title: 'PM — Sprint retrospective',
    category: 'specialist',
    role: 'pm',
    session: '101',
    description: 'Synthesise raw retro notes into clear findings and actionable next steps.',
    prompt: `Here are the raw notes from our sprint retrospective:

[paste notes or Miro board output]

Synthesise into:
1. Top 3 things that went well (and why they worked)
2. Top 3 things that didn't (root cause, not just symptoms)
3. One process change to make in the next sprint
4. Any themes that have shown up in more than one retro (flag these)

Be direct. Avoid generic advice. If something is unclear in the notes, flag it as a question.`,
    outcome: '→ Retro insights with real actions',
  },
  {
    id: 'p101-25',
    title: 'Vendor evaluation scorecard',
    category: 'analysis',
    role: 'ops',
    session: '101',
    description: 'Build a weighted scorecard to compare vendors objectively.',
    prompt: `Build a weighted vendor evaluation scorecard for selecting a [type of vendor: e.g. payment provider / support tool / data warehouse].

Include 8–10 evaluation criteria relevant to this vendor type. For each criterion:
- Weight (1–5, where 5 = most critical to our decision)
- Description of what "1 out of 5" vs "5 out of 5" looks like for this criterion
- Where to find the information to score it

Leave the vendor scores blank — I will fill those in.

Our priorities for this decision: [describe what matters most — e.g. cost, compliance, speed of integration]`,
    outcome: '→ Objective vendor comparison framework',
  },
  {
    id: 'p101-26',
    title: 'Extract action items from a meeting',
    category: 'productivity',
    role: 'general',
    session: '101',
    description: 'Turn messy meeting notes into a clean list of owners and deadlines.',
    prompt: `Here are my notes from a meeting:

[paste meeting notes or transcript]

Extract all action items. For each one:
- What needs to happen
- Who owns it (name or role if mentioned)
- Deadline (explicit if stated, or "TBD" if not)
- Any dependency blocking it

List them as a table. Flag any action items where the owner is unclear.`,
    outcome: '→ Clean action list with owners',
  },
  {
    id: 'p101-27',
    title: 'Risk register entry',
    category: 'analysis',
    role: 'ops',
    session: '101',
    description: 'Document a risk with likelihood, impact, and a concrete mitigation plan.',
    prompt: `Write a risk register entry for the following risk:

Risk description: [describe the risk]
Project or area it relates to: [context]

Complete these fields:
- Risk category (operational / financial / compliance / reputational / technical)
- Likelihood (1–5 with brief rationale)
- Impact if it materialises (1–5 with brief rationale)
- Risk score (likelihood × impact)
- Current mitigation in place (if any)
- Proposed additional mitigation
- Owner
- Review date

Be specific and honest — do not soften the impact assessment.`,
    outcome: '→ Risk register-ready entry',
  },
  {
    id: 'p101-28',
    title: 'Summarise a Slack thread',
    category: 'productivity',
    role: 'general',
    session: '101',
    description: 'Extract decisions, open questions, and next steps from a messy Slack thread.',
    prompt: `Here is a Slack thread:

[paste the thread]

Give me:
1. What was decided (if anything)
2. What is still unresolved or being debated
3. Action items with owners (if named)
4. One-sentence summary of the thread for someone who wasn't in it

Flag anything that looks like it needs a decision from someone senior.`,
    outcome: '→ Thread clarity in 10 seconds',
  },
]

// ─── Best Practices ───────────────────────────────────────────────────────────

export const bestPractices101 = [
  {
    number: 1,
    title: 'Connect everything',
    colour: '#CEA4FF',
    actionTag: 'Settings → Connectors → Add',
    body: 'Go to Settings → Connectors. Link Slack, Google Drive, Notion, Linear — and more. Once connected, Claude can search your Docs, pull from Notion, reference your Slack threads. Your tools become one brain. Connect once, searchable everywhere.',
  },
  {
    number: 2,
    title: 'Work in Projects, not chats',
    colour: '#008278',
    actionTag: 'claude.ai → New Project → Upload your docs',
    body: 'Projects on claude.ai save your context permanently. Upload your brief, your brand guide, your OKRs — once. Every chat inside that Project already knows the rules. Stop re-explaining yourself every session. One upload, every conversation benefits.',
  },
  {
    number: 3,
    title: 'Build your CLAUDE.md file',
    colour: '#FF8C78',
    actionTag: 'Create CLAUDE.md → Add to Cowork folder',
    body: 'A plain text file that tells Claude who you are, what you\'re building, your tone preferences, and what to never do. Drop it in your Cowork folder. Claude reads it before every session. Your context, installed permanently — no re-explaining ever again.',
    template: `I am a [role] at [company].
We build [what the product is].
My tone: [direct / warm / formal — pick one].
Never use jargon without defining it.
Always ask clarifying questions before writing anything long.
Things I care about: [list your priorities].`,
  },
  {
    number: 4,
    title: 'Define what you spend the most time on',
    colour: '#FFCC50',
    actionTag: 'List top 5 time sinks → build a prompt for each',
    body: "Make a list of your 5 most time-consuming recurring tasks. That is your automation roadmap. Start with the one that costs you the most time per week. Build a saved prompt for it. Refine it once. Run it forever. Prompts are assets — treat them that way.",
  },
  {
    number: 5,
    title: 'Build a personal style file',
    colour: '#008278',
    actionTag: 'Create style.md → Add to CLAUDE.md or Project',
    body: "Your CLAUDE.md covers your role and company. A personal style file covers how you communicate. Add a section — or a separate file — that captures your writing voice: preferred length, words you never use, phrases that are very you, level of formality. Paste in examples of your best writing. Claude will match your tone instead of producing generic professional text. The goal is output that sounds like you wrote it, not like it was AI-generated.",
    template: `## My writing style
Tone: [direct / warm / formal — pick one and describe it]
Sentence length: [short and punchy / moderate / detailed]
Things I never say: [list corporate jargon you hate]
Words I use a lot: [optional — helps with voice matching]
Example of writing I'm proud of:
[paste 2–3 sentences or a short paragraph]`,
  },
]

// ─── Micro Hacks ──────────────────────────────────────────────────────────────

export const microHacks101 = [
  {
    number: 1,
    title: 'Just talk to it',
    colour: '#008278',
    body: "Stop typing long structured prompts for simple tasks. Open Claude and speak naturally — or use a voice-to-text tool like Whisperflow to dictate directly into the chat. Say \"Help me think through this problem\" and go from there. The bar is much lower than you think. Conversation is a valid prompt format.",
    tool: { name: 'Whisperflow', url: 'https://whisperflow.app', description: 'voice-to-Claude on Mac' },
  },
  {
    number: 2,
    title: 'Use /clear between tasks',
    colour: '#CEA4FF',
    body: "After around 60% context fill, Claude quietly loses track of earlier instructions and constraints. You won't always notice — the outputs just get slightly worse. Fix it: type /clear between unrelated tasks to reset the context window. Think of it like closing browser tabs you don't need. Your prompts stay sharp.",
  },
  {
    number: 3,
    title: 'Save your best prompts',
    colour: '#FF8C78',
    body: 'Every great prompt you write is a reusable asset. Keep a running doc — a Notion page, a Google Doc, anything — and paste in anything that worked well. Over time you build a personal prompt library. Takes 10 seconds per prompt. Saves hours per month. The best teams share their prompt libraries.',
  },
  {
    number: 4,
    title: 'The 3-second role habit',
    colour: '#FFCC50',
    body: 'Before every prompt, add three words: "Act as a senior [X]." That\'s it. "Act as a senior analyst." "Act as a senior comms lead." "Act as a senior ops manager." It costs you nothing and lifts the quality of every output immediately. Make it automatic.',
  },
]

// ─── Advanced Moves ───────────────────────────────────────────────────────────

export const advancedMoves101 = [
  {
    number: 1,
    colour: '#CEA4FF',
    title: 'Force Claude to ask you questions first',
    body: 'End every prompt with: "Do not start writing yet. First, ask me any clarifying questions you need to do this well. Then wait for my answers." Claude surfaces the gaps you didn\'t know existed. You fill them in. It writes once. Almost no rewrites needed after this.',
  },
  {
    number: 2,
    colour: '#008278',
    title: 'The two-prompt pattern',
    body: 'Prompt 1: "What signals in this data are small today but growing fast?" — shows you the fire. Prompt 2: "What should I actually do about each of those?" — turns signal into action. Almost nobody does the second prompt. The first gets shared in the meeting. The second is where the leverage is.',
  },
  {
    number: 3,
    colour: '#FF8C78',
    title: 'Beat the sycophancy problem',
    body: 'Claude agrees with you too easily. Fix it permanently: add to every major prompt — "Before you give your final recommendation, make the strongest possible case for the options we are about to reject. Then give your recommendation." Forces genuine challenge, not just agreement.',
  },
  {
    number: 4,
    colour: '#FFCC50',
    title: 'Stack roles for complex outputs',
    body: 'Give Claude multiple reviewers in one prompt: "You are a senior engineer reviewing for technical risk, a CFO reviewing for cost assumptions, and a Day-1 user reviewing for clarity. Review this through all three lenses and give me the most important objection from each." Three expert perspectives in one pass.',
  },
  {
    number: 5,
    colour: '#CEA4FF',
    title: 'The /clear command',
    body: "After around 60% context fill, Claude's quality drops — it starts losing track of earlier constraints. Run /clear between unrelated tasks to reset the context window. Think of it like closing browser tabs you don't need. Your instructions stay fresh.",
  },
  {
    number: 6,
    colour: '#008278',
    title: 'Paste everything — build on one thread',
    body: "The real power users paste everything — meeting notes, Slack threads, competitor pages, raw data — and run a sequence of prompts in one thread. Each prompt builds on the last. By the end of the thread Claude knows more about your problem than most colleagues. Don't start fresh. Compound.",
  },
]
