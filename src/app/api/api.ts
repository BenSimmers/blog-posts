import { Post } from '../../types';
import { useStore } from '../hooks/useStore';

/**
 * Fetches blog posts from the API.
 * @returns Promise<Post[]>
 * @throws Error
 * @example
 * const posts: Post[] = await fetchBlogPosts();
 */
export const fetchBlogPosts = async (): Promise<Post[]> => {
  const apiUrl = import.meta.env.VITE_URL;
  if (!apiUrl) throw new Error('API URL is not defined');

  const response = await fetch(apiUrl);

  if (!response.ok) {
    const errorMessage: string = `Failed to fetch blog posts: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  const data: Post[] = await response.json();
  return data;
};

/**
 * Fetches blog posts from the API and sets the blogPosts state
 * in the store. If an error occurs, it sets the error state.
 * @returns void
 * @throws Error
 * @example
 * loadPosts().catch((error: Error) => console.error(error.toString()));
 */
export const loadPosts = async (): Promise<void> => {
  try {
    const posts: Post[] = await fetchBlogPosts();
    useStore.getState().setBlogPosts(posts);
  } catch (error) {
    if (error instanceof Error) {
      useStore.getState().setError(error.message);
    } else {
      useStore.getState().setError('An unknown error occurred');
    }
  }
};
