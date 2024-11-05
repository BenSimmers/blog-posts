import React from 'react';
import { BlogCards } from '../pages/Card';
import { useBlogStore } from '../store/useBlogStore';

export const Wrapper: React.FunctionComponent = () => {
  const { blogPosts } = useBlogStore();

  return <BlogCards blogPosts={blogPosts} />;
};
export default Wrapper;
