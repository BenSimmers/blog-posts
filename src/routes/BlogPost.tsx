import { useParams } from 'react-router';
import { BlogPost } from '../pages/Post';
import { useBlogStore } from '../store/useBlogStore';

const Wrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? Number.parseInt(id, 10) : 0;

  const { selectPostById } = useBlogStore();
  const post = selectPostById?.(postId);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return <BlogPost post={post} />;
};

export default Wrapper;
