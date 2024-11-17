import React from 'react';

export const Home: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
    <h1 className="text-4xl font-bold text-gray-800">Welcome to your new blog!</h1>
    <p className="text-lg text-gray-600 mt-2">This is a simple blog application built with React and Tailwind CSS.</p>
  </div>
);
