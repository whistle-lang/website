/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, PageProps, tw } from "../../client_deps.ts";
import { gfm, Handlers } from "../../server_deps.ts";
import Footer from "../../components/Footer.tsx";
import Header from "../../components/Header.tsx";
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
        <title>{props.data.page.title} - Whistle Blog</title>
        <link rel="stylesheet" href="/gfm.css" />
      </Head>
      <div class={tw`min-h-screen flex flex-col`}>
        <Header />
        <NavigationBar active="/blog" />
        <Main page={props.data.page} />
      </div>
      <Footer />
    </>
  );
}

function Main(
  { page: { slug, title, short, date, authors, href, file, markdown } }: {
    page: Page;
  },
) {
  return (
    <article class={tw`w-full max-w-screen-md px-4 py-8 mx-auto`}>
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
  );
}
