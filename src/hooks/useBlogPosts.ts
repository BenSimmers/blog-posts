import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectAllPosts, selectError, selectStatus, fetchPosts, selectBlogById } from '../redux/blogSlice';
import React from 'react';
import { Post } from '../types';


type useBlogPostsType = {
    blogs: Post[];
    isLoading: boolean;
    error: string | null;
    selectedBlogPostById: (id: number) => Post | undefined;
    };

export const useBlogPosts = (): useBlogPostsType => {
  const blogs = useAppSelector(selectAllPosts);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const selectedBlogPostById = React.useCallback(
    (id: number) => {
      return useAppSelector((state) => selectBlogById(state, id));
    },
    [selectBlogById],
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [fetchPosts]);


  const isLoading = React.useMemo(() => status === 'loading', [status]);

  return { blogs, isLoading, error, selectedBlogPostById };
};
