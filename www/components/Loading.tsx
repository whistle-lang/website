// ported from https://github.com/suren-atoyan/monaco-react

// deno-lint-ignore no-explicit-any
export default function Loading({ content }: any) {
  return (
    <div style="flex h-full w-full justify-center items-center">{content}</div>
  );
}
