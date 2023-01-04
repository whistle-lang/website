
import NavigationBar from "../components/NavigationBar.tsx";
import Footer from "../components/Footer.tsx";
import Playground from "../islands/Playground.tsx";
import { Head } from "$fresh/runtime.ts";
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
      <div className={`min-h-screen flex flex-col`}>
        <Hero />
        <NavigationBar active="/" />
        <div
          className={
            `flex-grow-1 flex flex-col w-full max-w-screen-md mx-auto px-4 py-8 gap-6 space-y-4`}
        >
          <p className={`text-gray-600`}>
            Whistle is a programming language that compiles to web assembly by default and is tiny enough to be embedded into your application.
            Beware! Whistle is not stable and will change in the near future.
          </p>
          <p className="font-bold text(center 2xl) pt-10">
            Try Whistle in your browser
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
    <section class={`w-full h-64 flex justify-center items-center flex-col`}>
      <img class={`max-w-md`} src="/whistle_horizontal_dark.svg" />
      <p class={`max-w-screen-sm mt-4 text(2xl gray-600 center)`}>
        A dope new blazing fast programming language that targets WebAssembly 
      </p>
    </section>
  );
}
