import React from 'react';
import { useParams } from 'react-router';
import { BlogPost } from '../pages/Post';
import { useBlogStore } from '../store/useBlogStore';
import { SkeletonPostCard } from '../components/blogSkeleton';

const Wrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? Number.parseInt(id, 10) : 0;

  const { selectPostById } = useBlogStore();
  const post = selectPostById(postId);

  if (!post) {
    return <SkeletonPostCard />;
  }

  return <BlogPost post={post} />;
};

export default Wrapper;
