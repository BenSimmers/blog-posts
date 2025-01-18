import React from 'react';

export const SkeletonCard: React.FC = () => (
  <div className="border-2 border-black p-4 rounded-sm bg-slate-100 animate-pulse">
    <div className="h-4 bg-gray-300 mb-2 w-1/3"></div>
    <div className="h-6 bg-gray-300 mb-4 w-2/3"></div>
    <div className="h-4 bg-gray-300 w-1/4"></div>
  </div>
);
