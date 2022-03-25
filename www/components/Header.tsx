/** @jsx h */
/** @jsxFrag Fragment */

import { h, tw } from "../client_deps.ts";
import { IconWhistle } from "./Icons.tsx";

export default function Header() {
  return (
    <header class={tw`md:mx-auto max-w-screen-lg flex gap-3 justify-between`}>
      <div class={tw`p-4`}>
        <IconWhistle />
      </div>
    </header>
  );
}
