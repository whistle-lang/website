import { IS_BROWSER } from "https://raw.githubusercontent.com/lucacasonato/fresh/main/runtime.ts";
import {
  apply,
  Plugin,
  setup,
  ThemeConfiguration,
  tw,
} from "https://esm.sh/twind@0.16.16";
import * as config from "./tw_config.ts";

export * as colors from "https://cdn.esm.sh/v73/twind@0.16.16/es2021/colors.js";
export * from "https://raw.githubusercontent.com/whistle-lang/whistle_deno/master/mod.ts";
export * from "https://raw.githubusercontent.com/lucacasonato/fresh/main/runtime.ts";
export { default as wabt } from "https://esm.sh/wabt@1.0.28?target=esnext";
export { default as MonacoEditor } from "https://esm.sh/@monaco-editor/react@4.3.1?alias=react:@preact/compat,react-dom:@preact/compat";
export type { Monaco } from "https://esm.sh/@monaco-editor/react@4.3.1?alias=react:@preact/compat,react-dom:@preact/compat";
export type { MutableRef } from "https://cdn.esm.sh/v73/preact@10.6.6/hooks/src/index";
export { apply, setup, tw };
export type { Plugin, ThemeConfiguration };

if (IS_BROWSER) {
  setup(config);
}
