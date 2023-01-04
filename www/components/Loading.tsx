// ported from https://github.com/suren-atoyan/monaco-react

const loadingStyles = {
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

// deno-lint-ignore no-explicit-any
export default function Loading({ content }: any) {
  return (
    <div style={loadingStyles}>{content}</div>
  );
}