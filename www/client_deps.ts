export * from "https://raw.githubusercontent.com/lucacasonato/fresh/main/runtime.ts";
export { default as MonacoEditor } from "https://esm.sh/@monaco-editor/react@4.3.1?alias=react:@preact/compat,react-dom:@preact/compat";
import { IS_BROWSER } from "https://raw.githubusercontent.com/lucacasonato/fresh/main/runtime.ts";
import { apply, setup, tw } from "https://esm.sh/twind@0.16.16";
export { apply, setup, tw };
if (IS_BROWSER) {
  setup({
    plugins: {
      grow: { "flex-grow": "1" },
    },
  });
}
