/** @jsx h */
/** @jsxFrag Fragment */

import { h, tw } from "../client_deps.ts";

export default function Header() {
  return (
    <header class={tw`mx-auto max-w-screen-lg flex gap-3 justify-between`}>
      <div class={tw`p-4`}>
        <p class={tw`flex items-center`}>
          <a href="/">
            <img class={tw`h-12 mx-4`} src="/whistle_horizontal_dark.svg" />
          </a>
        </p>
      </div>
    </header>
  );
}
