// ported from https://github.com/suren-atoyan/monaco-react

import { useEffect, useRef } from "preact/hooks";

// deno-lint-ignore no-explicit-any
export default function usePrevious(value: any) {
  // deno-lint-ignore no-explicit-any
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
