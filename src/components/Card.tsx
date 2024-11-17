import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

export const Card: React.FunctionComponent<Pick<Post, 'id' | 'title' | 'author' | 'date_published'>> = ({
  id,
  title,
  author,
  date_published,
}) => (
  <Link to={`/posts/${id}`}>
    <div className="border-2 border-black p-4 rounded-sm bg-slate-100 hover:bg-slate-200">
      <p className="text-sm text-gray-700">{new Date(date_published).toDateString()}</p>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-700">{author}</p>
    </div>
  </Link>
);
