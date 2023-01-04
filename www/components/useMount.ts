// ported from https://github.com/suren-atoyan/monaco-react

import { useEffect } from 'preact/hooks';

// deno-lint-ignore no-explicit-any
export default function useMount(effect: any) {
  useEffect(effect, []);
}
