import React from 'react';
import { useParams } from 'react-router';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { SkeletonPostCard } from '../../components/skeletons';
import { Content } from '../../components/content/content';

export const BlogPost: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? Number.parseInt(id, 10) : 0;

  const { selectedBlogPostById } = useBlogPosts();
  const post = selectedBlogPostById(postId);

  return post ? <Content {...post} /> : <SkeletonPostCard />;
};
