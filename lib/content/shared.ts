export const appConfig = {
  name: 'Conduet Academy',
  tagline: 'Level up, session by session',
  company: 'conduet°',
  internalOnly: true,
  footerNote: 'Internal use only',
  url: 'https://academy.conduet.com',
}

export const brand = {
  colours: {
    lavender: '#CEA4FF',
    lavenderDark: '#8B5CC8',
    lavenderPale: '#F0E6FF',
    offWhite: '#F1F1F2',
    teal: '#008278',
    tealLight: '#D6F0EE',
    coral: '#FF8C78',
    coralLight: '#FFF0ED',
    amber: '#FFCC50',
    amberLight: '#FFF8DC',
    dark: '#111111',
    darkCard: '#1C1C1C',
    gray: '#6B6B6B',
    grayLight: '#E4E4E5',
    pageBg: '#F6F6F6',
  },
}

export const sessions = [
  {
    id: '101',
    level: 'Crawl',
    title: 'Claude fundamentals',
    colour: '#CEA4FF',
    textOnColour: '#111111',
    code: 'CRAWL-101',
    unlockedByDefault: true,
    tabs: [
      { id: 'field-guide', label: 'Field guide' },
      { id: 'prompts', label: 'Prompts' },
      { id: 'best-practices', label: 'Best practices' },
      { id: 'micro-hacks', label: 'Micro hacks' },
      { id: 'advanced', label: 'Advanced moves' },
    ],
    preview: [
      'The four-ingredient prompt formula',
      'Context is king — what to paste',
      '5 power moves for this week',
      'Trust rules: use freely vs verify first',
      '15 copy-paste prompts',
    ],
  },
  {
    id: '201',
    level: 'Walk',
    title: 'Efficiency & automation with Cowork',
    colour: '#008278',
    textOnColour: '#FFFFFF',
    code: 'WALK-201',
    unlockedByDefault: false,
    tabs: [
      { id: 'field-guide', label: 'Field guide' },
      { id: 'workflow-library', label: 'Workflow library' },
      { id: 'cowork-setup', label: 'Cowork setup' },
      { id: 'connector-guide', label: 'Connector guide' },
    ],
    preview: [
      'Cowork: Claude reads your actual files',
      'Pre-built workflow templates',
      'Step-by-step Cowork setup',
      'Connect Slack, Drive, Notion, Linear',
    ],
  },
  {
    id: '301',
    level: 'Run',
    title: 'Claude Code & prototypes',
    colour: '#FF8C78',
    textOnColour: '#FFFFFF',
    code: 'RUN-301',
    unlockedByDefault: false,
    tabs: [
      { id: 'field-guide', label: 'Field guide' },
      { id: 'prototype-templates', label: 'Prototype templates' },
      { id: 'claude-code-setup', label: 'Claude Code setup' },
      { id: 'team-rollout', label: 'Team rollout' },
    ],
    preview: [
      'Claude Code for non-technical builders',
      '5 prototype starter templates',
      'Non-technical setup guide',
      'Team governance & rollout playbook',
    ],
  },
]

export const promptCategories = [
  { id: 'all', label: 'All prompts' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'communication', label: 'Communication' },
  { id: 'research', label: 'Research' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'specialist', label: 'Specialist' },
]

export const promptRoles = [
  { id: 'all', label: 'All roles' },
  { id: 'general', label: 'General' },
  { id: 'pm', label: 'PM' },
  { id: 'ops', label: 'Ops' },
  { id: 'sales', label: 'Sales' },
]

export const glossary = [
  {
    term: 'Prompt',
    colour: '#CEA4FF',
    definition: 'The instruction you give Claude. Better prompts = better outputs. Always improvable.',
  },
  {
    term: 'Context window',
    colour: '#008278',
    definition: "How much Claude can 'see' at once. Long threads fill it up. Use /clear to reset.",
  },
  {
    term: 'Thread',
    colour: '#FF8C78',
    definition: 'A running conversation. Keep one per project so context compounds.',
  },
  {
    term: 'Role',
    colour: '#FFCC50',
    definition: "Telling Claude who to be. 'Act as a senior X' lifts every output immediately.",
  },
  {
    term: 'Iteration',
    colour: '#CEA4FF',
    definition: 'Refining the output with follow-up prompts. Never accept draft one.',
  },
  {
    term: 'CLAUDE.md',
    colour: '#008278',
    definition: 'A text file Claude reads at session start. Your permanent context file.',
  },
  {
    term: 'Project',
    colour: '#FF8C78',
    definition: 'A saved workspace on claude.ai. Upload docs once. Every chat inherits them.',
  },
  {
    term: 'Cowork',
    colour: '#FFCC50',
    definition: 'Desktop app. Reads your actual files — Word, Excel, PDF. No uploading needed.',
  },
  {
    term: 'Connectors',
    colour: '#CEA4FF',
    definition: 'Integrations with Slack, Drive, Notion etc. Connect once, searchable everywhere.',
  },
  {
    term: 'Sycophancy',
    colour: '#008278',
    definition: 'Claude agreeing with you too easily. Fix: ask it to argue against your idea first.',
  },
  {
    term: 'Claude Code',
    colour: '#FF8C78',
    definition: 'Terminal agent that reads your codebase and ships working code. Session 301.',
  },
  {
    term: 'MCP',
    colour: '#FFCC50',
    definition: 'Model Context Protocol. How Claude connects to external tools and data sources.',
  },
  {
    term: 'Context fill',
    colour: '#CEA4FF',
    definition: 'How full the context window is. At ~60% Claude starts losing early instructions.',
  },
  {
    term: '/clear',
    colour: '#008278',
    definition: 'Command to reset the context window. Use between unrelated tasks.',
  },
  {
    term: 'Hallucination',
    colour: '#FF8C78',
    definition: 'When Claude produces confident-sounding wrong information. Always verify facts.',
  },
]

export const resources = [
  {
    name: 'claude.ai',
    description: 'The main interface. Start every session here.',
    url: 'https://claude.ai',
    colour: '#CEA4FF',
  },
  {
    name: 'Claude Cowork',
    description: 'Desktop app. Reads Word, Excel, PDF files directly.',
    url: 'https://claude.ai/download',
    colour: '#008278',
  },
  {
    name: 'Claude Code',
    description: 'Terminal agent. Reads codebase. Writes and ships code.',
    url: 'https://docs.anthropic.com/claude-code',
    colour: '#FF8C78',
  },
  {
    name: 'Claude Projects',
    description: 'Saved workspaces on claude.ai. Upload docs once. Every chat inherits.',
    url: 'https://claude.ai',
    colour: '#FFCC50',
  },
  {
    name: 'Anthropic docs',
    description: 'Full reference and prompt engineering guide.',
    url: 'https://docs.anthropic.com',
    colour: '#CEA4FF',
  },
  {
    name: 'Whisperflow',
    description: 'Voice-to-Claude. Dictate instead of type.',
    url: 'https://whisperflow.app',
    colour: '#008278',
  },
]

export const nav = [
  { label: 'Hub', href: '/' },
  { label: '101', href: '/session/101' },
  { label: '201', href: '/session/201' },
  { label: '301', href: '/session/301' },
  { label: 'Prompts', href: '/prompts' },
  { label: 'Glossary', href: '/glossary' },
]

export const copy = {
  unlock: {
    lockedLabel: 'Locked',
    unlockCta: 'Enter code to unlock',
    modalBody: 'Enter the code shown on the closing slide of your session.',
    inputPlaceholder: 'e.g. WALK-201',
    submitLabel: 'Unlock',
    errorMessage: 'Invalid code. Check with your session facilitator.',
  },
  prompts: {
    copyLabel: 'Copy prompt',
    copiedLabel: 'Copied!',
    searchPlaceholder: 'Search prompts...',
    emptyState: 'No prompts match your filters.',
  },
  sessions: {
    comingSoon: 'Content coming after your next session',
  },
}
