// ported from https://github.com/suren-atoyan/monaco-react

import { useState } from 'preact/hooks';
import loader from "https://esm.sh/@monaco-editor/loader@1.3.2";

import useMount from './useMount.ts';

export default function useMonaco() {
  const [monaco, setMonaco] = useState(loader.__getMonacoInstance());

  useMount(() => {
    // deno-lint-ignore no-explicit-any
    let cancelable: any;

    if (!monaco) {
      cancelable = loader.init();

      // deno-lint-ignore no-explicit-any
      cancelable.then((monaco: any) => {
        setMonaco(monaco);
      });
    }

    return () => cancelable?.cancel();
  });

  return monaco;
}
