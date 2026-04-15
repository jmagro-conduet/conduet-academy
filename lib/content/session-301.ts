export const session301Meta = {
  id: '301',
  title: 'Run',
  subtitle: 'Claude Code & prototypes',
  colour: '#FF8C78',
  code: 'RUN-301',
  unlockedByDefault: false,
}

export const tabs301 = [
  {
    id: 'field-guide',
    label: 'Field guide',
    placeholder: {
      title: 'The 301 Field Guide',
      description: 'The shift from using Claude to building with Claude. What non-technical people can actually build — and how. Content coming after your 301 session.',
      teaser: [
        'The 301 gap — system builders vs tool users',
        'What Claude Code actually does (non-technical explainer)',
        'What you can realistically build without coding experience',
        'Five run-phase power moves',
      ],
    },
  },
  {
    id: 'prototype-templates',
    label: 'Prototype templates',
    placeholder: {
      title: '5 Prototype Starter Templates',
      description: 'Pre-built starting points for the most common business prototypes. Each includes a complexity rating, time estimate, and full setup prompt.',
      teaser: [
        'Weekly report generator',
        'Internal dashboard from a spreadsheet',
        'Form → spreadsheet collector',
        'Competitor tracker',
        'Document processing pipeline',
      ],
    },
  },
  {
    id: 'claude-code-setup',
    label: 'Claude Code setup',
    placeholder: {
      title: 'Claude Code Setup Guide',
      description: 'A non-technical, step-by-step guide to installing and running Claude Code — the terminal agent that writes and ships code.',
      teaser: [
        'Install Node.js (with screenshots)',
        'Install Claude Code and authenticate',
        'Run your first session',
        'Write your first CLAUDE.md',
        'Run your first real task',
      ],
    },
  },
  {
    id: 'team-rollout',
    label: 'Team rollout',
    placeholder: {
      title: 'Team Governance & Rollout Playbook',
      description: 'A framework for rolling Claude out to a broader team responsibly — with guardrails, sequencing, and a 90-day success checklist.',
      teaser: [
        'Before you roll out — what to define first',
        'The rollout sequence — start small, expand when proven',
        'Governance guardrails — what\'s always off-limits',
        'What good looks like at 90 days',
      ],
    },
  },
]
