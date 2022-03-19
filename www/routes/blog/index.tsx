/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, tw } from "../../client_deps.ts";
import Footer from "../../components/Footer.tsx";
import NavigationBar from "../../components/NavigationBar.tsx";
import { BlogPost, POSTS } from "../../data/blog.ts";

export default function Index() {
  return (
    <>
      <Head>
        <title>Whistle blog</title>
      </Head>
      <Header />
      <NavigationBar active="/blog" />
      <Main />
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header class={tw`mx-auto max-w-screen-lg flex gap-3 justify-between`}>
      <div class={tw`p-4`}>
        <Title />
      </div>
    </header>
  );
}

function Title() {
  return (
    <>
      <p class={tw`flex items-center`}>
        <a href="/">
          <img class={tw`h-12 mx-4`} src="/whistle_horizontal_dark.svg" />
        </a>
      </p>
    </>
  );
}

function Main() {
  return (
    <>
      <div>
        <main class={tw`max-w-screen-md px-4 py-8 mx-auto`}>
          <h1 class={tw`text-5xl font-bold`}>Blog</h1>
          <div class={tw`mt-8`}>
            {Object.values(POSTS)
              .filter((post) => post.published)
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((post) => <BlogEntry entry={post} />)}
          </div>
        </main>
      </div>
    </>
  );
}

function BlogEntry(
  { entry: { slug, title, short, date, authors, href, file } }: {
    entry: BlogPost;
  },
) {
  return (
    <div class={tw`py-8 border-t border-gray-200 grid sm:grid-cols-3 gap-2`}>
      <div class={tw`w-56 text-gray-500`}>
        <p>{new Intl.DateTimeFormat().format(date)}</p>
        <p>
          {authors.map((author, index) => {
            return (
              <>
                {index > 0 && ", "}
                {typeof author !== "string"
                  ? (
                    <a href={author[1]} class={tw`hover:underline`}>
                      {author[0]}
                    </a>
                  )
                  : author}
              </>
            );
          })}
        </p>
      </div>
      <a class={tw`sm:col-span-2`} href={href}>
        <h3 class={tw`text-2xl text-gray-900 font-bold`}>{title}</h3>
        <div class={tw`mt-4 text-gray-900`}>{short}</div>
      </a>
    </div>
  );
}
