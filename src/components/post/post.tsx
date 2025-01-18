import React from 'react';
import { Post } from '../../types';

export const PostCard: React.FunctionComponent<Post> = ({ id, title, content }) => (
  <div key={id} className="border-2 border-black p-4 rounded-sm bg-slate-100">
    <h2>{title}</h2>
    <div>{content}</div>
  </div>
);
