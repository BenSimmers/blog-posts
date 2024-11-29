type Post = {
  id: number;
  date_published: string;
  title: string;
  author: string;
  content: string;
};

export type Status = 'idle' | 'loading' | 'success' | 'error';

interface BlogStore {
  blogPosts: Post[];
  status: Status;
  error: string | null;
  setBlogPosts: (blogPosts: Post[]) => void;
  setError: (error: string) => void;
  selectPostById: (id: number) => Post | undefined;
}

export type { Post, BlogStore };
