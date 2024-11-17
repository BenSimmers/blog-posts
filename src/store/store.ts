import { create } from 'zustand';
import { Post, Store } from '../types';

export const fetchBlogPosts = async (): Promise<Post[]> => {
  const response = await fetch(import.meta.env.VITE_URL);
  if (response.status === 429) {
    throw new Error('Too many requests. Please try again later.');
  }
  const data = await response.json();
  return data;
};

export const loadPosts = async (): Promise<void> => {
  try {
    const posts = await fetchBlogPosts();
    useStore.getState().setBlogPosts(posts);
  } catch (error) {
    if (error instanceof Error) {
      useStore.getState().setError(error.message);
    } else {
      useStore.getState().setError('An unknown error occurred');
    }
  }
};

const useStore = create<Store>((set, get) => ({
  blogPosts: [],
  status: 'idle',
  blogPost: null,
  error: null,
  setBlogPosts: (blogPosts) => set({ blogPosts, status: 'success' }),
  setError: (error) => set({ error, status: 'error' }),
  selectPostById: (id) => {
    const posts = get().blogPosts;
    return posts.find((post) => post.id === id);
  },
}));

export { useStore };
