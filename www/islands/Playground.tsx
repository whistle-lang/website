// deno-lint-ignore-file no-explicit-any
import { MutableRef, useRef, useState } from "preact/hooks";
import { Component, h } from "preact";
import {
  compile,
  load,
  wabt as loadWabt,
} from "../client_deps.ts";

import MonacoEditor from "../components/Editor.tsx";

import { IconChevron } from "../components/Icons.tsx";
import { WhistleLanguageDef } from "../data/playground.ts";

export default class Playground extends Component {
  wabt!: any;

  async componentDidMount() {
    await load();
    const wabt = await loadWabt();
    this.wabt = wabt;
  }

  run(editorRef: MutableRef<any>, textRef: MutableRef<any>) {
    const module = compile(editorRef.current!.getValue());
    textRef.current!.setValue(
      this.wabt.readWasm(module, {}).toText({
        foldExprs: true,
        inlineExport: true,
      }),
    );
  }

  render() {
    const editorRef = useRef<any>(null);
    const textRef = useRef<any>(null);

    return (
      <div
        class={`h-full w-full min-h-[24rem] flex-grow-1 flex flex-col rounded-lg bg-gray-50 border-1`}
      >
        <ul class={`flex gap-8 py-2 px-4 bg-gray-50 border-b-1`}>
          <TopBarButton onClick={() => this.run(editorRef, textRef)}>
            Run
          </TopBarButton>
          <div class={`ml-auto pl-4`}>
          </div>
        </ul>
        <Panels monacoRef={editorRef} textRef={textRef} />
      </div>
    );
  }
}

function TopBarButton(
  { children, onClick }: {
    children: string;
    onClick?: h.JSX.MouseEventHandler<HTMLLIElement>;
  },
) {
  return (
    <li
      class={`cursor-pointer py-1 px-2 border border-gray-300 font-medium rounded-md text-gray-700 bg-gray-50 transition duration-150 ease-in-out select-none hover:text-gray-500 hover:bg-gray-50 active:bg-gray-100 active:text-gray-700 focus:outline-none focus:shadow focus:border-blue-300`}
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
    <div class={`w-64 relative inline-block text-left`}>
      <div
        class={`w-full cursor-pointer inline-flex justify-center py-1 px-2 border border-gray-300 font-medium rounded-md text-gray-700 bg-gray-50 transition duration-150 ease-in-out select-none hover:text-gray-500 hover:bg-gray-50 active:bg-gray-100 active:text-gray-700 focus:outline-none focus:shadow focus:border-blue-300`}
        onClick={toggleDropdown}
      >
        {selected.name}
        <IconChevron class={`mt-auto mb-auto mr-1 ml-2 w-3 h-3`} />
      </div>

      <ul
        class={`select-none origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none`}
        hidden
        ref={dropdown}
      >
        {options.map((option) => (
          <li
            class={`cursor-pointer text-gray-700 block w-full text-left px-4 py-2 active:bg-gray-100 active:text-gray-700 hover:text-gray-500 hover:bg-gray-100`}
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

function Panels(
  { monacoRef, textRef }: {
    monacoRef?: MutableRef<any>;
    textRef?: MutableRef<any>;
  },
) {
  const handleEditorWillMount = (monaco: any) => {
    monaco.languages.register({
      id: "whistle",
    });
    monaco.languages.setMonarchTokensProvider("whistle", WhistleLanguageDef);
  };
  const handleOutputWillMount = (monaco: any) => {
    // monaco.languages.register({
    //   id: "whistle",
    // });
    // monaco.languages.setMonarchTokensProvider("whistle", WhistleLanguageDef);
  };
  const handleEditorDidMount = (editor: any, monaco: any) => {
    if (monacoRef) monacoRef.current = editor;
  };
  const handleOutputDidMount = (editor: any, monaco: any) => {
    if (textRef) textRef.current = editor;
  };
  const editorOptions = {
    contextmenu: false,
    overviewRulerBorder: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 3,
    minimap: {
      enabled: false,
    },
  };
  const outputOptions = {
    contextmenu: false,
    readOnly: true,
    lineNumbers: false,
    lineDecorationsWidth: 0,
    minimap: {
      enabled: false,
    },
  };
  return (
    <div class={`flex-grow-1 grid grid-cols-2 bg-white `}>
      <div class={`border-r-1 h(full md:auto)`}>
        <MonacoEditor
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          options={editorOptions}
          defaultLanguage="whistle"
          defaultValue={`export fn add(a: i32, b: i32): i32 {\n  return a + b\n}`}
          theme={"vs-light"}
        />
      </div>

      <div class={`w-full border-b-1 h(screen md:auto) `}>
        <MonacoEditor
          beforeMount={handleOutputWillMount}
          onMount={handleOutputDidMount}
          options={outputOptions}
          defaultLanguage="wat"
          theme={"vs-light"}
        />
      </div>
    </div>
  );
}
