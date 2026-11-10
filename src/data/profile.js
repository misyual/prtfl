export const EMAIL = 'clivemishall@gmail.com'

export const profile = {
  name: 'Mishall Clive B.',
  displayName: 'Mishall Clive',
  alias: 'Clive',
  role: 'Graphic Designer & Front-End Developer',
  availability: 'Available for freelance',
  location: 'Philippines',
  timezone: 'GMT+8',
  intro: 'I design sharp visuals and build smooth experiences.',
  signature: 'by the way — I really love designing.',
  aboutOpening: "Hi, I'm Mishall Clive, but call me Clive.",
  about: [
    'I create high-impact visual design, marketing materials, and web interfaces that feel effortless to use. Layout, typography, and color are the tools I reach for first — whether the canvas is a poster, a product page, or a browser.',
    'I treat code as an extension of my design toolkit. The branding and compositions I refine in Illustrator and Photoshop become clean HTML, CSS, and modern front-end — so what you approve is what ships.',
  ],
  stats: [
    { value: 1, suffix: '', label: 'Year crafting' },
    { value: 3, suffix: '', label: 'Projects delivered' },
    { value: 20, suffix: '+', label: 'Company product designs' },
  ],
  services: [
    'Product Cover Design',
    'Video Editing',
    'UI Design',
    'Front-End',
    'Motion',
    'Packaging',
  ],
  skills: ['React', 'Photoshop', 'Illustrator', 'Figma', 'Canva', 'HTML/CSS', 'CapCut'],
  aiTools: ['Claude', 'opencode', 'ChatGPT', 'Gemini'],
  socials: [
    { label: 'GitHub', value: 'misyual', href: 'https://github.com/misyual' },
    {
      label: 'LinkedIn',
      value: 'mishall-clive',
      href: 'https://www.linkedin.com/in/mishall-clive-b6150a324',
    },
    { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  ],
}

export const chapters = [
  { id: 'top', num: '00', label: 'Hello', nav: 'Intro' },
  { id: 'about', num: '01', label: 'The person', nav: 'Person' },
  { id: 'projects', num: '02', label: 'Selected work', nav: 'Work' },
  { id: 'banners', num: '03', label: 'Campaigns', nav: 'Campaigns' },
  { id: 'web-designs', num: '04', label: 'Interfaces', nav: 'Interfaces' },
  { id: 'process', num: '05', label: 'Process', nav: 'Process' },
  { id: 'contact', num: '06', label: 'Next chapter', nav: 'Contact' },
]

export const process = [
  {
    num: '01',
    title: 'Listen',
    copy: 'Understand the audience, the goal, and the constraints before a single pixel moves. The brief is never the whole story.',
  },
  {
    num: '02',
    title: 'Design',
    copy: 'Explore type, color, and composition until the idea is undeniable — then strip away everything that is not carrying its weight.',
  },
  {
    num: '03',
    title: 'Build',
    copy: 'Translate the design into clean, responsive front-end. Code is a design material, not a handoff.',
  },
  {
    num: '04',
    title: 'Refine',
    copy: 'Test, tighten, and polish the details most people never notice. That is usually where the work starts to feel expensive.',
  },
]
