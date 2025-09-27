import React from 'react';
import { PlaceholderContext } from './context';

export const usePlaceholder = () => {
  const context = React.useContext(PlaceholderContext);
  if (!context) throw new Error('usePlaceholder must be used within a PlaceholderProvider');
  return context;
};
