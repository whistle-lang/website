import RAW_POSTS from "../../blog/posts.json" assert { type: "json" };

type RawPosts = Record<string, RawBlogPost>;

interface RawBlogPost {
  title: string;
  short: string;
  date?: string;
  authors?: (string | [string, string])[];
  published?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  short: string;
  date: Date;
  authors: (string | [string, string])[];
  published: boolean;
  href: string;
  file: string;
}

export const POSTS: Record<string, BlogPost> = {};

for (const parent in (RAW_POSTS as unknown as RawPosts)) {
  const { title, short, date, authors, published } =
    (RAW_POSTS as unknown as RawPosts)[parent];
  const href = `/blog/${parent}`;
  const file = `blog/${parent}.md`;

  const entry = {
    slug: parent,
    title,
    short,
    date: date !== undefined ? new Date(date) : new Date(),
    authors: authors ??
      [["The Whistle authors", "https://github.com/whistle-lang/"]],
    published: published ?? false,
    href,
    file,
  };
  POSTS[parent] = entry;
}

export const SLUGS = Object.keys(POSTS);
