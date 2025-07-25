import type { BlogPost } from '../types/blog';
import { parseMarkdownFile, transformPost, sortPostsByDate, filterPublishedPosts } from '../utils/markdown';

export const getAllPosts = async (): Promise<BlogPost[]> => {
  // Vite's way to import all markdown files
  const modules = import.meta.glob('./posts/*.md', { 
    query: '?raw',
    import: 'default',
    eager: true 
  });

  const posts: BlogPost[] = [];

  for (const [path, content] of Object.entries(modules)) {
    const slug = path.replace('./posts/', '').replace('.md', '');
    
    try {
      const { frontmatter, content: markdownContent } = parseMarkdownFile(content as string);
      const post = transformPost(slug, frontmatter, markdownContent);
      posts.push(post);
    } catch (error) {
      console.error(`Failed to parse post: ${slug}`, error);
    }
  }

  // Return all posts sorted by date (newest first)
  return sortPostsByDate(posts);
};

export const getPublishedPosts = async (): Promise<BlogPost[]> => {
  const allPosts = await getAllPosts();
  return filterPublishedPosts(allPosts);
};

// For lazy loading (if you prefer)
export const getAllPostsLazy = async (): Promise<BlogPost[]> => {
  const modules = import.meta.glob('./posts/*.md', { 
    query: '?raw',
    import: 'default'
  });
  
  const posts: BlogPost[] = [];

  for (const [path, importFn] of Object.entries(modules)) {
    const content = await importFn() as string;
    const slug = path.replace('./posts/', '').replace('.md', '');
    
    try {
      const { frontmatter, content: markdownContent } = parseMarkdownFile(content);
      const post = transformPost(slug, frontmatter, markdownContent);
      posts.push(post);
    } catch (error) {
      console.error(`Failed to parse post: ${slug}`, error);
    }
  }

  return sortPostsByDate(posts);
};

// Get a single post by slug
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const module = await import(`./posts/${slug}.md?raw`);
    const content = module.default;
    
    // Ensure content is a string
    const contentString = typeof content === 'string' ? content : String(content);
    
    const { frontmatter, content: markdownContent } = parseMarkdownFile(contentString);
    return transformPost(slug, frontmatter, markdownContent);
  } catch (error) {
    console.error(`Post not found: ${slug}`, error);
    return null;
  }
};

// Get posts with pagination
export const getPostsPage = async (page: number = 1, postsPerPage: number = 10) => {
  const allPosts = await getPublishedPosts();
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  
  return {
    posts: allPosts.slice(startIndex, endIndex),
    totalPosts: allPosts.length,
    totalPages: Math.ceil(allPosts.length / postsPerPage),
    currentPage: page,
    hasNextPage: endIndex < allPosts.length,
    hasPrevPage: page > 1
  };
};