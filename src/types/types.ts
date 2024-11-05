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
  status: 'idle' | 'loading' | 'failed';
  setBlogPosts: (blogPosts: Post[]) => void;
  selectPostById: (id: number) => Post | undefined;
};

export type { Post, PostsProps, BlogPostProps, Store };
