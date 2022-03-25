/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, MonacoEditor, tw } from "../client_deps.ts";

export default function Playground() {
  return (
    <div class={tw`grid grid-cols-2 h-full`}>
      <div class={tw``}>
        <MonacoEditor />
      </div>
      <div class={tw``}>
      </div>
    </div>
  );
}
