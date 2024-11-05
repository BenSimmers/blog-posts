import { create } from 'zustand';
import { Post, Store } from '../types/types';

export const fetchBlogPosts = async (): Promise<Post[]> => {
  const response = await fetch(import.meta.env.VITE_URL);
  const data = await response.json();
  return data;
};

export const loadPosts = async (): Promise<void> => {
  const posts = await fetchBlogPosts();
  useStore.getState().setBlogPosts(posts);
};

const useStore = create<Store>((set, get) => ({
  blogPosts: [],
  status: 'idle',
  blogPost: null,
  setBlogPosts: (blogPosts) => set({ blogPosts }),
  selectPostById: (id) => {
    const posts = get().blogPosts;
    return posts.find((post) => post.id === id);
  },
}));

export { useStore };
