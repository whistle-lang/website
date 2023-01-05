import { GitHub } from "./Icons.tsx";

export default function NavigationBar(props: { active: string }) {
  const items = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Docs",
      href: "/docs",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Playground",
      href: "/playground",
    },
    {
      name: <GitHub class="w-6 h-6" />,
      href: "https://github.com/whistle-lang",
    },
  ];

  return (
    <nav class={`bg(gray-50) py-2 border(t-2 b-2 gray-100)`}>
      <ul class={`flex justify-center gap-8 mx-4`}>
        {items.map((item) => (
          <li>
            <a
              href={item.href}
              class={`text-gray-600 hover:underline ${
                props.active == item.href ? "font-bold" : ""
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
