export const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Product', href: '#product' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
];

export const trustedCompanies = [
  { name: 'Vertex', logo: '▲ VERTEX' },
  { name: 'Luma', logo: '● LUMA' },
  { name: 'Orbit', logo: '✦ ORBIT' },
  { name: 'Arcadia', logo: '❖ ARCADIA' },
  { name: 'Northstar', logo: '★ NORTHSTAR' },
  { name: 'Flux', logo: '◆ FLUX' },
];

export const features = [
  {
    id: 'ai-assistant',
    iconName: 'Bot',
    title: 'AI Work Assistant',
    description: 'Get instant summaries, recommendations and answers without leaving your workflow.',
    tag: 'INTELLIGENCE'
  },
  {
    id: 'smart-pm',
    iconName: 'Kanban',
    title: 'Smart Project Management',
    description: 'Organize projects, milestones and tasks with intelligent prioritization.',
    tag: 'MANAGEMENT'
  },
  {
    id: 'automation',
    iconName: 'Zap',
    title: 'Workflow Automation',
    description: 'Automate repetitive work and let NOVA handle routine processes for you.',
    tag: 'AUTOMATION'
  },
  {
    id: 'collaboration',
    iconName: 'Users',
    title: 'Real-Time Collaboration',
    description: 'Keep teams aligned with comments, shared workspaces and live updates.',
    tag: 'TEAMWORK'
  },
  {
    id: 'analytics',
    iconName: 'BarChart3',
    title: 'Intelligent Analytics',
    description: 'Understand productivity trends with actionable insights and visual reports.',
    tag: 'INSIGHTS'
  },
  {
    id: 'security',
    iconName: 'ShieldCheck',
    title: 'Secure by Design',
    description: "Keep your team's information protected with enterprise-grade security.",
    tag: 'SECURITY'
  }
];

export const howItWorksSteps = [
  {
    number: '01',
    title: 'Connect',
    description: 'Bring your projects, tools and team into one workspace.',
    icon: 'Link'
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Let NOVA organize priorities and surface what matters most.',
    icon: 'Target'
  },
  {
    number: '03',
    title: 'Automate',
    description: 'Turn repetitive processes into intelligent workflows.',
    icon: 'Cpu'
  },
  {
    number: '04',
    title: 'Scale',
    description: 'Use insights to continuously improve how your team works.',
    icon: 'TrendingUp'
  }
];

export const statsData = [
  { value: 10, suffix: 'K+', label: 'Teams using NOVA', rawVal: 10 },
  { value: 2.5, suffix: 'M+', label: 'Tasks automated', rawVal: 2.5 },
  { value: 38, suffix: '%', label: 'Average productivity improvement', rawVal: 38 },
  { value: 99.9, suffix: '%', label: 'Platform uptime', rawVal: 99.9 }
];

export const solutionsData = [
  {
    id: 'startups',
    title: 'Startups',
    subtitle: 'Move quickly without adding unnecessary process.',
    description: 'Empower small, agile teams to move at lightning speed with automated sprint planning, frictionless task updates, and unified context.',
    points: [
      'Zero-setup AI templates for quick launches',
      'Automated sprint summaries for founders & investors',
      'Integrated roadmap sharing with early adopters'
    ],
    icon: 'Rocket'
  },
  {
    id: 'product',
    title: 'Product Teams',
    subtitle: 'Turn ideas, feedback and roadmaps into coordinated execution.',
    description: 'Bridge customer insight with development sprints using intelligent backlog triage, automated spec generation, and real-time dependency tracking.',
    points: [
      'AI feature spec generation from raw notes',
      'Automatic sync between Figma, GitHub and tickets',
      'Predictive release timeline estimation'
    ],
    icon: 'Layers'
  },
  {
    id: 'marketing',
    title: 'Marketing Teams',
    subtitle: 'Plan campaigns, automate workflows and measure outcomes.',
    description: 'Streamline multi-channel launch calendars, manage digital asset pipelines, and track performance ROI across cross-functional campaigns.',
    points: [
      'Automated content calendar updates',
      'AI copy variation generator and proofing',
      'Real-time asset approval workflows'
    ],
    icon: 'Sparkles'
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    subtitle: 'Scale collaboration while maintaining control and security.',
    description: 'Maintain institutional governance with advanced RBAC permissions, SOC-2 compliance audits, and custom enterprise AI integrations.',
    points: [
      'SSO & SAML 2.0 enterprise authentication',
      'Custom workspace data retention policies',
      'Dedicated Customer Success Architect'
    ],
    icon: 'Building2'
  }
];

export const testimonials = [
  {
    id: 't1',
    name: 'Sarah Chen',
    role: 'Product Lead',
    company: 'Vertex',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    initials: 'SC',
    rating: 5,
    quote: 'NOVA completely changed how our team works. We spend less time coordinating and more time actually building.'
  },
  {
    id: 't2',
    name: 'Marcus Reed',
    role: 'Founder',
    company: 'Luma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    initials: 'MR',
    rating: 5,
    quote: 'The AI automation alone saves our team hours every week. It feels like having another teammate.'
  },
  {
    id: 't3',
    name: 'Priya Nair',
    role: 'Operations Director',
    company: 'Northstar',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    initials: 'PN',
    rating: 5,
    quote: 'Everything finally lives in one place. NOVA gives us clarity without adding complexity.'
  }
];

export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'For individuals and small experiments.',
    cta: 'Start Free',
    isPopular: false,
    features: [
      '3 active projects',
      'AI assistant (50 prompts/mo)',
      'Basic analytics dashboard',
      '1 workspace',
      'Community support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 19,
    annualPrice: 15,
    description: 'For growing teams looking to accelerate.',
    cta: 'Start Pro',
    isPopular: true,
    badgeText: 'Most Popular',
    features: [
      'Unlimited active projects',
      'Advanced AI automation engine',
      'Intelligent analytics & custom reports',
      'Unlimited team workspaces',
      '50+ app integrations',
      'Priority 24/7 support'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    monthlyPrice: 49,
    annualPrice: 39,
    description: 'For organizations that need more control & scale.',
    cta: 'Contact Sales',
    isPopular: false,
    features: [
      'Everything in Pro plan',
      'Advanced granular permissions',
      'Custom automated workflows',
      'Cross-team executive analytics',
      'SSO & SAML authentication',
      'Dedicated Customer Success Manager'
    ]
  }
];

export const faqData = [
  {
    question: 'What is NOVA?',
    answer: 'NOVA is an AI-powered workspace that unifies project management, workflow automation, and team collaboration into a single intelligent platform. It simplifies complex processes and automates routine operational tasks.'
  },
  {
    question: 'Can I try NOVA for free?',
    answer: 'Yes! We offer a 14-day free trial with full access to all Pro features. No credit card is required to sign up and get started.'
  },
  {
    question: 'Does NOVA integrate with other tools?',
    answer: 'Absolutely. NOVA connects seamlessly with GitHub, Slack, Figma, Jira, Google Workspace, Notion, and over 50+ popular productivity and developer tools.'
  },
  {
    question: 'Is my team’s data secure?',
    answer: 'Security is at the heart of NOVA. We employ enterprise-grade SOC-2 Type II certified encryption, TLS 1.3 in transit, AES-256 at rest, and strict data privacy protocols. We never train public AI models on your team’s proprietary workspace data.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your workspace account settings with zero hidden fees or lock-in.'
  },
  {
    question: 'Does NOVA support large teams?',
    answer: 'Yes! NOVA is architected to scale from 5-person startup teams up to enterprise organizations with thousands of active members across multiple regional departments.'
  },
  {
    question: 'Can NOVA automate repetitive tasks?',
    answer: 'Yes, NOVA features a powerful visual workflow automation builder. You can set triggers for task status changes, PR approvals, milestone deadlines, and content reviews without writing code.'
  }
];
