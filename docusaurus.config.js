// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '1-note',
  tagline: 'Notes',
  favicon: 'img/favicon.ico',

  url: 'https://es-notes.ritik.dev',
  baseUrl: '/one-notes/',

  organizationName: 'ritiksharma142001', // ✅ your GitHub username
  projectName: 'one-notes',              // ✅ your repo name
  trailingSlash: true,
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl: 'https://github.com/ritiksharma142001/one-notes/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // ✅ Register the search theme here
  // themes: ['@docusaurus/theme-search-algolia'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        apiKey: 'a3aaac97d1164b77b71bbaa3fa59e5f9',
        indexName: 'ritiksharma142001io',
        appId: 'SK5BV5M8DQ',
        contextualSearch: true,
      },
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'esNot',
        logo: {
          alt: 'esNot',
          src: 'img/logo2.svg',
        },
        items: [
          {
            href: '/about',
            label: 'About Us',
            position: 'right',
          },
          {
            href: '/contact',
            label: 'Contact',
            position: 'right',
          },
          {
            href: 'https://github.com/ritiksharma142001/one-notes',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://eritik.vercel.app/',
            label: 'Portfolio',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: 'https://ritiksharma142001.github.io/one-notes/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: '#',
              },
              {
                label: 'Discord',
                href: '#',
              },
              {
                label: 'X',
                href: '#',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Portfolio',
                to: 'https://eritik.vercel.app/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ritiksharma142001/one-notes',
              },
            ],
          },
        ],
        copyright: `Copyright © 2024 - ${new Date().getFullYear()} Made by Ritik Sharma.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
