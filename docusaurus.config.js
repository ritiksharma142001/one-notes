// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

const GITHUB = 'https://github.com/ritiksharma142001/one-notes';
const PORTFOLIO = 'https://eritik.vercel.app/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'One Notes',
  tagline:
    'Engineering notes for revising fast — Java, Spring Boot, React, SQL, system design and interview prep in one place.',
  favicon: 'img/favicon.svg',

  url: 'https://ritiksharma142001.github.io',
  baseUrl: '/one-notes/',
  organizationName: 'ritiksharma142001',
  projectName: 'one-notes',
  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  markdown: {
    mermaid: true,
    hooks: { onBrokenMarkdownLinks: 'throw' },
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchResultLimits: 10,
        searchBarShortcutHint: true,
      }),
    ],
  ],

  i18n: { defaultLocale: 'en', locales: ['en'] },

  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap',
      },
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          // “Edit this page” opens the note in the site's own editor (/editor/).
          editUrl: ({ docPath }) => `https://ritiksharma142001.github.io/one-notes/editor/?path=docs/${docPath}`,
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
        sitemap: { changefreq: 'weekly', priority: 0.5 },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/og.png',
      metadata: [
        { name: 'keywords', content: 'java notes, spring boot, react, sql, system design, interview questions, ritik sharma' },
        { name: 'author', content: 'Ritik Sharma' },
      ],
      colorMode: { respectPrefersColorScheme: true },
      docs: { sidebar: { hideable: true, autoCollapseCategories: true } },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      navbar: {
        title: 'One Notes',
        logo: { alt: 'One Notes', src: 'img/logo.svg' },
        items: [
          { type: 'docSidebar', sidebarId: 'notes', label: 'Notes', position: 'left' },
          { to: '/interview/', label: 'Interview prep', position: 'left' },
          { to: '/system-design/fundamentals/', label: 'System design', position: 'left' },
          { to: '/tech-wiki/', label: 'Tech Wiki', position: 'left' },
          { to: '/editor/', label: '✏️ Write', position: 'right' },
          { href: PORTFOLIO, label: 'Portfolio', position: 'right' },
          { href: GITHUB, position: 'right', className: 'header-github-link', 'aria-label': 'GitHub repository' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Backend',
            items: [
              { label: 'Core Java', to: '/core-java/' },
              { label: 'Spring Boot', to: '/advanced-java/spring-boot/' },
              { label: 'SQL', to: '/databases/sql/' },
              { label: 'System design', to: '/system-design/fundamentals/' },
            ],
          },
          {
            title: 'Frontend',
            items: [
              { label: 'JavaScript', to: '/javascript/' },
              { label: 'React', to: '/react/' },
              { label: 'HTML, CSS & Tailwind', to: '/web/' },
            ],
          },
          {
            title: 'Prepare',
            items: [
              { label: 'Java interview questions', to: '/interview/java-backend/' },
              { label: 'Frontend interview questions', to: '/interview/frontend/' },
              { label: 'CS fundamentals', to: '/cs-fundamentals/' },
            ],
          },
          {
            title: 'Deep dives',
            items: [
              { label: 'Tech Wiki home', to: '/tech-wiki/' },
              { label: 'Java complete guide', to: '/tech-wiki/java/Java_Complete_Guide/' },
              { label: 'Spring Boot topics', to: '/tech-wiki/spring/Spring_Boot_Topics_Guide/' },
              { label: 'Design patterns', to: '/tech-wiki/design-patterns/Design_Patterns_Complete_List/' },
              { label: 'Docker', to: '/tech-wiki/docker/Docker_Index/' },
              { label: 'Kubernetes', to: '/tech-wiki/kubernetes/Kubernetes_Index/' },
              { label: 'AI engineering', to: '/tech-wiki/ai-engineering/AI_Engineering_Index/' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Portfolio', href: PORTFOLIO },
              { label: 'GitHub', href: GITHUB },
              { label: 'About & contact', to: '/about/' },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Ritik Sharma · One Notes · Free to read and share.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['java', 'bash', 'sql', 'http', 'properties', 'docker', 'ini'],
      },
      mermaid: { theme: { light: 'neutral', dark: 'dark' } },
    }),
};

export default config;
