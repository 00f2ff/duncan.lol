// src/utils/markdown.ts
import fm from 'front-matter';
import type { BlogPost, PostFrontmatter } from '../types/blog';
import dayjs from 'dayjs';

export const parseMarkdownFile = (content: string) => {
  const { attributes, body } = fm(content);
  return {
    frontmatter: attributes as PostFrontmatter,
    content: body
  };
};

const decodeHTML = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.documentElement.textContent || "";
}

export const transformPost = (
  slug: string, 
  frontmatter: PostFrontmatter, 
  content: string
): BlogPost => {
  return {
    id: slug,
    title: decodeHTML(frontmatter.Title),
    excerpt: frontmatter.Excerpt ? decodeHTML(frontmatter.Excerpt) : undefined,
    slug: frontmatter.Slug || slug,
    tags: frontmatter.Tags || [],
    status: frontmatter.Status,
    publishedOn: frontmatter['Published On'],
    updatedOn: frontmatter['Updated On'] === 'undefined' ? undefined : frontmatter['Updated On'],
    content,
  };
};

function sortByDateDescending(a: BlogPost, b: BlogPost): number {
  return dayjs(a.updatedOn ?? a.publishedOn).isBefore(b.updatedOn ?? b.publishedOn) ? 1 : -1;
}

// Utility to sort posts by date
export const sortPostsByDate = (posts: BlogPost[]): BlogPost[] => {
  return [...posts].sort(sortByDateDescending);
};

// Utility to get posts by tag
export const getPostsByTag = (posts: BlogPost[], tag: string): BlogPost[] => {
  return posts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
};

// Utility to get all unique tags
export const getAllTags = (posts: BlogPost[]): string[] => {
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};