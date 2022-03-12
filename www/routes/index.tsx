/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, tw } from "../client_deps.ts";
import NavigationBar from "../components/NavigationBar.tsx";
import Footer from "../components/Footer.tsx";

export default function Index() {
  const main = tw`max-w-screen-sm mx-auto my-16 px(4 sm:6 md:8) space-y-4`;
  const text = tw`text-gray-600`;

  return (
    <>
      <Head>
        <title>Whistle Programming Language</title>
        <meta
          name="description"
          content="A statically typed, fast, experimental, compile-to-wasm programming language"
        />
      </Head>
      <Hero />
      <NavigationBar active="/" />
      <section class={main}>
        <p class={text}>
          Whistle is a new programming language developed by the Whistle team
          and contributers. It is mainly developed for the purpose of learning
          about the internals of programming languages but also because it is
          fun to have created our very own programming language. Currently
          Whistle is in very early stages of development with no plans of
          becoming a go-to language for any kind of serious project for the
          foreseeable future. This will however not stop us from exploring it's
          limits to further develop Whistle and hopefully one day make it a
          useable language.
        </p>
      </section>
      <Footer />
    </>
  );
}

function Hero() {
  const container = tw`w-full h-64 flex justify-center items-center flex-col`;
  const header = tw`max-w-md`;
  const subtitle = tw`max-w-screen-sm mt-4 text(2xl gray-600 center)`;

  return (
    <section class={container}>
      <img class={header} src="assets/whistle_horizontal_dark.svg" />
      <p class={subtitle}>
        A statically typed, fast, experimental, compile-to-wasm programming
        language
      </p>
    </section>
  );
}
