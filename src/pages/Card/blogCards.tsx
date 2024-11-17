import React from 'react';
import { Card } from '../../components/card';
import { PostsProps } from '../../types/types';
import { SkeletonCard } from '../../components/loading';

export const BlogCards: React.FunctionComponent<PostsProps> = ({ blogPosts }) => {
  const renderContent = () => {
    const items: ((typeof blogPosts)[number] | null)[] = blogPosts.length
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
