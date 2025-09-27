import React from 'react';
import { PlaceholderContext } from './context';
import type { IPlaceholderProviderProps } from './types';

export const PlaceholderProvider: React.FC<IPlaceholderProviderProps> = ({ children }) => {
  return <PlaceholderContext.Provider value={{}}>{children}</PlaceholderContext.Provider>;
};
