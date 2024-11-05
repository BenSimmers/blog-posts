import React from 'react';
import { Card } from '../../components/Card';
import { PostsProps } from '../../types/types';
import { ErrorMessage } from '../../components/Error';

export const BlogCards: React.FunctionComponent<PostsProps> = ({ blogPosts }) => (
  <React.Fragment>
    <h1 className="text-2xl font-bold mb-4 mt-4">Blog Posts</h1>
    {!blogPosts.length ? (
      <ErrorMessage isData={!blogPosts.length} message="No blog posts found" />
    ) : (
      <div className="flex flex-row flex-wrap -mx-2">
        {blogPosts.map((post) => (
          <div key={post.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <Card {...post} />
          </div>
        ))}
      </div>
    )}
  </React.Fragment>
);
