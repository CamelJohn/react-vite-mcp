import { RouteObject } from 'react-router';
import { MainLayout } from '../layouts/main/main.layout';

export const routes: RouteObject[] = [{
    path: '',
    Component: MainLayout,
    children: [],
}];