/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, MonacoEditor, tw, useState } from "../client_deps.ts";

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
    <ul class={tw`flex gap-8 py-2 px-4 bg-gray-50 border-b-1`}>
      <TopBarButton onClick={() => console.log(123)}>Run</TopBarButton>
      <div class={tw`ml-auto pl-4`}>
        <TopBarDropdown
          options={["WebAssembly", "Tokens", "AST"]}
          onSelect={() => console.log(123)}
        />
      </div>
    </ul>
  );
}

function TopBarButton(
  { children, onClick }: {
    children: string;
    onClick?: h.JSX.MouseEventHandler<HTMLLIElement>;
  },
) {
  return (
    <li
      class={tw
        `py-1 px-2 border border-gray-300 font-medium rounded-md text-gray-700 bg-gray-50 transition duration-150 ease-in-out select-none hover:text-gray-500 hover:bg-gray-50 active:bg-gray-100 active:text-gray-700 focus:outline-none focus:shadow focus:border-blue-300`}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

function TopBarDropdown<T extends string[]>(
  { options, onSelect }: {
    options: T;
    onSelect?: (
      option: { [P in keyof T]: T[P] } extends { [key: number]: infer V } ? V
        : never,
    ) => void;
  },
) {
  const [option, setOption] = useState(options[0]);

  return (
    <li
      class={tw
        `inline-flex justify-center py-1 px-2 border border-gray-300 font-medium rounded-md text-gray-700 bg-gray-50 transition duration-150 ease-in-out select-none hover:text-gray-500 hover:bg-gray-50 active:bg-gray-100 active:text-gray-700 focus:outline-none focus:shadow focus:border-blue-300`}
    >
      {option}
      <Chevron class={tw`mt-auto mb-auto mr-1 ml-2 w-3 h-3`} />
    </li>
  );
}

function Chevron({ ...props }) {
  return (
    <svg
      {...props}
      viewBox="6 8 12 8"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor" 
    >
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
}

function Panels() {
  return (
    <div class={tw`grow grid grid-cols-2 bg-white`}>
      <div class={tw`border-r-1`}>
        <MonacoEditor />
      </div>

      <div class={tw`grid grid-rows-2`}>
        <div class={tw`w-full border-b-1`}>
        </div>

        <div class={tw`w-full`}>
        </div>
      </div>
    </div>
  );
}
