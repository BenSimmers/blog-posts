import React from 'react';
import { useStore } from './hooks/useStore';
import { loadPosts } from './api/api';
import { Context } from './context';

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useStore();

  React.useEffect(() => {
    loadPosts();
  }, []);

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export { Provider };
