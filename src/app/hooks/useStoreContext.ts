import React from 'react';
import { BlogStore } from '../../types';
import { Context } from '../context';

export const useStoreContext = (): BlogStore => {
  const store = React.useContext(Context);
  if (!store) throw new Error('useStoreContext must be used within a Provider');
  return store;
};
