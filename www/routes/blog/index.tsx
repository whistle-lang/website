import Footer from "../../components/Footer.tsx";
import Header from "../../components/Header.tsx";
import NavigationBar from "../../components/NavigationBar.tsx";
import { BlogPost, POSTS } from "../../data/blog.ts";
import { Head } from "$fresh/runtime.ts";

export default function Index() {
  return (
    <>
      <Head>
        <title>Whistle Blog</title>
      </Head>
      <div class={`min-h-screen flex flex-col`}>
        <Header />
        <NavigationBar active="/blog" />
        <Main />
      </div>
      <Footer />
    </>
  );
}

function Main() {
  return (
    <main class={`w-full max-w-screen-md px-4 py-8 mx-auto`}>
      <h1 class={`text-5xl font-bold`}>Blog</h1>
      <div class={`mt-8`}>
        {Object.values(POSTS)
          .filter((post) => post.published)
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .map((post) => <BlogEntry entry={post} />)}
      </div>
    </main>
  );
}

function BlogEntry(
  { entry: { slug, title, short, date, authors, href, file } }: {
    entry: BlogPost;
  },
) {
  return (
    <div class={`py-8 border-t border-gray-200 grid sm:grid-cols-3 gap-2`}>
      <div class={`w-56 text-gray-500`}>
        <p>{new Intl.DateTimeFormat().format(date)}</p>
        <p>
          {authors.map((author, index) => {
            return (
              <>
                {index > 0 && ", "}
                {typeof author !== "string"
                  ? (
                    <a href={author[1]} class={`hover:underline`}>
                      {author[0]}
                    </a>
                  )
                  : author}
              </>
            );
          })}
        </p>
      </div>
      <a class={`sm:col-span-2`} href={href}>
        <h3 class={`text-2xl text-gray-900 font-bold`}>{title}</h3>
        <div class={`mt-4 text-gray-900`}>{short}</div>
      </a>
    </div>
  );
}
