type Post = {
  id: number;
  date_published: string;
  title: string;
  author: string;
  content: string;
};

type PostsProps = {
  blogPosts: Post[];
};

type BlogPostProps = {
  post: Post;
};

type Store = {
  blogPosts: Post[];
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  setBlogPosts: (blogPosts: Post[]) => void;
  setError: (error: string) => void;
  selectPostById: (id: number) => Post | undefined;
};

export type { Post, PostsProps, BlogPostProps, Store };
