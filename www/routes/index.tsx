/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, tw } from "../client_deps.ts";
import NavigationBar from "../components/NavigationBar.tsx";
import Footer from "../components/Footer.tsx";
import Playground from "../islands/Playground.tsx";

export default function Index() {
  return (
    <>
      <Head>
        <title>Whistle Programming Language</title>
        <meta
          name="description"
          content="A statically typed, fast, experimental, compile-to-wasm programming language"
        />
      </Head>
      <div class={tw`min-h-screen flex flex-col`}>
        <Hero />
        <NavigationBar active="/" />
        <div
          class={tw
            `grow flex flex-col w-full max-w-screen-md mx-auto px-4 py-8 gap-6 space-y-4`}
        >
          <p class={tw`text-gray-600`}>
            Whistle is a new programming language developed by the Whistle team
            and contributers. It is mainly developed for the purpose of learning
            about the internals of programming languages but also because it is
            fun to have created our very own programming language. Currently
            Whistle is in very early stages of development with no plans of
            becoming a go-to language for any kind of serious project for the
            foreseeable future. This will however not stop us from exploring
            it's limits to further develop Whistle and hopefully one day make it
            a useable language.
          </p>
          <Playground />
        </div>
      </div>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section class={tw`w-full h-64 flex justify-center items-center flex-col`}>
      <img class={tw`max-w-md`} src="/whistle_horizontal_dark.svg" />
      <p class={tw`max-w-screen-sm mt-4 text(2xl gray-600 center)`}>
        A statically typed, fast, experimental, compile-to-wasm programming
        language
      </p>
    </section>
  );
}
