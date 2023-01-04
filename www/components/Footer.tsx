const LINKS = [
  {
    title: "Source",
    href: "https://github.com/whistle-lang",
  },
  {
    title: "Discord",
    href: "https://discord.gg/hdKxd5x",
  },
];

export default function Footer() {
  const footer =
    `border(t-2 gray-200) bg-gray-100 h-32 flex flex-col gap-4 justify-center`;
  const inner =
    `mx-auto max-w-screen-lg flex items-center justify-center gap-8`;
  const linkStyle = `text-gray-600 hover:underline`;
  const copyright = `text(gray-600 center)`;
  return (
    <footer class={footer}>
      <div class={inner}>
        {LINKS.map((link) => (
          <a href={link.href} class={linkStyle}>
            {link.title}
          </a>
        ))}
      </div>
      <div class={copyright}>
        <span>© 2020-2023 the Whistle authors</span>
      </div>
    </footer>
  );
}
