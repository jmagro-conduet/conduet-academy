export const session201Meta = {
  id: '201',
  title: 'Walk',
  subtitle: 'Efficiency & automation with Cowork',
  colour: '#008278',
  code: 'WALK-201',
  unlockedByDefault: false,
}

export const tabs201 = [
  {
    id: 'field-guide',
    label: 'Field guide',
    placeholder: {
      title: 'The 201 Field Guide',
      description: 'Everything you need to go from one-off Claude user to someone with repeatable, automated workflows. Content coming after your 201 session.',
      teaser: [
        'The 201 gap — what separates walk-phase from crawl-phase',
        'What Cowork actually does (and why it\'s different)',
        'Building repeatable workflows from one-off tasks',
        'Five walk-phase power moves',
      ],
    },
  },
  {
    id: 'workflow-library',
    label: 'Workflow library',
    placeholder: {
      title: 'Pre-built Workflow Templates',
      description: '10–15 automation templates for the most common recurring business tasks. Each includes a trigger, full prompt, and expected output.',
      teaser: [
        'Weekly synthesis — scan everything, surface themes',
        'Meeting follow-up — action items + drafted replies',
        'Competitor monitor — weekly changes + what to do',
        'Inbox triage — prioritise + draft top responses',
        'PRD from brief — full spec in minutes',
      ],
    },
  },
  {
    id: 'cowork-setup',
    label: 'Cowork setup',
    placeholder: {
      title: 'Step-by-step Cowork Setup',
      description: 'A non-technical guide to installing and running Cowork — the desktop app that lets Claude read your actual files.',
      teaser: [
        'Download and install Cowork',
        'Authenticate and point it at a folder',
        'Run your first test prompt',
        'Set up your first CLAUDE.md',
      ],
    },
  },
  {
    id: 'connector-guide',
    label: 'Connector guide',
    placeholder: {
      title: 'Connect Slack, Drive, Notion & More',
      description: 'Step-by-step walkthroughs for each connector — how to authorise, what it can access, and one example prompt for each.',
      teaser: [
        'Slack — search messages, reference threads, draft replies',
        'Google Drive — find docs, summarise, draft from templates',
        'Notion — read pages, update databases, reference your wiki',
        'Linear — view issues, create tickets, update status',
      ],
    },
  },
]
