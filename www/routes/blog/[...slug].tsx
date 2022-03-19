/** @jsx h */
/** @jsxFrag Fragment */

import { apply, Fragment, h, Head, PageProps, tw } from "../../client_deps.ts";
import { gfm, Handlers } from "../../server_deps.ts";
import Footer from "../../components/Footer.tsx";
import NavigationBar from "../../components/NavigationBar.tsx";
import { BlogPost, POSTS } from "../../data/blog.ts";

interface Data {
  page: Page;
}

interface Page extends BlogPost {
  markdown: string;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug;
    if (slug === "") {
      return new Response(null, {
        status: 307,
        headers: { location: "/blog" },
      });
    }
    const entry = POSTS[slug];
    if (!entry) {
      return new Response("404 Page not found", {
        status: 404,
      });
    }
    const url = new URL(`../../../${entry.file}`, import.meta.url);
    const markdown = await Deno.readTextFile(url);
    const page = { ...entry, markdown };
    const resp = ctx.render({ page });
    return resp;
  },
};

export default function BlogPage(props: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Whistle blog</title>
        <link rel="stylesheet" href="/gfm.css" />
      </Head>
      <Header />
      <NavigationBar active="/blog" />
      <Main page={props.data.page} />
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

function Main(
  { page: { slug, title, short, date, authors, href, file, markdown } }: {
    page: Page;
  },
) {
  return (
    <>
      <div>
        <article class={tw`max-w-screen-md px-4 py-8 mx-auto`}>
          <h1 class={tw`text-5xl font-bold`}>{title}</h1>
          <div class={tw`mt-4 text-gray-500`}>
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
          <hr class={tw`my-8`} />
          <div class={tw`mt-8`}>
            <div
              class={`${tw`mt-6`} markdown-body`}
              dangerouslySetInnerHTML={{ __html: gfm.render(markdown) }}
            />
          </div>
        </article>
      </div>
    </>
  );
}
