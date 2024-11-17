import React from 'react';
import { Card } from '../../components/card';
import { PostsProps } from '../../types';
import { SkeletonCard } from '../../components/loading';

export const BlogCards: React.FunctionComponent<PostsProps> = ({ blogPosts }) => {
  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
        <SkeletonCard />
      </div>
    ));

  const renderBlogPosts = () =>
    blogPosts.map((post) => (
      <div key={post.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
        <Card {...post} />
      </div>
    ));

  return (
    <React.Fragment>
      <h1 className="text-2xl font-bold mb-4 mt-4">Blog Posts</h1>
      <div className="flex flex-row flex-wrap -mx-2">{!blogPosts.length ? renderSkeletons() : renderBlogPosts()}</div>
    </React.Fragment>
  );
};
