import RAW_POSTS from "../../blog/posts.json" assert { type: "json" };

type RawPosts = Record<string, RawPostEntry>;

interface RawPostEntry {
  title: string;
  date?: Date;
  authors?: string[];
  tags?: string[];
}

export interface PostEntry {
  slug: string;
  title: string;
  date: Date;
  authors: string[];
  tags?: string[];
  href: string;
  file: string;
}

export const POSTS: Record<string, PostEntry> = {};

for (const parent in (RAW_POSTS as unknown as RawPosts)) {
  const { title, date, authors, tags } =
    (RAW_POSTS as unknown as RawPosts)[parent];
  const href = `/blog/${parent}`;
  const file = `blog/${parent}.md`;
  const entry = {
    slug: parent,
    title,
    date: date ?? new Date(),
    authors: authors ?? ["The Whistle authors"],
    tags,
    href,
    file,
  };
  POSTS[parent] = entry;
}

export const SLUGS = Object.keys(POSTS);
