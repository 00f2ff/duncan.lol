export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  publishedOn: string;
  updatedOn?: string;
  tags: string[];
  slug: string;
  status: 'Draft' | 'Polished' | 'Published';
}

export interface PostFrontmatter {
  Title: string;
  Excerpt?: string;
  Slug: string;
  Tags: string[];
  Status: 'Draft' | 'Polished' | 'Published';
  'Published On': string;
  'Updated On'?: string;
}