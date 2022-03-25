/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, MonacoEditor, tw } from "../client_deps.ts";

export default function Playground() {
  return (
    <div class={tw`min-h-full flex flex-col rounded-lg bg-gray-50 border-1`}>
      <TopBar />
      <Panels />
    </div>
  );
}

function TopBar() {
  return (
    <ul class={tw`flex justify-left gap-8 py-2 px-4 bg-gray-50 border-b-1`}>
      <TopBarButton>Run</TopBarButton>
    </ul>
  );
}

function TopBarButton({ children }: { children: string }) {
  return (
    <li
      class={tw
        `py-1 px-2 border border-gray-300 font-medium rounded-md text-gray-700 bg-gray-50 transition duration-150 ease-in-out select-none hover:text-gray-500 hover:bg-gray-50 active:bg-gray-100 active:text-gray-700 focus:outline-none focus:shadow focus:border-blue-300`}
    >
      {children}
    </li>
  );
}

function Panels() {
  return (
    <div class={tw`grow grid grid-cols-2 bg-white`}>
      <div class={tw`resize-x border-r-1`}>
        <MonacoEditor />
      </div>

      <div class={tw`grid grid-rows-2`}>
        <div class={tw`w-full resize-y border-b-1`}>
        </div>

        <div class={tw`w-full resize-y`}>
        </div>
      </div>
    </div>
  );
}
