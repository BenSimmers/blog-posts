import React from 'react';

export const SkeletonPostCard: React.FC = () => (
  <div className="flex flex-col mb-4 mt-4">
    <div className="border-2 border-gray-600 shadow-sm rounded-md p-6 bg-white flex-grow animate-pulse">
      <div className="h-6 bg-gray-300 w-[20%]"></div>
      <div className="h-4 mt-2 bg-gray-300 w-[15%]"></div>
      <div className=" bg-gray-300 w-full h-10 mt-2"></div>
    </div>
  </div>
);
