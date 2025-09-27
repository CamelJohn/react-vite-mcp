import { RouterProvider } from 'react-router/dom';
import { router } from './router';

export const MainRoutesProvider = () => <RouterProvider router={router} />;