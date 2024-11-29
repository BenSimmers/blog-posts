import React from 'react';
import { BlogStore } from '../types';

export const Context = React.createContext<BlogStore | undefined>(undefined);
