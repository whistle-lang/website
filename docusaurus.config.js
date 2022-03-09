module.exports = {
  title: "Whistle",
  tagline: "One hella programming language",
  url: "https://whistle-lang.github.io/website",
  baseUrl: "/",
  favicon: "https://raw.githubusercontent.com/whistle-lang/assets/master/whistle_transparent_light.png",
  organizationName: "whistle-lang",
  projectName: "website",
  themeConfig: {
    navbar: {
      title: "Whistle",
      logo: {
        alt: "Whistle Logo",
        src: "https://raw.githubusercontent.com/whistle-lang/assets/master/whistle_transparent_dark.svg",
        srcDark: "https://raw.githubusercontent.com/whistle-lang/assets/master/whistle_transparent_light.svg",
      },
      links: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/whistle-lang/whistle",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "docs/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/hdKxd5x",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/whistle-lang/whistle",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} the Whistle team.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          homePageId: "whistle/introduction",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/whistle-lang/website/edit/master/website/",
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/whistle-lang/website/edit/master/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
