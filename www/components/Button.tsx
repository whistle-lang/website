// deno-lint-ignore no-explicit-any
export function RoundedButton(props: any) {
  return (
    <button
      {...props}
      class={`p-3 border border-transparent rounded-full text-white bg-indigo(600 hover:700) focus:(outline-none ring(2 offset-2 indigo-500)) disabled:(bg-indigo-200 cursor-default)`}
    />
  );
}
