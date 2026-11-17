// Every string, link and piece of seed data for the site lives here.
// Start editing from the top: SITE, then the page sections below it.

export const SITE = {
  name: 'Prime Axis',
  tagline: 'Scalable web systems & business automation',
  email: 'hello@PrimeAxis.studio',
  phone: '+234 916 430 0395',
  whatsapp: 'https://wa.me/2349164300395?text=Hello%21%20I%27d%20like%20to%20book%20a%20free%20consultation%20with%20PrimeAxis.',
  address: ['Remote-first agency'],
  hours: 'Monday to Friday, 9:00–18:00 WAT',
  socials: [
    { label: 'Twitter / X', href: 'https://x.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'Facebook', href: 'https://www.facebook.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
  ],
}

/**
 * Projects are parked for now. Nothing is deleted: the home section, the work
 * pages, the case studies and every link to them are skipped while this is
 * false. Flip it back to true to bring the whole work area back.
 */
export const SHOW_PROJECTS = false

/** Main navigation. The first four sit in the header; the menu shows all of them. */
export const NAV = [
  { label: 'About', to: '/studio' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'Contact', to: '/contact' },
]
export const MENU = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/studio' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]

/*
  Photography and renders. Every image on the site goes through this one
  constant: swap `src` for your own file in public/images/ (or any URL) and
  update `alt`. The placeholders are generated, not real client work.
  The `holo*` entries are the iridescent chrome objects (transparent webp);
  set one's `src` to '' to fall back to its SVG drawing in components/Holo.tsx.
*/
export const IMAGES = {
  aurora: { src: '/images/aurora.webp', alt: 'Soft translucent 3D forms in mint, peach and lilac on a pale background' },
  fold: { src: '/images/fold.webp', alt: 'Geometric shapes pressed into cream cotton paper beside a stack of colour-blocked book covers' },
  halcyon: { src: '/images/halcyon.webp', alt: 'Calm hotel lobby with a curved travertine reception desk and warm indirect light' },
  kite: { src: '/images/kite.webp', alt: 'Orange technical jacket hung against a green wall in hard sunlight' },
  meridian: { src: '/images/meridian.webp', alt: 'Two phones showing a banking app on a cobalt blue background' },
  nocturne: { src: '/images/nocturne.webp', alt: 'Swirling violet, magenta and teal liquid on black' },
  ostra: { src: '/images/ostra.webp', alt: 'Ceramic jug and cups on linen in warm morning light' },
  lookbook: { src: '/images/lookbook.webp', alt: 'Wooden bench with a folded throw beside a paper floor lamp in a bright room' },
  holoKnot: { src: '/images/holo/knot.webp', alt: '' },
  holoSphere: { src: '/images/holo/sphere.webp', alt: '' },
  holoCloud: { src: '/images/holo/cloud.webp', alt: '' },
  holoScissors: { src: '/images/holo/scissors.webp', alt: '' },
  holoStar: { src: '/images/holo/star.webp', alt: '' },
  holoPrism: { src: '/images/holo/prism.webp', alt: '' },
  holoAxis: { src: '/images/holo/axis.webp', alt: '' },
  teamMichael: { src: '/images/team/michael.webp', alt: 'Omale Michael, Software Developer at Prime Axis' },
  teamGrace: { src: '/images/team/grace.webp', alt: 'Grace Ufah, Graphic Designer at Prime Axis' },
  teamGodswill: { src: '/images/team/godswill.webp', alt: 'Omale Godswill, UI/UX Designer at Prime Axis' },
  teamTumise: { src: '/images/team/tumise.webp', alt: 'Sopein Tumise, Social Media Strategist at Prime Axis' },
  teamOlakumbi: { src: '/images/team/olakumbi.webp', alt: 'Olakumbi, Motion Designer at Prime Axis' },
  teamArekhanose: { src: '/images/team/arekhanose.webp', alt: 'Arekhanose Onosereme, Cloud & Database Engineer at Prime Axis' },
} as const satisfies Record<string, { src: string; alt: string }>
export type ImageKey = keyof typeof IMAGES

export const HOME = {
  stats: [
    { value: 10, label: ['Projects', 'delivered'] },
    { value: 6, label: ['Team', 'members'] },
    { value: 24, label: ['Hour', 'response'] },
  ],
  captionTop: 'We build the systems your business runs on.',
  captionBottom: 'You focus on growth. We handle the infrastructure.',
  headline: ['Build faster.', 'Scale', 'smarter.'],
  reachOut: 'Contact us',
  servicesTitle: ['Services built', 'for real growth'],
  manifestoTitle: ['Who', 'we are'],
  manifesto:
    'PrimeAxis is a remote-first engineering studio. We design, build, and scale the systems growing companies run on — without templates or unnecessary rewrites.',
  approachTitle: ['Our', 'approach'],
  workTitle: ['Selected', 'work'],
  testimonyTitle: ['Kind words', 'from clients'],
  clientsLabel: 'Trusted by teams at',
  cta: { title: ['Let’s build', 'something', 'scalable'], body: 'Tell us what you’re building. We’ll reply with a focused plan.', action: 'Start a project' },
}

export const CLIENTS = ['Elliot Global Properties', 'She Is A Voice', 'Firestarter Method', 'Sketchroom', 'Correr']

export type Service = {
  slug: string
  title: string
  short: string
  tag?: string
  art: HoloKind
  intro: string
  deliverables: string[]
}
export type HoloKind = 'knot' | 'sphere' | 'cloud' | 'scissors' | 'star' | 'prism' | 'axis'

export const SERVICES: Service[] = [
  {
    slug: 'web-development',
    title: 'Custom web & application development',
    short: 'The infrastructure your business runs on',
    tag: 'Core offering',
    art: 'cloud',
    intro: 'Marketing sites, web apps, and internal tools built on solid foundations.',
    deliverables: ['Business websites & landing pages', 'Web applications & SaaS platforms', 'Internal tools & admin dashboards', 'API integrations & backend systems'],
  },
  {
    slug: 'digital-products',
    title: 'Digital product development',
    short: 'Idea to shipped product',
    tag: 'For founders',
    art: 'star',
    intro: 'From concept to launched MVP, ready to grow from day one.',
    deliverables: ['Concept to MVP in weeks', 'Product architecture & planning', 'Scalable SaaS prototypes', 'Production-ready delivery'],
  },
  {
    slug: 'ui-ux',
    title: 'UI/UX design & product strategy',
    short: 'Design validated by behaviour',
    tag: 'Strategy',
    art: 'prism',
    intro: 'Research-led interfaces that work before they ship.',
    deliverables: ['Interface design', 'Prototyping', 'User journey mapping', 'Feature structuring'],
  },
  {
    slug: 'redesign',
    title: 'Redesign & performance optimisation',
    short: 'Slow sites, rebuilt fast',
    tag: 'Performance',
    art: 'sphere',
    intro: 'Fast, modern rebuilds of slow or outdated sites.',
    deliverables: ['UI modernisation', 'Core Web Vitals', 'SEO structure', 'Mobile responsiveness'],
  },
  {
    slug: 'campaigns',
    title: 'Campaigns & content',
    short: 'Ideas people talk about',
    art: 'knot',
    intro: 'Campaign ideas and assets across social, film, and print.',
    deliverables: ['Campaign concepts', 'Art direction', 'Out-of-home and print', 'Social and paid assets'],
  },
]

export const SERVICE_CTA = {
  eyebrow: 'Not sure which service fits?',
  title: 'Tell us what you’re building.',
  action: 'Start a project',
  call: 'Book a free call',
}

export const APPROACH = [
  { title: 'Engineer first', body: 'Clean architecture, reliable pipelines, maintainable code.', art: 'knot' as HoloKind, tone: 'violet' as const },
  { title: 'Product minded', body: 'We think about the user, not just the ticket.', art: 'scissors' as HoloKind, tone: 'white' as const },
  { title: 'Built to scale', body: 'Designed for growth, without costly rewrites.', art: 'star' as HoloKind, tone: 'white' as const },
  { title: 'Measured launch', body: 'We set the numbers before launch and report after.', art: 'sphere' as HoloKind, tone: 'night' as const },
]

export const PROCESS = [
  { step: '01', title: 'Brief', body: 'Tell us the goal.' },
  { step: '02', title: 'Review', body: 'We reply within 24 hours.' },
  { step: '03', title: 'Kickoff', body: 'Scope, timeline, first deliverable.' },
  { step: '04', title: 'Deliver', body: 'Launch, handoff, 30 days of support.' },
]

export const ENGAGEMENTS = [
  { name: 'Sprint', price: 'From €18k', length: '2–3 weeks', body: 'A focused burst: one deliverable, shipped fast.', points: ['One discipline', 'Two review rounds', 'Final files and handoff'] },
  { name: 'Project', price: 'From €45k', length: '6–12 weeks', body: 'A full product or identity, from strategy to launch.', points: ['Strategy and creative routes', 'Weekly reviews', 'Guidelines or design system', '30 days of launch support'], featured: true },
  { name: 'Partnership', price: 'From €12k / month', length: 'Ongoing', body: 'A dedicated team that works as your in-house studio.', points: ['Reserved team capacity', 'Monthly planning', 'Priority turnaround'] },
]

export const FAQ = [
  { q: 'How soon can you start?', a: 'Usually three to five weeks after a signed brief. Sprints can start sooner.' },
  { q: 'Do you work with startups?', a: 'Yes. Around a third of our clients are pre-seed to Series A.' },
  { q: 'Who will I work with?', a: 'A small senior team. You talk directly to the people doing the work.' },
  { q: 'Do you build websites too?', a: 'Yes — design, build, and handoff in production-ready components.' },
]

export type Project = {
  slug: string
  client: string
  title: string
  year: number
  disciplines: string[]
  cover: ImageKey
  gallery: ImageKey[]
  summary: string
  challenge: string
  approach: string
  results: { value: string; label: string }[]
  quote?: { text: string; name: string; role: string }
  accent: string
}

export const DISCIPLINES = ['Branding', 'Digital', 'Motion', 'Campaign'] as const

export const PROJECTS: Project[] = [
  {
    slug: 'aurora-labs',
    client: 'Aurora Labs',
    title: 'A soft-tech identity for a materials science lab',
    year: 2026,
    disciplines: ['Branding', 'Motion'],
    cover: 'aurora',
    gallery: ['aurora'],
    summary: 'Aurora develops translucent bio-polymers. We built a brand that looks like the material: soft, layered and hard to pin down.',
    challenge: 'Aurora was raising a Series A with a deck full of microscope images and a name nobody could remember.',
    approach: 'We modelled the polymer in 3D and made it the logo: a living form that shifts colour with the light.',
    results: [
      { value: '€24m', label: 'Series A raised after launch' },
      { value: '3.4×', label: 'More inbound partner enquiries' },
      { value: '11', label: 'Weeks from kickoff to launch' },
    ],
    quote: { text: 'PrimeAxis gave our science a face. Investors started the meeting talking about the brand.', name: 'Dr. Ines Hartmann', role: 'Founder, Aurora Labs' },
    accent: '#b9a2ff',
  },
  {
    slug: 'meridian',
    client: 'Meridian',
    title: 'Banking that fits in one hand',
    year: 2026,
    disciplines: ['Digital'],
    cover: 'meridian',
    gallery: ['meridian'],
    summary: 'A full redesign of Meridian’s mobile bank: new navigation, a design system of 180 components and a calmer way to see your money.',
    challenge: 'The app had grown to 46 screens off the home tab, support calls were rising, and ratings had fallen to 3.1.',
    approach: 'Six weeks of research led to three tabs and one question per screen, rebuilt alongside their engineers.',
    results: [
      { value: '4.8', label: 'App Store rating, up from 3.1' },
      { value: '−38%', label: 'Support calls in the first quarter' },
      { value: '180', label: 'Components in the system' },
    ],
    quote: { text: 'They sat with our engineers every week. Handoff was not a moment, it was the whole project.', name: 'Jonas Weber', role: 'VP Product, Meridian' },
    accent: '#3f5bff',
  },
  {
    slug: 'halcyon',
    client: 'Halcyon Hotels',
    title: 'Quiet luxury for a group of seven hotels',
    year: 2025,
    disciplines: ['Branding', 'Digital'],
    cover: 'halcyon',
    gallery: ['halcyon', 'lookbook'],
    summary: 'A brand and booking site for seven small hotels that share a philosophy rather than a look.',
    challenge: 'Each hotel had its own logo and site, so guests did not know they belonged together.',
    approach: 'One calm master brand, a material palette per property, and a booking site that sells the stay first.',
    results: [
      { value: '41%', label: 'Direct bookings, up from 18%' },
      { value: '7', label: 'Properties under one brand' },
      { value: '2.1×', label: 'Time on site' },
    ],
    accent: '#c7b49a',
  },
  {
    slug: 'kite-outdoor',
    client: 'Kite Outdoor',
    title: 'Colour-first campaign for technical outerwear',
    year: 2025,
    disciplines: ['Campaign', 'Motion'],
    cover: 'kite',
    gallery: ['kite'],
    summary: 'A loud spring campaign across out-of-home, social and film, built around a single colour.',
    challenge: 'Outdoor brands all shoot mountains. Kite needed to stand out in cities, where its customers live.',
    approach: 'We left the mountains out and put the jackets on walls of pure colour.',
    results: [
      { value: '62m', label: 'Campaign impressions' },
      { value: '+27%', label: 'Spring sales year on year' },
      { value: '14', label: 'Cities on out-of-home' },
    ],
    quote: { text: 'The bravest brief we ever wrote, and they made it look obvious.', name: 'Mara Olsen', role: 'Brand Director, Kite Outdoor' },
    accent: '#ff6a1f',
  },
  {
    slug: 'fold-press',
    client: 'Fold Press',
    title: 'A letterpress identity for an independent publisher',
    year: 2024,
    disciplines: ['Branding'],
    cover: 'fold',
    gallery: ['fold'],
    summary: 'A wordmark cut for letterpress, a custom serif and a cover system for forty new titles a year.',
    challenge: 'Fold Press’s books looked beautiful one by one, but unrelated on a shelf.',
    approach: 'A strict cover grid with one free zone per title, printed on the studio’s own press.',
    results: [
      { value: '40', label: 'Titles a year on the system' },
      { value: '3', label: 'Design awards' },
      { value: '+19%', label: 'Bookshop orders' },
    ],
    accent: '#2b2b2b',
  },
  {
    slug: 'nocturne',
    client: 'Nocturne Records',
    title: 'Motion identity for an electronic label',
    year: 2024,
    disciplines: ['Motion', 'Digital'],
    cover: 'nocturne',
    gallery: ['nocturne'],
    summary: 'A generative visual system that turns every release’s audio into its own cover and loop.',
    challenge: 'Nocturne releases a record a week. Commissioning artwork for each was slow and inconsistent.',
    approach: 'A tool reads the stems and renders a fluid simulation, so every cover is unique.',
    results: [
      { value: '52', label: 'Releases a year, zero briefs' },
      { value: '4×', label: 'Social engagement on release days' },
      { value: '1', label: 'Tool, open to the artists' },
    ],
    accent: '#7b3cff',
  },
  {
    slug: 'ostra-home',
    client: 'Ostra Home',
    title: 'Packaging and shop for a ceramics brand',
    year: 2023,
    disciplines: ['Branding', 'Digital'],
    cover: 'ostra',
    gallery: ['ostra', 'lookbook'],
    summary: 'Warm, tactile packaging and an online shop that sells pottery like a morning ritual.',
    challenge: 'Ostra was moving from markets to online with no photography, packaging, or shop.',
    approach: 'One week of shoots, recyclable packaging, and a shop that shows every product in use.',
    results: [
      { value: '€1.2m', label: 'Online sales in the first year' },
      { value: '3.9%', label: 'Shop conversion rate' },
      { value: '0', label: 'Plastic in the packaging' },
    ],
    accent: '#c2703d',
  },
]

export const TESTIMONIALS = [
  { quote: 'PrimeAxis gave our science a face. Investors started the meeting talking about the brand.', name: 'Dr. Ines Hartmann', role: 'Founder, Aurora Labs', project: 'aurora-labs' },
  { quote: 'They sat with our engineers every week. Handoff was not a moment, it was the whole project.', name: 'Jonas Weber', role: 'VP Product, Meridian', project: 'meridian' },
  { quote: 'The bravest brief we ever wrote, and they made it look obvious. Spring sales were the best in our history.', name: 'Mara Olsen', role: 'Brand Director, Kite Outdoor', project: 'kite-outdoor' },
  { quote: 'Calm, precise and very fast. Our seven hotels finally look like a family.', name: 'Luca Bianchi', role: 'CEO, Halcyon Hotels', project: 'halcyon' },
]

export type TeamMember = {
  name: string
  role: string
  tag?: string
  bio: string
  skills: string[]
  photo: ImageKey
}

export const STUDIO = {
  title: ['Who', 'we are'],
  intro:
    'PrimeAxis is a remote-first engineering studio. We design, build, and scale the systems growing companies run on.',
  teamIntro: 'Six people. Three disciplines. One standard: build things that last.',
  stats: [
    { value: 10, prefix: '', suffix: '', label: 'Projects delivered' },
    { value: 6, prefix: '', suffix: '', label: 'Team members' },
    { value: 24, prefix: '≤', suffix: 'hr', label: 'Response time' },
    { value: 100, prefix: '', suffix: '%', label: 'Remote-first' },
  ],
  values: [
    { title: 'Engineer first', body: 'Clean architecture, reliable pipelines, maintainable code.' },
    { title: 'Product minded', body: 'We think about the user, not just the ticket.' },
    { title: 'Built to scale', body: 'Designed for growth, without costly rewrites.' },
  ],
  team: [
    {
      name: 'Omale Michael',
      role: 'Software Developer',
      tag: 'Team lead',
      bio: 'Architects the systems behind PrimeAxis, with a focus on performance and clarity.',
      skills: ['System Architecture', 'Frontend Engineering', 'Product Strategy'],
      photo: 'teamMichael',
    },
    {
      name: 'Grace Ufah',
      role: 'Graphic Designer',
      bio: 'Shapes how PrimeAxis looks, from first impression to lasting identity.',
      skills: ['Brand Design', 'Visual Identity', 'Marketing Graphics'],
      photo: 'teamGrace',
    },
    {
      name: 'Omale Godswill',
      role: 'UI/UX Designer',
      bio: 'Turns user needs into clear, research-backed interfaces.',
      skills: ['Figma', 'UX Research', 'Design Systems'],
      photo: 'teamGodswill',
    },
    {
      name: 'Sopein Tumise',
      role: 'Social Media Strategist',
      bio: 'Grows PrimeAxis’s voice across platforms and turns content into community.',
      skills: ['Content Strategy', 'Community Growth', 'Brand Positioning'],
      photo: 'teamTumise',
    },
    {
      name: 'Olakumbi',
      role: 'Motion Designer',
      bio: 'Gives PrimeAxis’s stories rhythm through animation and motion.',
      skills: ['Motion Graphics', 'Animation', 'Video Editing'],
      photo: 'teamOlakumbi',
    },
    {
      name: 'Arekhanose Onosereme',
      role: 'Cloud & Database Engineer',
      bio: 'Keeps PrimeAxis running quietly, reliably, and at scale.',
      skills: ['Cloud Architecture', 'Database Engineering', 'DevOps'],
      photo: 'teamArekhanose',
    },
  ] satisfies TeamMember[],
  awards: [
    { year: 2026, name: 'D&AD', note: 'Wood Pencil, Branding — Aurora Labs' },
    { year: 2025, name: 'Awwwards', note: 'Site of the Day — Halcyon Hotels' },
    { year: 2025, name: 'ADC Germany', note: 'Gold, Campaign — Kite Outdoor' },
    { year: 2024, name: 'Type Directors Club', note: 'Certificate of Excellence — Fold Press' },
  ],
}

export type Role = {
  slug: string
  title: string
  team: string
  location: string
  type: string
  summary: string
  responsibilities: string[]
  requirements: string[]
}

export const CAREERS = {
  title: ['Make', 'with us'],
  intro: 'We hire rarely and carefully. Small, senior teams. Work we care about.',
  perks: [
    { title: 'Four-day weeks in August', body: 'The studio works Monday to Thursday all summer.' },
    { title: '€2,000 learning budget', body: 'Courses, books, conferences, or a workshop. Your call.' },
    { title: 'Remote-first', body: 'Work from wherever you do your best work, with regular check-ins across the team.' },
    { title: 'Your own projects', body: 'One Friday a month for self-initiated work.' },
  ],
}

export const ROLES: Role[] = [
  {
    slug: 'senior-brand-designer',
    title: 'Senior Brand Designer',
    team: 'Branding',
    location: 'Remote',
    type: 'Full time',
    summary: 'Lead identity projects from first routes to final guidelines.',
    responsibilities: ['Develop creative routes and argue for them', 'Build type, colour and graphic systems', 'Present to clients and run reviews', 'Mentor two mid-level designers'],
    requirements: ['Six or more years in brand design', 'A portfolio of identities you led', 'Excellent typography', 'German is a plus, English is required'],
  },
  {
    slug: 'product-designer',
    title: 'Product Designer',
    team: 'Digital',
    location: 'Remote',
    type: 'Full time',
    summary: 'Design apps and systems for clients like Meridian.',
    responsibilities: ['Plan and run usability tests', 'Design flows, interfaces and prototypes', 'Build and document components', 'Pair with client engineering teams'],
    requirements: ['Three or more years in product design', 'Fluent in Figma variables and auto layout', 'Comfortable reading front-end code', 'Clear writing'],
  },
  {
    slug: '3d-motion-designer',
    title: '3D & Motion Designer',
    team: 'Motion',
    location: 'Remote',
    type: 'Full time',
    summary: 'Make the iridescent objects and motion our clients are known for.',
    responsibilities: ['Model, light and render in Blender or Cinema 4D', 'Animate logos and interfaces', 'Produce campaign films', 'Build reusable asset kits'],
    requirements: ['A reel that shows taste and range', 'Strong lighting and materials', 'After Effects and one 3D tool', 'Real-time experience is a plus'],
  },
  {
    slug: 'new-business-lead',
    title: 'New Business Lead',
    team: 'Studio',
    location: 'Remote',
    type: 'Full time',
    summary: 'Find and win the projects we want to be known for.',
    responsibilities: ['Qualify inbound briefs', 'Write proposals and estimates', 'Plan our pipeline with the founders', 'Represent the studio at events'],
    requirements: ['Four or more years in agency new business', 'You love design and can talk about it', 'Organised and calm under deadlines'],
  },
]

export const CONTACT = {
  title: ['Let’s build', 'something', 'scalable'],
  intro: 'Tell us what you’re building. We’ll reply with a focused plan within 24 hours.',
  response: 'Within 24 hours',
  consultation: {
    tag: 'Free consultation',
    title: ['Not ready to commit?', 'Let’s talk first.'],
    body: 'Tell us what you’re working on. We’ll tell you honestly if we can help.',
    note: 'Free 15-minute call. No credit card. No spam.',
    action: 'Book a free call',
  },
  budgets: ['$500 – $1,000', '$1,000 – $5,000', '$5,000+'] as const,
  timelines: ['ASAP', '1 – 2 months', '3 – 6 months', '6+ months', 'Flexible'] as const,
  services: ['Website', 'Web App', 'Automation', 'MVP', 'Redesign', 'Custom System'] as const,
  steps: ['Project', 'Budget and timing', 'Your info'],
}

export const FOOTER = {
  newsletter: { title: 'Studio notes', body: 'One email a month. New work, open roles, nothing else.' },
  tagline: 'Technology that moves with you.',
  legal: `© ${new Date().getFullYear()} PrimeAxis Technologies. All rights reserved.`,
}