import React from 'react';
import type { IPlaceholderContext } from './types';

export const PlaceholderContext = React.createContext<IPlaceholderContext | undefined>(undefined);
