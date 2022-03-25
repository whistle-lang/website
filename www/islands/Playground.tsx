/** @jsx h */
/** @jsxFrag Fragment */

import {
  Fragment,
  h,
  MonacoEditor,
  tw,
  useMemo,
  useRef,
  useState,
} from "../client_deps.ts";
import { IconChevron } from "../components/Icons.tsx";
import { WhistleLanguageDef } from "../data/playground.ts";

export default function Playground() {
  return (
    <div
      class={tw
        `h-full w-full min-h-96 grow flex flex-col rounded-lg bg-gray-50 border-1`}
    >
      <TopBar />
      <Panels />
    </div>
  );
}

function TopBar() {
  const options = [
    {
      name: "WebAssembly",
    },
    {
      name: "Tokens",
    },
    {
      name: "AST",
    },
  ];

  return (
    <ul class={tw`flex gap-8 py-2 px-4 bg-gray-50 border-b-1`}>
      <TopBarButton onClick={() => console.log(123)}>Run</TopBarButton>
      <div class={tw`ml-auto pl-4`}>
        <TopBarDropdown
          options={options}
          onSelected={(option) => console.log(option)}
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
        `cursor-pointer py-1 px-2 border border-gray-300 font-medium rounded-md text-gray-700 bg-gray-50 transition duration-150 ease-in-out select-none hover:text-gray-500 hover:bg-gray-50 active:bg-gray-100 active:text-gray-700 focus:outline-none focus:shadow focus:border-blue-300`}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

function TopBarDropdown<T extends { name: string }[]>(
  { options, onSelected }: {
    options: T;
    onSelected?: (
      option: { [P in keyof T]: T[P] } extends { [key: number]: infer V } ? V
        : never,
    ) => void;
  },
) {
  const [selected, setSelected] = useState(options[0]);

  const dropdown = useRef<HTMLUListElement>(null);
  const toggleDropdown = () => {
    if (dropdown.current) {
      dropdown.current.hidden = !dropdown.current.hidden;
    }
  };

  return (
    <div class={tw`w-64 relative inline-block text-left`}>
      <div
        class={tw
          `w-full cursor-pointer inline-flex justify-center py-1 px-2 border border-gray-300 font-medium rounded-md text-gray-700 bg-gray-50 transition duration-150 ease-in-out select-none hover:text-gray-500 hover:bg-gray-50 active:bg-gray-100 active:text-gray-700 focus:outline-none focus:shadow focus:border-blue-300`}
        onClick={toggleDropdown}
      >
        {selected.name}
        <IconChevron class={tw`mt-auto mb-auto mr-1 ml-2 w-3 h-3`} />
      </div>

      <ul
        class={tw
          `select-none origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none`}
        hidden
        ref={dropdown}
      >
        {options.map((option) => (
          <li
            class={tw
              `cursor-pointer text-gray-700 block w-full text-left px-4 py-2 active:bg-gray-100 active:text-gray-700 hover:text-gray-500 hover:bg-gray-100`}
            onClick={() => {
              setSelected(option);
              onSelected?.(
                option as { [P in keyof T]: T[P] } extends
                  { [key: number]: infer V } ? V
                  : never,
              );
              toggleDropdown();
            }}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Panels() {
  const monacoRef = useRef(null);
  // deno-lint-ignore no-explicit-any
  const handleEditorWillMount = (monaco: any) => {
    monaco.languages.register({
      id: "whistle",
    });
    monaco.languages.setMonarchTokensProvider("whistle", WhistleLanguageDef);
  };
  // deno-lint-ignore no-explicit-any
  const handleEditorDidMount = (editor: any, monaco: any) => {
    monacoRef.current = editor;
  };
  return (
    <div class={tw`grow grid grid-cols-2 bg-white`}>
      <div class={tw`border-r-1`}>
        <MonacoEditor
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          defaultLanguage="whistle"
          theme={window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "vs-dark"
            : "light"}
        />
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
