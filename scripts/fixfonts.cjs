const fs = require('fs');
const file = 'src/index.css';
const src = fs.readFileSync(file, 'utf8');
const start = src.indexOf('/* Self-hosted fonts');
const end = src.indexOf('  --ease-out-expo:');
const newBlock = `/* Self-hosted fonts — no third-party render-blocking request. */
@font-face {
  font-family: 'Cabinet Grotesk';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/cabinet-grotesk-400.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Cabinet Grotesk';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/cabinet-grotesk-500.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Cabinet Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/cabinet-grotesk-700.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/satoshi-400.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/satoshi-500.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/satoshi-700.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'IBM Plex Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/ibm-plex-mono.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'IBM Plex Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/ibm-plex-mono-500.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@theme {
  --color-ink: #f5e7df;
  --color-ink-soft: #f5e7df;
  --color-ink-elev: #f5e7df;
  --color-cream: #1f1d1d;
  --color-cream-strong: #000000;
  --color-accent: #f5e7df;
  --color-dark: #1f1d1d;
  --color-line: rgb(31 29 29 / 0.12);
  --color-line-strong: rgb(31 29 29 / 0.24);

  --font-display: 'Cabinet Grotesk', 'Arial', 'Helvetica', sans-serif;
  --font-serif: 'Cabinet Grotesk', 'Arial', 'Helvetica', sans-serif;
  --font-sans: 'Satoshi', 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Consolas, monospace;
`;
const result = src.slice(0, start) + newBlock + src.slice(end);
fs.writeFileSync(file, result);
console.log('ok');