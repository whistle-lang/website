/** @jsx h */

import { h, tw } from "../client_deps.ts";

export function IconWhistle() {
  return (
    <p class={tw`flex items-center`}>
      <a href="/">
        <img class={tw`h-12 mx-4`} src="/whistle_horizontal_dark.svg" />
      </a>
    </p>
  );
}

export function IconChevron({ ...props }) {
  return (
    <svg
      {...props}
      viewBox="6 8 12 8"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
}
