import { IconWhistle } from "./Icons.tsx";

export default function Header() {
  return (
    <header class={`md:mx-auto max-w-screen-lg flex gap-3 justify-between`}>
      <div class={`p-10`}>
        <IconWhistle />
      </div>
    </header>
  );
}
