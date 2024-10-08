import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'FluidAuth Express',
  tagline: 'Simple Authentication for Your Express Apps',
  favicon: 'img/favicon-32x32.png',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tszavier', // Usually your GitHub org/user name.
  projectName: 'fluidauth-express', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },



  presets: [
    
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Itszavier/fluid-auth-docs/tree/main',
        },
       blog: {

          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Itszavier/fluid-auth-docs/tree/main',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },

        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,

    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',

     metadata: [
      {name: 'keywords', content: 'FluidAuth, authentication framework, open-source authentication, secure authentication, user management, identity management, authentication API, FluidAuth Express, JavaScript authentication, session management'},
      {name: 'description', content: 'FluidAuth is an open-source authentication framework designed for secure and flexible user authentication. It supports session management, identity management, and integrates seamlessly with FluidAuth-Express.'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'FluidAuth - Open Source Authentication Framework'},
      {name: 'twitter:description', content: 'FluidAuth is an open-source authentication framework designed for secure and flexible user authentication. Explore its features and integrations.'},
      {name: 'twitter:image', content: 'https://i.ibb.co/sH7bBJr/security-9783957.png'},
    ],
  
    navbar: {
      title: 'FluidAuth',
      hideOnScroll: true, 
      
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
 
        {to: 'blog', label: 'Blog', position: 'left'},
     
 
        {
          href: 'https://www.npmjs.com/package/@fluidauth/express',
          label: 'Npm',
          position: 'right',
        },


 
        {
          href: 'https://github.com/Itszavier/fluidauth-express',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'doc',
          items: [
            {
              label: 'introduction',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/itszavier_1/',
            },
          
            {
              label: 'Twitter',
              href: 'https://x.com/ForGoodLuck234',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Itszavier/fluidauth-express',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FluidAuth, QuickStack Team. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
