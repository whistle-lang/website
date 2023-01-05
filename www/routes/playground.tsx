import { default as PlaygroundIsland } from "../islands/Playground.tsx";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import NavigationBar from "../components/NavigationBar.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Playground() {
  return (
    <>
      <Head>
        <title>Whistle Playground</title>
      </Head>
      <div class={`h-screen flex flex-col`}>
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
      class={`flex-grow-1 mx-auto w-full max-w-screen-2xl px-4 py-8 gap-6`}
    >
      <PlaygroundIsland />
    </main>
  );
}
