/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, tw } from "../client_deps.ts";
import { default as PlaygroundIsland } from "../islands/Playground.tsx";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import NavigationBar from "../components/NavigationBar.tsx";

export default function Playground() {
  return (
    <>
      <Head>
        <title>Whistle Playground</title>
      </Head>
      <div class={tw`h-screen flex flex-col`}>
        <Header />
        <NavigationBar active="/playground" />
        <Main />
      </div>
      <Footer />
    </>
  );
}

function Main() {
  return (
    <main
      class={tw`grow mx-auto w-full max-w-screen-2xl px-4 py-8 gap-6`}
    >
      <PlaygroundIsland />
    </main>
  );
}

/*
<div class={tw`flex`}>
  <div class={tw``}>
    <Editor />
  </div>
  <div class={tw``}>
  </div>
</div>
*/
