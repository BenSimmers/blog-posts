import { create } from 'zustand';
import { BlogStore } from '../../types';

export const useStore = create<BlogStore>((set, get) => ({
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
