// ported from https://github.com/suren-atoyan/monaco-react

import { useEffect, useRef } from "preact/hooks";

// deno-lint-ignore no-explicit-any
function useUpdate(effect: any, deps: any, applyChanges = true) {
  const isInitialMount = useRef(true);

  useEffect(
    isInitialMount.current || !applyChanges
      ? () => {
        isInitialMount.current = false;
      }
      : effect,
    deps,
  );
}

export default useUpdate;
