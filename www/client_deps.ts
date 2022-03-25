import { IS_BROWSER } from "https://raw.githubusercontent.com/lucacasonato/fresh/main/runtime.ts";
import {
  apply,
  Plugin,
  setup,
  ThemeConfiguration,
  tw,
} from "https://esm.sh/twind@0.16.16";
export * as colors from "https://cdn.esm.sh/v73/twind@0.16.16/es2021/colors.js";
import * as config from "./tw_config.ts";

export * from "https://raw.githubusercontent.com/lucacasonato/fresh/main/runtime.ts";
export { default as MonacoEditor } from "https://esm.sh/@monaco-editor/react@4.3.1?alias=react:@preact/compat,react-dom:@preact/compat";
export { apply, setup, tw };
export type { Plugin, ThemeConfiguration };

if (IS_BROWSER) {
  setup(config);
}
