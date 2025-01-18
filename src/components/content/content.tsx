import Markdown from "react-markdown";
import { Post } from "../../types";

export const Content: React.FunctionComponent<Post> = (post) => (
  <div className="flex flex-col min-h-[calc(100vh-6rem)] mb-4 mt-4">
    <div className="border-2 border-gray-600 shadow-sm rounded-md p-6 bg-white flex-grow w-full">
      <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
      <p className="text-sm text-gray-600 mt-2">
        {post.author} - {new Date(post.date_published).toDateString()}
      </p>
      <Markdown className="mt-4 text-gray-800">{post.content}</Markdown>
    </div>
  </div>
);

