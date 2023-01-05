import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/brand-github.tsx";
import IconBrandDiscord from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/brand-discord.tsx";

const LINKS = [
  {
    title: <IconBrandGithub class="w-6 h-6" />,
    href: "https://github.com/whistle-lang",
  },
  {
    title: <IconBrandDiscord class="w-6 h-6" />,
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
        <a
          href={"https://raw.githubusercontent.com/whistle-lang/website/main/LICENSE"}
        >
          © 2020-2023 the Whistle authors
        </a>
      </div>
    </footer>
  );
}
