import React from 'react';
import { loadPosts, useStore } from './store';

export const useBlogStore = () => {
  const { blogPosts, status, selectPostById } = useStore();

  React.useEffect(() => {
    loadPosts().catch((error: Error) => console.error(error.toString()));
  }, []);

  return { blogPosts, status, selectPostById };
};
