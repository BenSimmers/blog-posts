import React from 'react';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { SkeletonCard } from '../../components/skeletons';
import { Card } from '../../components/card';

export const BlogCards: React.FunctionComponent = () => {
  const { blogs: blogPosts } = useBlogPosts();

  const renderContent = () => {
    const items = blogPosts.length
      ? blogPosts
      : Array.from({ length: 4 }).map(() => null);

    return items.map((item, i) => (
      <div key={item ? item.id : i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
        {item ? <Card {...item} /> : <SkeletonCard />}
      </div>
    ));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-4">Blog Posts</h1>
      <div className="flex flex-row flex-wrap -mx-2">{renderContent()}</div>
    </div>
  );
};
